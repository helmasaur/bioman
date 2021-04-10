const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const i18n = require('i18next');
const config = require('../../config.json')

class UnbanCommand extends Command {
	constructor() {
		super('unban', {
			aliases: ['unban', 'ub'],
			category: 'mod',
			args: [
				{
					id: 'unbannedMember' // Snowflake
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
		const guild = msg.guild;
		const author = msg.member;
		const unbannedMember = args.unbannedMember;
		const reason = args.reason;

		if (!bot.hasPermission('BAN_MEMBERS')) {
			return msg.reply(i18n.t('unban.noPermission.bot'));
		}

		if (!author.hasPermission('BAN_MEMBERS')) {
			return msg.reply(i18n.t('unban.noPermission.author'));
		}

		guild.fetchBan(unbannedMember)
			.then(() => {
				msg.channel.send(i18n.t('unban.error.alreadyBanned', {member: unbannedMember }))
			})
			.catch(async () => {
				await msg.channel.send({embed: this.embed(author.user, unbannedMember.user, reason)});
				unbannedMember.send(i18n.t('unban.pm', { author: author.user, reason : reason, interpolation: { escapeValue: false } }));
				return guild.members.unban(unbannedMember, { reason: reason });
			});
	}

	embed(author, unbannedMember, reason) {
		return new Discord.MessageEmbed()
			.setTitle(i18n.t('commandsUtil:moderation.embed.title'))
			.setAuthor(author.tag, author.displayAvatarURL)
			.setColor(config.richEmbedColors.moderation)
			.setThumbnail(unbannedMember.displayAvatarURL)
			.addField(i18n.t('commandsUtil:moderation.embed.action'), i18n.t('unban.embed.action'), true)
			.addField(i18n.t('commandsUtil:moderation.embed.reason'), reason, true)
			.addField('\u200b', '​\u200b') // blank field
			.addField(i18n.t('commandsUtil:moderation.embed.member'), unbannedMember, true)
			.addField(i18n.t('commandsUtil:moderation.embed.memberID'), unbannedMember.id, true);
	}
}

module.exports = UnbanCommand;