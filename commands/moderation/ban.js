const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const i18n = require('i18next');
const config = require('../../config.json')

class BanCommand extends Command {
	constructor() {
		super('ban', {
			aliases: ['ban', 'b'],
			category: 'mod',
			args: [
				{
					id: 'bannedMember',
					type: 'member'
				},
				{
					id: 'reason',
					match: 'rest',
					default: () => i18n.t('ban.noReason')
				}
			],
			channelRestriction: 'guild'
		});
	}

	async exec(msg, args) {
		const bot = msg.guild.me;
		const author = msg.member;
		const bannedMember = args.bannedMember;
		const reason = args.reason;

		if (!bot.hasPermission('BAN_MEMBERS')) {
			return msg.reply(`*${i18n.t('ban.noPermission.bot.members')}*`);
		}

		if (bannedMember.id === author.id ) {
			return msg.reply(`*${i18n.t('ban.noPermission.author.me')}*`);
		}

		if (!author.hasPermission('BAN_MEMBERS')) {
			return msg.reply(`*${i18n.t('ban.noPermission.author.members')}*`);
		}

		if (!(author.highestRole.position > bannedMember.highestRole.position)) {
			return msg.reply(`*${i18n.t('ban.noPermission.author.role', { member: bannedMember, interpolation: { escapeValue: false } })}*`);
		}

		if (bannedMember.id === bot.id) {
			return msg.reply(`*${i18n.t('ban.noPermission.author.bot')}`);
		}

		if (!bannedMember.bannable) {
			return msg.reply(`*${i18n.t('ban.noPermission.bot.role', { member: bannedMember, interpolation: { escapeValue: false } })}*`);
		}

		await msg.channel.send({embed: this.embed(author.user, bannedMember.user, reason)});
		await bannedMember.send(i18n.t('ban.pm', { author: author.user, reason : reason, interpolation: { escapeValue: false }}));
		return guild.ban(bannedMember, { reason: reason });
	}

	embed(author, bannedMember, reason) {
		return new Discord.RichEmbed()
			.setTitle(i18n.t('commandsUtil:moderation.embed.title'))
			.setAuthor(author.tag, author.displayAvatarURL)
			.setColor(config.richEmbedColors.moderation)
			.setThumbnail(bannedMember.displayAvatarURL)
			.addField(i18n.t('commandsUtil:moderation.embed.action'), i18n.t('ban.embed.action'), true)
			.addField(i18n.t('commandsUtil:moderation.embed.reason'), reason, true)
			.addBlankField(true)
			.addField(i18n.t('commandsUtil:moderation.embed.member'), bannedMember, true)
			.addField(i18n.t('commandsUtil:moderation.embed.memberID'), bannedMember.id, true);
	}
}

module.exports = BanCommand;