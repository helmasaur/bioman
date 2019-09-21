const { Listener } = require('discord-akairo');
const i18n = require('i18next');
const config = require ('../../config.json');

class ChannelDeleteListener extends Listener {
	constructor() {
		super('channelDelete', {
			emitter: 'client',
			eventName: 'channelDelete',
			category: 'channel'
		});
	}

	exec(channel) {
		return channel.guild.channels.get(config.defaultChannel).send(i18n.t(`events:channel.delete.${channel.type}`, { channel: `**#${channel.name}**`}));
	}
}

module.exports = ChannelDeleteListener;