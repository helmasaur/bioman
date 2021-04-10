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
					default: () => i18n.t('commandsUtil:moderation.noReason')
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
			return msg.reply(i18n.t('unmute.noPermission.bot'));
		}
		
		if (!author.hasPermission('MUTE_MEMBERS')) {
			return msg.reply(i18n.t('unmute.noPermission.author.members'));
		}
		
		if (!(author.roles.highest.position > unmutedMember.roles.highest.position)) {
			return msg.reply(i18n.t('unmute.noPermission.author.role', { member: unmutedMember, interpolation: { escapeValue: false } }));
		}

		if (unmutedMember.voice.serverMute) {
			return msg.reply(i18n.t('unmute.alreadyMuted'));
		}

		if (unmutedMember.id === bot.id) {
			return msg.reply(i18n.t('unmute.noPermission.author.bot'));
		}

		msg.channel.send({embed: this.embed(author.user, unmutedMember.user, reason)});
		return unmutedMember.voice.setMute(false, reason);
	}

	embed(author, unmutedMember, reason) {
		return new Discord.MessageEmbed()
			.setTitle(i18n.t('commandsUtil:moderation.embed.title'))
			.setAuthor(author.tag, author.displayAvatarURL)
			.setColor(config.richEmbedColors.moderation)
			.setThumbnail(unmutedMember.displayAvatarURL)
			.addField(i18n.t('commandsUtil:moderation.embed.action'), i18n.t('unmute.embed.action'), true)
			.addField(i18n.t('commandsUtil:moderation.embed.reason'), reason, true)
			.addField('\u200b', '​\u200b') // blank field
			.addField(i18n.t('commandsUtil:moderation.embed.member'), unmutedMember, true)
			.addField(i18n.t('commandsUtil:moderation.embed.memberID'), unmutedMember.id, true);
	}
	
}

module.exports = UnmuteCommand;