const { Listener } = require('discord-akairo');
const i18n = require('i18next');
const config = require ('../../config.json');

class RoleDeleteListener extends Listener {
	constructor() {
		super('roleDelete', {
			emitter: 'client',
			eventName: 'roleDelete',
			category: 'role'
		});
	}

	exec(role) {
		return role.guild.channels.get(config.defaultChannel).send(i18n.t('events:role.delete', { role: `**#${role.name}**`, interpolation: { escapeValue: false }}));
	}
}

module.exports = RoleDeleteListener;