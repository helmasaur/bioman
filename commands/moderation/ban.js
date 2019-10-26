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
		const bot = guild.me;
		const author = msg.member;
		const bannedMember = args.bannedsMember;
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
			return msg.reply(`*${i18n.t('ban.noPermission.author.role', { bannedMember })}*`);
		}

		if (bannedMember.id === bot.id) {
			return msg.reply(`*${i18n.t('ban.noPermission.author.bot')}`);
		}

		if (!bannedMember.bannable) {
			return msg.reply(`*${i18n.t('ban.noPermission.bot.role', { bannedMember })}*`);
		}

		await msg.channel.send({embed: this.embed(author, bannedMember, reason)});
		await unbannedMember.send(i18n.t('ban.pm', { author: author, reason : reason}));
		return guild.ban(member, {reason: reason});
	}

	embed(author, bannedMember, reason) {
		return new Discord.RichEmbed()
			.setAuthor(author.tag, author.displayAvatarURL)
			.setColor(config.richEmbedColors.moderation)
			.setThumbnail(bannedMember.displayAvatarURL)
			.addField('Action', 'Ban', true)
			.addField('Reason', reason, true)
			.addField('Member', bannedMember, true)
			.addField('Member ID', bannedMember.id, true);
	}
}

module.exports = BanCommand;