const { Listener } = require('discord-akairo');
const i18n = require('i18next');
const config = require ('../../config.json');

class ChannelUpdateListener extends Listener {
	constructor() {
		super('channelUpdate', {
			emitter: 'client',
			event: 'channelUpdate',
			category: 'channel'
		});
	}

	exec(oldChannel, newChannel) {
		let message;

		switch(newChannel.type) {
			case 'category':
				message = this.categoryUpdate(oldChannel, newChannel);
				break;
			case 'text':
				message = this.textUpdate(oldChannel, newChannel);
				break;
			case 'voice':
				message = this.voiceUpdate(oldChannel, newChannel);
		}

		if (message.default) {
			return newChannel.guild.channels.cache.get(config.defaultChannel).send(i18n.t(message.content, message.options));
		} else {
			return newChannel.send(i18n.t(message.content, message.options));
		}
	}

	categoryUpdate(oldChannel, newChannel) {
		let message;

		return message = {
			content: 'events:channel.update.name.category',
			options: { oldCategory: `**${oldChannel.name}**`, newCategory: `**${newChannel.name}**`},
			default: true
		}
	}

	textUpdate(oldChannel, newChannel) {
		let message = new Object();

		if (newChannel.topic !== oldChannel.topic) {
			const isEmpty = str => {
				return (!str || 0 === str.length);
			};

			message.default = false;

			if (isEmpty(newChannel.topic)) {
				return message = {
					content: 'events:channel.update.topic.remove',
					options: { channel: newChannel, interpolation: { escapeValue: false }}
				};
			} else {
				return message = {
					content: 'events:channel.update.topic.set',
					options: { channel: newChannel.toString(), topic: newChannel.topic, interpolation: { escapeValue: false }}
				};
			}
		} else if (newChannel.name !== oldChannel.name) {
			return message = {
				content: 'events:channel.update.name.text',
				options: { oldChannel: `**#${oldChannel.name}**`, newChannel: newChannel.toString(), interpolation: { escapeValue: false }},
				default: false
			};
		}
	}

	voiceUpdate(oldChannel, newChannel) {
		let message;

		if (newChannel.name !== oldChannel.name) {
			return message = {
				content: 'events:channel.update.name.voice',
				options: { oldChannel: `**${oldChannel.name}**`, newChannel: `**${newChannel}**`, interpolation: { escapeValue: false }},
				default: true
			};
		}
	}
}

module.exports = ChannelUpdateListener