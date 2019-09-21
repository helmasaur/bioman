const { Listener } = require('discord-akairo');
const i18n = require('i18next');
const config = require ('../../config.json');

class RoleUpdateListener extends Listener {
	constructor() {
		super('roleUpdate', {
			emitter: 'client',
			eventName: 'roleUpdate',
			category: 'role'
		});
	}

	exec(oldRole, newRole) {
		if (newRole.name !== oldRole.name) {
			let message;

			if (oldRole.name === 'new role') {
				message = {
					content: 'events:role.update.name',
					options: { role: newRole, interpolation: { escapeValue: false }}
				};
			} else {
				message = {
					content: 'events:role.create',
					options: { oldRole: oldRole, newRole: newRole, interpolation: { escapeValue: false }}
				};
			}

			return role.guild.channels.get(config.defaultChannel).send(i18n.t(message.content, message.options));
		}
	}
}

module.exports = RoleUpdateListener;