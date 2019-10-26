const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const i18n = require('i18next');
const config = require('../../config.json')

class UndeafenCommand extends Command {
	constructor() {
		super('undeafen', {
			aliases: ['undeafen'],
			category: 'moderation',
			args: [
				{
					id: 'undeafenedMember',
					type: 'member'
				},
				{
					id: 'reason',
					match: 'rest',
					default: () => i18n.t('undeafened.noReason')
				}
			],
			channelRestriction: 'guild'
		});
	}

	exec(msg, args) {
		const bot = msg.guild.me;
		const author = msg.member;
		const undeafenedMember = args.undeafenedMember;
		const reason = args.reason;

		if (!bot.hasPermission('DEAFEN_MEMBERS')) {
			return msg.reply(`*${i18n.t('undeafen.noPermission.bot')}*`);
		}
		
		if (!author.hasPermission('DEAFEN_MEMBERS')) {
			return msg.reply(`*${i18n.t('undeafen.noPermission.author.members')}*`);
		}
		
		if (!(author.highestRole.position > undeafenedMember.highestRole.position)) {
			return msg.reply(`*${i18n.t('undeafen.noPermission.author.role', { undeafenedMember })}*`);
		}

		if (undeafenedMember.serverDeafen) {
			return msg.reply(`*${i18n.t('undeafen.alreadyUnmuted')}`);
		}

		if (undeafenedMember.id === bot.id) {
			return msg.reply(`*${i18n.t('undeafen.noPermission.author.bot')}`);
		}

		msg.channel.send({embed: this.embed(author, undeafenedMember, reason)});
		return undeafenedMember.setDeaf(false, reason);
	}

	embed(author, undeafenedMember, reason) {
		return new Discord.RichEmbed()
			.setTitle(i18n.t('undeafen.title'))
			.setAuthor(author.tag, author.displayAvatarURL)
			.setColor(config.richEmbedColors.moderation)
			.setThumbnail(undeafenedMember.displayAvatarURL)
			.addField('Action', i18n.t('undeafen.action'), true)
			.addField('Reason', reason, true)
			.addField('Member', undeafenedMember, true)
			.addField('Member ID', undeafenedMember.id, true);
	}
	
}

module.exports = UndeafenCommand;