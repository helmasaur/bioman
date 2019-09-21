const { Listener } = require('discord-akairo');
const i18n = require('i18next');
const config = require ('../../config.json');

class GuildMemberUpdateListener extends Listener {
	constructor() {
		super('guildMemberUpdate', {
			emitter: 'client',
			eventName: 'guildMemberUpdate',
			category: 'member'
		});
	}

	exec(oldMember, newMember) {
		if (!newMember.roles.equals(oldMember.roles)) {
			this.roleUpdate(oldMember, newMember);
		} else if(newMember.displayName !== oldMember.displayName) {
			this.displayNameUpdate(oldMember, newMember);
		}
	}

	displayNameUpdate(oldMember, newMember) {
		if (!(oldMember.displayName === config.name && newMember === i18n.t('commands:say.botNamePronunciation')  || oldMember.displayName === i18n.t('commands:say.botNamePronunciation') && newMember === config.name)) {
			return newMember.guild.channels.get(config.defaultChannel).send(i18n.t('events:guildMemberUpdate.displayName', { oldMember: `**${oldMember.displayName}**`, newMember: newMember, interpolation: { escapeValue: false } }));
		}
	}

	roleUpdate(oldMember, newMember) {
		const roleDifference = (coll1, coll2) => {
			return coll1.filter((fn, k) => {
				return !coll2.has(k);
			});
		};

		if (newMember.roles.size > oldMember.roles.size) {
			const newRole = roleDifference(newMember.roles, oldMember.roles).first();
			return newMember.guild.channels.get(config.defaultChannel).send(i18n.t('events:guildMemberUpdate.role.add', { member: newMember, role: newRole, interpolation: { escapeValue: false } }));
		} else {
			const oldRole = roleDifference(oldMember.roles, newMember.roles).first();
			return newMember.guild.channels.get(config.defaultChannel).send(i18n.t('events:guildMemberUpdate.role.remove', { member: newMember, role: oldRole, interpolation: { escapeValue: false } }));
		}
	}
}

module.exports = GuildMemberUpdateListener;