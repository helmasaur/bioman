const { Listener } = require('discord-akairo');
const i18n = require('i18next');
const config = require ('../../config.json');

class GuildMemberUpdateListener extends Listener {
	constructor() {
		super('guildMemberUpdate', {
			emitter: 'client',
			event: 'guildMemberUpdate',
			category: 'member'
		});
	}

	exec(oldMember, newMember) {
		if (!newMember.roles.cache.equals(oldMember.roles.cache)) {
			return this.roleUpdate(oldMember, newMember);
		} else if(newMember.displayName !== oldMember.displayName) {
			return this.displayNameUpdate(oldMember, newMember);
		}
	}

	displayNameUpdate(oldMember, newMember) {
		if (!(oldMember.displayName === config.name) && newMember === i18n.t('commands:say.botNamePronunciation') || oldMember.displayName === i18n.t('commands:say.botNamePronunciation') && newMember === config.name) {
			return newMember.guild.channels.cache.get(config.defaultChannel).send(i18n.t('events:guildMemberUpdate.displayName', { oldMember: `**${oldMember.displayName}**`, newMember: newMember, interpolation: { escapeValue: false } }));
		}
	}

	roleUpdate(oldMember, newMember) {
		const roleDifference = (coll1, coll2) => {
			return coll1.filter((fn, k) => {
				return !coll2.has(k);
			});
		};

		if (newMember.roles.cache.size > oldMember.roles.cache.size) {
			const newRole = roleDifference(newMember.roles.cache, oldMember.roles.cache).first().toString();
			return newMember.guild.channels.cache.get(config.defaultChannel).send(i18n.t('events:guildMemberUpdate.role.add', { member: newMember.toString(), role: newRole, interpolation: { escapeValue: false } }));
		} else {
			const oldRole = roleDifference(oldMember.roles.cache, newMember.roles.cache).first().toString();
			return newMember.guild.channels.cache.get(config.defaultChannel).send(i18n.t('events:guildMemberUpdate.role.remove', { member: newMember.toString(), role: oldRole, interpolation: { escapeValue: false } }));
		}
	}
}

module.exports = GuildMemberUpdateListener;