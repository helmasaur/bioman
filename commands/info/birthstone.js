const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const i18n = require('i18next');
const config = require('../../config.json');
const birthstone = require('birthgem')(config.language);
const zodiac = require('zodiac-signs')(config.language);

class BirthstoneCommand extends Command {
	constructor() {
		super('birtstone', {
			aliases: ['birthstone'],
			category: 'info',
			args: [
				{
					id: 'option',
					type: ['month', 'day', 'zodiac'],
					default: -1
				},
				{
					id: 'date',
					default: '-1'
				}
			]
		});
	}

	exec(msg, args) {
		const author = msg.member;
		const option = args.option;
		let date = args.date;
		let stone;

		if (option === -1) {
			return msg.reply(i18n.t('birthstone.error.option'));
		}


		switch (option) {
			case 'month':
				if (date === '-1') {
					stone = birthstone.month()
					date = new Date().getMonth();
				} else {
					stone = birthstone.month(date--);
				}

				if (stone !== -1) {
					const months = i18n.t('birthstone.months', { returnObjects: true });

					return msg.channel.send({embed: this.embed(author.user, i18n.t('birthstone.type.month'), months[date], stone)});
				}

				return msg.reply(i18n.t('birthstone.error.month'));
			case 'day':
				if (date === '-1') {
					stone = birthstone.day()
					date = new Date().getDay() - 1 === -1 ? 0 : new Date().getDay() - 1;
				} else {
					stone = birthstone.day(date--);
				}

				if (stone !== -2) {
					const days = i18n.t('birthstone.days', { returnObjects: true });

					return msg.channel.send({embed: this.embed(author.user, i18n.t('birthstone.type.day'), days[date], stone)});;
				}
				
				return msg.reply(i18n.t('birthstone.error.day'));
			case 'zodiac':
				const signName = date.toLowerCase();
				let sign;

				if (signName === '-1') {
					sign = zodiac.getSignByDate();
				} else if (zodiac.getSymbols().includes(signName)) {
					sign = zodiac.getSignBySymbol(signName);
				} else if (zodiac.getNames().includes(signName.charAt(0).toUpperCase() + signName.slice(1))) {
					sign = zodiac.getSignByName(signName);
				}

				if (sign !== -2 && sign !== undefined) {
					return msg.channel.send({embed: this.embed(author.user, i18n.t('birthstone.type.zodiac'), `${sign.symbol} (${sign.name})`, [sign.stone])});
				}

				return msg.reply(i18n.t('birthstone.error.zodiac'));
		}
	}

	embed(author, type, date, stones) {
		const embed = new Discord.MessageEmbed()
			.setTitle(i18n.t('birthstone.embed.title'))
			.setAuthor(author.tag, author.displayAvatarURL)
			.setColor(config.richEmbedColors.information)
			.addField(type, date);

		if (stones.length === 1) {
			embed.addField(i18n.t('birthstone.embed.stone'), stones[0], true);
		} else {
			for (let i = 0; i < stones.length; i++) {
				embed.addField(`${i18n.t('birthstone.embed.stone')} ${i + 1}`, stones[i], true);
			}
		}

		return embed;
	}
}

module.exports = BirthstoneCommand;