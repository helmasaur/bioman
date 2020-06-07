const { Command } = require('discord-akairo');
const i18n = require('i18next');

class RoleCommad extends Command {
	constructor() {
		super('role', {
			aliases: ['role'],
			category: 'moderation',
			args: [
				{
					id: 'role',
					type: 'role'
				},
				{
					id: 'roleMember',
					type: 'member'
				}
			],
		});
	}

	async exec(msg, args) {
		const bot = msg.guild.me
		const author = msg.member;
		const roleMember = args.roleMember;
		const role = args.role;

		if (author.highestRole.position < roleMember.highestRole.position) {
			return msg.reply(i18n.t('role.noPermission.author.member', { member: roleMember, interpolation: { escapeValue: false } }));
		}

		if (author.highestRole.position < role.position) {
			return msg.reply(i18n.t('role.noPermission.author.role', { member: roleMember, role: role, interpolation: { escapeValue: false } }));
		}

		if (bot.highestRole.position < role.position) {
			return msg.reply(i18n.t('role.noPermission.bot.role', { member: roleMember, role: role, interpolation: { escapeValue: false } }));
		}

		if (roleMember.roles.get(role.id) !== undefined) {
			return msg.reply(i18n.t('role.error.alreadyRole', { member: roleMember, role: role, interpolation: { escapeValue: false } }));
		}

		return roleMember.addRole(role);
	}
}

module.exports = RoleCommad;