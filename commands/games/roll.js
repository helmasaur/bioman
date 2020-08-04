const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const i18n = require('i18next');
const config = require('../../config.json');
const dice = require('trpg-dice');

class RollCommand extends Command {
	constructor() {
		super('roll', {
			aliases: ['dice', 'roll'],
			category: 'games',
			args: [
				{
					id: 'roll'
				}
			]})
	}

	async exec(msg, args) {
		const author = msg.member;
		const roll = args.roll;
		const regex = new RegExp('^-*[0-9]*d*$');
		let result;
		
		// Prevents huge rolls
		if (roll.length > 5) {
			return msg.reply(i18n.t('roll.error.length'));
		}
		// Cases not managed by trpg-dice
		if (regex.test(roll)) {
			return msg.reply(i18n.t('roll.error.value'));
		}

		dice.roll(roll, function(err, res) { 
			if (err) {
				result = null;
				// throw err;
			} else {
				result = res;
			}
		});

		if (result === null) {
			return msg.reply(i18n.t('roll.error.value'));
		} else {
			return msg.channel.send({embed: this.embed(author.user, result)});
		}
	}

	embed(author, result) {
		const embed = new Discord.RichEmbed()
			.setTitle(i18n.t('roll.embed.title'))
			.setAuthor(author.tag, author.displayAvatarURL)
			.setColor(config.richEmbedColors.games)
			.setDescription(result.expression)
			.addField(i18n.t('roll.embed.sum'), result.rolls[0].result, true)
			.addField(i18n.t('roll.embed.result'), result.rolls[0].resultString, true)
			.addBlankField(true)
			.addField(i18n.t('roll.embed.min'), result.min, true)
			.addField(i18n.t('roll.embed.max'), result.max, true)
			.addField(i18n.t('roll.embed.avg'), result.avg, true);
		
		return embed;	
	}
}

module.exports = RollCommand;