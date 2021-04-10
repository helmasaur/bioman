const { Listener } = require('discord-akairo');
const i18n = require('i18next');
const config = require ('../../config.json');

class RoleCreateListener extends Listener {
	constructor() {
		super('roleCreate', {
			emitter: 'client',
			event: 'roleCreate',
			category: 'role'
		});
	}

	exec(role) {
		// role.name will always be: new role
		//return role.guild.channels.get(config.defaultChannel).send(i18n.t('events:role.create', { role: role, interpolation: { escapeValue: false }}));
	}
}

module.exports = RoleCreateListener;