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
					id: 'unbannedMember',
					type: 'member'
				},
				{
					id: 'reason',
					match: 'rest',
					default: () => i18n.t('unban.noReason')
				}
			],
			channelRestriction: 'guild'
		});
	}

	async exec(msg, args) {
		const bot = guild.me;
		const author = msg.member;
		const unbannedMember = args.unbannedMember;
		const reason = args.reason;

		if (!bot.hasPermission('BAN_MEMBERS')) {
			return msg.reply(`*${i18n.t('unban.noPermission.bot')}*`);
		}

		if (!author.hasPermission('BAN_MEMBERS')) {
			return msg.reply(`*${i18n.t('unban.noPermission.author')}*`);
		}

		await msg.channel.send({embed: this.embed(author, unbannedMember, reason)});
		unbannedMember.send(i18n.t('unban.pm', { author: author, reason : reason}));
		return guild.unban(member.id, {reason: reason});
	}

	embed(author, unbannedMember, reason) {
		return new Discord.RichEmbed()
			.setAuthor(author.tag, author.displayAvatarURL)
			.setColor(config.richEmbedColors.moderation)
			.setThumbnail(unbannedMember.displayAvatarURL)
			.addField('Action', 'Unban', true)
			.addField('Reason', reason, true)
			.addField('Member', unbannedMember, true)
			.addField('Member ID', unbannedMember.id, true);
	}
}

module.exports = UnbanCommand;