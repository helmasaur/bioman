const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const i18n = require('i18next');
const config = require('../../config.json');
const birthstone = require('birthgem')('fr');
const zodiac = require('zodiac-signs')('fr');

class BirthstoneCommand extends Command {
	constructor() {
		super('birtstone', {
			aliases: ['birthstone'],
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
			return;
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
					const months = ['january', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

					return msg.channel.send({embed: this.embed(author.user, 'Month', months[date], stone)});
				}

				return;
			case 'day':
				if (date === '-1') {
					stone = birthstone.day()
					date = new Date().getDay() - 1 === -1 ? 0 : new Date().getDay() -1;
				} else {
					stone = birthstone.day(date--);
				}

				if (stone !== -2) {
					const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

					return msg.channel.send({embed: this.embed(author.user, 'Day', days[date], stone)});;
				}

				return;
			case 'zodiac':
				let sign;
				const signName = date.toLowerCase();

				if (signName === '-1') {
					sign = zodiac.getSignByDate();
				} else if (zodiac.getSymbols().includes(signName)) {
					sign = zodiac.getSignBySymbol(signName);
				} else if (zodiac.getNames().includes(signName.charAt(0).toUpperCase() + signName.slice(1))) {
					sign = zodiac.getSignByName(signName);
				} else {
					return;
				}

				if (sign !== -2) {
					return msg.channel.send({embed: this.embed(author.user, 'Zodiac', `${sign.symbol} (${sign.name})`, [sign.stone])});;
				}

				return;
		}
	}

	embed(author, type, date, stones) {
		const embed = new Discord.RichEmbed()
			.setTitle('Birthstone')
			.setAuthor(author.tag, author.displayAvatarURL)
			.setColor(config.richEmbedColors.information)
			.addField(type, date);

		for (let i = 0; i < stones.length; i++) {
			embed.addField(`Stone ${i + 1}`, stones[i], true);
		}

		return embed;
	}
}

module.exports = BirthstoneCommand;