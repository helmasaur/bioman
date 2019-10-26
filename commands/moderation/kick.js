const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const i18n = require('i18next');
const config = require('../../config.json')

class KickCommand extends Command {
	constructor() {
		super('kick', {
			aliases: ['kick', 'k'],
			category: 'moderation',
			args: [
				{
					id: 'kickedMember',
					type: 'member'
				},
				{
					id: 'reason',
					//match: 'rest',
					default: () => i18n.t('kick.noReason')
				}
			],
			channelRestriction: 'guild'
		});
	}

	async exec(msg, args) {
		const bot = msg.guild.me;
		const author = msg.member;
		const kickedMember = args.kickedMember;
		const reason = args.reason;

		if (!bot.hasPermission('KICK_MEMBERS')) {
			return msg.reply(`*${i18n.t('kick.noPermission.bot.members')}*`);
		}
		
		if (kickedMember.id === author.id ) {
			if (author.id === msg.guild.ownerID) {
				return msg.reply(`*${i18n.t('kick.noPermission.owner')}*`);
			} else {
				author.kick();
				return msg.channel.send(`*${i18n.t('kick.kicked.author', author.user)}*`);
			}
		}
		
		if (!author.hasPermission('KICK_MEMBERS')) {
			return msg.reply(`*${i18n.t('kick.noPermission.author.members')}*`);
		}
		
		if (!(author.highestRole.position > kickedMember.highestRole.position)) {
			return msg.reply(`*${i18n.t('kick.noPermission.author.role', { kickedMember })}*`);
		}

		if (kickedMember.id === bot.id) {
			return msg.reply(`*${i18n.t('kick.noPermission.author.bot')}`);
		}

		if (!kickedMember.kickable) {
			return msg.reply(`*${i18n.t('kick.noPermission.bot.role', { kickedMember })}*`);
		}

		await msg.channel.send({embed: this.embed(author, kickedMember, reason)});
		await kickedMember.send(i18n.t('kick.kicked.pm', { author: author, reason : reason}));
		const invite = await msg.guild.defaultChannel.createInvite({maxAge: 0, maxUses: 1});
		await kickedMember.send(invite.url);
		return kickedMember.kick(reason);
	}

	embed(author, kickedMember, reason) {
		return new Discord.RichEmbed()
			.setTitle(i18n.t('kick.title'))
			.setAuthor(author.tag, author.displayAvatarURL)
			.setColor(config.richEmbedColors.moderation)
			//.setImage('https://img1.closermag.fr/var/closermag/storage/images/media/images-des-contenus/article/2016-08-04-corbier-l-ancien-complice-de-dorothee-je-deviens-ce-que-les-medias-ont-fait-de-moi-c-est-a-dire-rien/archive-corbier-1989/5405200-2-fre-FR/Archive-Corbier-1989_exact1024x768_l.jpg')
			.setThumbnail(kickedMember.displayAvatarURL)
			.addField('Action', i18n.t('kick.action'), true)
			.addField('Reason', reason, true)
			.addField('Member', kickedMember, true)
			.addField('Member ID', kickedMember.id, true);
	}
	
}

module.exports = KickCommand;