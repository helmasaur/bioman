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

		if (author.roles.highest.position < unroleMember.roles.highest.position) {
			return msg.reply(i18n.t('role.noPermission.author.member', { member: unroleMember, role: role, interpolation: { escapeValue: false } }));
		}

		if (author.roles.highest.position < role.position) {
			return msg.reply(i18n.t('role.noPermission.author.role', { member: unroleMember, interpolation: { escapeValue: false } }));
		}

		if (bot.roles.highest.position < role.position) {
			return msg.reply(i18n.t('role.noPermission.bot.role', { member: unroleMember, interpolation: { escapeValue: false } }));
		}

		if (unroleMember.roles.cache.get(role.id) === undefined) {
			return msg.reply(i18n.t('unrole.error.alreadyUnrole', { member: unroleMember, role: role, interpolation: { escapeValue: false } }));
		}

		return unroleMember.roles.remove(role);
	}
}

module.exports = UnroleCommad;