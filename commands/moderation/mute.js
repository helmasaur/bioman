const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const i18n = require('i18next');
const config = require('../../config.json')

class MuteCommand extends Command {
	constructor() {
		super('mute', {
			aliases: ['mute', 'm'],
			category: 'moderation',
			args: [
				{
					id: 'mutedMember',
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
		const mutedMember = args.mutedMember;
		const reason = args.reason;

		if (!bot.hasPermission('MUTE_MEMBERS')) {
			return msg.reply(i18n.t('mute.noPermission.bot'));
		}
		
		if (!author.hasPermission('MUTE_MEMBERS')) {
			return msg.reply(i18n.t('mute.noPermission.author.members'));
		}
		
		if (!(author.roles.highest.position > mutedMember.roles.highest.position)) {
			return msg.reply(i18n.t('mute.noPermission.author.role', { member: mutedMember, interpolation: { escapeValue: false } }));
		}

		if (mutedMember.voice.serverMute) {
			return msg.reply(i18n.t('mute.alreadyMuted'));
		}

		if (mutedMember.id === bot.id) {
			return msg.reply(i18n.t('mute.noPermission.author.bot'));
		}

		msg.channel.send({embed: this.embed(author.user, mutedMember.user, reason)});
		return mutedMember.voice.setMute(true, reason);
	}

	embed(author, mutedMember, reason) {
		return new Discord.MessageEmbed()
			.setTitle(i18n.t('commandsUtil:moderation.embed.title'))
			.setAuthor(author.tag, author.displayAvatarURL)
			.setColor(config.richEmbedColors.moderation)
			.setThumbnail(mutedMember.displayAvatarURL)
			.addField(i18n.t('commandsUtil:moderation.embed.action'), i18n.t('mute.embed.action'), true)
			.addField(i18n.t('commandsUtil:moderation.reason'), reason, true)
			.addField('\u200b', '​\u200b') // blank field
			.addField(i18n.t('commandsUtil:moderation.embed.member'), mutedMember, true)
			.addField(i18n.t('commandsUtil:moderation.embed.memberID'), mutedMember.id, true);
	}
	
}

module.exports = MuteCommand;