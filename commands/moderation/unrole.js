const { Command } = require('discord-akairo');
const i18n = require('i18next');

class UnroleCommad extends Command {
	constructor() {
		super('unrole', {
			aliases: ['unrole'],
			category: 'moderation',
			args: [
				{
					id: 'role',
					type: 'role'
				},
				{
					id: 'unroleMember',
					type: 'member'
				}
			],
		});
	}

	async exec(msg, args) {
		const bot = msg.guild.me
		const author = msg.member;
		const unroleMember = args.unroleMember;
		const role = args.role;

		if (author.highestRole.position < unroleMember.highestRole.position) {
			return msg.reply(i18n.t('role.noPermission.author.member', { member: unroleMember, interpolation: { escapeValue: false } }));
		}

		if (author.highestRole.position < role.position) {
			return msg.reply(i18n.t('role.noPermission.author.role', { member: unroleMember, interpolation: { escapeValue: false } }));
		}

		if (bot.highestRole.position < role.position) {
			return msg.reply(i18n.t('role.noPermission.bot.role', { member: unroleMember, interpolation: { escapeValue: false } }));
		}

		return unroleMember.removeRole(role);
	}
}

module.exports = UnroleCommad;