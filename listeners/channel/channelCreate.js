const { Listener } = require('discord-akairo');
const i18n = require('i18next');
const config = require ('../../config.json');

class ChannelCreateListener extends Listener {
	constructor() {
		super('channelCreate', {
			emitter: 'client',
			eventName: 'channelCreate',
			category: 'channel'
		});
	}

	exec(channel) {
		let options;

		switch (channel.type) {
			case 'text':
				options = { channel: channel, interpolation: { escapeValue: false }};
				break;
			case 'voice':
				options = { channel: `**${channel}**`, interpolation: { escapeValue: false }}
				break;
			case 'category':
				options = { category: `**${channel.name}**` }
		}

		return channel.guild.channels.get(config.defaultChannel).send(i18n.t(`events:channel.create.${channel.type}`, options));
	}
}

module.exports = ChannelCreateListener;