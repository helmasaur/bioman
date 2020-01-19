const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const i18n = require('i18next');
const config = require('../../config.json')

class DeafenCommand extends Command {
	constructor() {
		super('deafen', {
			aliases: ['deafen', 'd'],
			category: 'moderation',
			args: [
				{
					id: 'deafenedMember',
					type: 'member'
				},
				{
					id: 'reason',
					match: 'rest',
					default: () => i18n.t('deafen.noReason')
				}
			],
			channelRestriction: 'guild'
		});
	}

	async exec(msg, args) {
		const bot = msg.guild.me;
		const author = msg.member;
		const deafenedMember = args.deafenedMember;
		const reason = args.reason;

		if (!bot.hasPermission('DEAFEN_MEMBERS')) {
			return msg.reply(i18n.t('deafen.noPermission.bot'));
		}
		
		if (!author.hasPermission('DEAFEN_MEMBERS')) {
			return msg.reply(i18n.t('deafen.noPermission.author.members'));
		}
		
		if (!(author.highestRole.position > deafenedMember.highestRole.position)) {
			return msg.reply(i18n.t('deafen.noPermission.author.role', { member: deafenedMember, interpolation: { escapeValue: false } }));
		}

		if (deafenedMember.serverDeaf) {
			return msg.reply(i18n.t('deafen.alreadyDeafened', { member: deafenedMember, interpolation: { escapeValue: false } }));
		}

		if (deafenedMember.id === bot.id) {
			return msg.reply(i18n.t('deafen.noPermission.author.bot'));
		}

		msg.channel.send({embed: this.embed(author.user, deafenedMember.user, reason)});
		return deafenedMember.setDeaf(true, reason);
	}

	embed(author, deafenedMember, reason) {
		return new Discord.RichEmbed()
			.setTitle(i18n.t('commandsUtil:moderation.embed.title'))
			.setAuthor(author.tag, author.displayAvatarURL)
			.setColor(config.richEmbedColors.moderation)
			.setThumbnail(deafenedMember.displayAvatarURL)
			.addField(i18n.t('commandsUtil:moderation.embed.action'), i18n.t('deafen.embed.action'), true)
			.addField(i18n.t('commandsUtil:moderation.embed.reason'), reason, true)
			.addBlankField(true)
			.addField(i18n.t('commandsUtil:moderation.embed.member'), deafenedMember, true)
			.addField(i18n.t('commandsUtil:moderation.embed.memberID'), deafenedMember.id, true);
	}
	
}

module.exports = DeafenCommand;