const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const i18n = require('i18next');
const config = require('../../config.json')

class UnmuteCommand extends Command {
	constructor() {
		super('unmute', {
			aliases: ['unmute'],
			category: 'moderation',
			args: [
				{
					id: 'unmutedMember',
					type: 'member'
				},
				{
					id: 'reason',
					match: 'rest',
					default: () => i18n.t('unmute.noReason')
				}
			],
			channelRestriction: 'guild'
		});
	}

	exec(msg, args) {
		const bot = msg.guild.me;
		const author = msg.member;
		const unmutedMember = args.unmutedMember;
		const reason = args.reason;

		if (!bot.hasPermission('MUTE_MEMBERS')) {
			return msg.reply(`*${i18n.t('unmute.noPermission.bot')}*`);
		}
		
		if (!author.hasPermission('MUTE_MEMBERS')) {
			return msg.reply(`*${i18n.t('unmute.noPermission.author.members')}*`);
		}
		
		if (!(author.highestRole.position > unmutedMember.highestRole.position)) {
			return msg.reply(`*${i18n.t('unmute.noPermission.author.role', { member: unmutedMember, interpolation: { escapeValue: false } })}*`);
		}

		if (unmutedMember.serverMute) {
			return msg.reply(`*${i18n.t('unmute.alreadyMuted')}`);
		}

		if (unmutedMember.id === bot.id) {
			return msg.reply(`*${i18n.t('unmute.noPermission.author.bot')}`);
		}

		msg.channel.send({embed: this.embed(author.user, unmutedMember.user, reason)});
		return kickedMember.setMute(false, reason);
	}

	embed(author, unmutedMember, reason) {
		return new Discord.RichEmbed()
			.setTitle(i18n.t('unmute.title'))
			.setAuthor(author.tag, author.displayAvatarURL)
			.setColor(config.richEmbedColors.moderation)
			.setThumbnail(unmutedMember.displayAvatarURL)
			.addField('Action', i18n.t('unmute.action'), true)
			.addField('Reason', reason, true)
			.addBlankField(true)
			.addField('Member', unmutedMember, true)
			.addField('Member ID', unmutedMember.id, true);
	}
	
}

module.exports = UnmuteCommand;