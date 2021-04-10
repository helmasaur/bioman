const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const i18n = require('i18next');
const config = require('../../config.json');
const zodiac = require('zodiac-signs')(config.language);

class ZodiacCommand extends Command {
	constructor() {
		super('zodiac', {
			aliases: ['zodiac'],
			category: 'info',
			args: [
				{
					id: 'option',
					type: ['date', 'sign'],
					default: -1
				},
				{
					id: 'value',
					default: -1
				}

			]
		});
	}

	async exec(msg, args) {
		const author = msg.member;
		const owner = await msg.guild.client.users.fetch('164470149473107969');
		const option = args.option;
		const value = args.value;
		let sign;

		if (option === -1) {
			return msg.reply(i18n.t('zodiac.error.option'));
		}

		switch (option) {
			case 'date':
				let date;
				if (date === -1) {
					date = new Date();
				} else {
					date = new Date(value);
				}

				date.setFullYear(2000);
				const day = date.getDate();
				const month = date.getMonth() + 1;

				sign = zodiac.getSignByDate({ day: day , month: month }, config.language);

				if (sign !== -2) {
					return msg.channel.send({ embed: this.embed(author.user, owner, option, sign, date) });
				}

				return msg.reply(i18n.t('zodiac.error.date'));
			case 'sign':
				const signName = value.toLowerCase();

				if (signName === '-1') {
					sign = zodiac.getSignByDate();
				} else if (zodiac.getSymbols().includes(signName)) {
					sign = zodiac.getSignBySymbol(signName);
				} else if (zodiac.getNames().includes(signName.charAt(0).toUpperCase() + signName.slice(1))) {
					sign = zodiac.getSignByName(signName);
				}

				if (sign !== -2 && sign !== undefined) {
					const dateMin = new Date(sign.dateMin);
					const dateMax = new Date(sign.dateMax);

					return msg.channel.send({ embed: this.embed(author.user, owner, option, sign) });
				}

				return msg.reply(i18n.t('zodiac.error.sign'));
		}
	}

	embed(author, owner, option, sign, date) {
	
		const embed = new Discord.MessageEmbed()
			.setTitle(i18n.t('zodiac.embed.title'))
			.setAuthor(author.tag, author.displayAvatarURL)
			.setColor(config.richEmbedColors.information)
			.addField(i18n.t('zodiac.embed.name'), sign.name, true)
			.addField(i18n.t('zodiac.embed.symbol'), sign.symbol, true)
			.addField('\u200b', '​\u200b') // blank field
			.addField(i18n.t('zodiac.embed.dateMin'), new Date(sign.dateMin).toLocaleDateString(config.language), true)
			.addField(i18n.t('zodiac.embed.dateMax'), new Date(sign.dateMax).toLocaleDateString(config.language), true)
			.setFooter(i18n.t('zodiac.embed.footer'), owner.displayAvatarURL);

		if (option === 'date') {
			embed.setDescription(date.toLocaleDateString(config.language));
		}

		return embed;
	}
}

module.exports = ZodiacCommand;