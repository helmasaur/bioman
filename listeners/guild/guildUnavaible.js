const Discord = require('discord.js');
const { Listener } = require('discord-akairo');
const i18n = require('i18next');
const config = require ('../../config.json');

class GuildUnavaibleListener extends Listener {
	constructor() {
		super('guildUnavaible', {
			emitter: 'client',
			eventName: 'guildUnavaible',
			category: 'guild'
		});
	}

	exec(guild) {
		console.log(`The server ${guild.name} is having issues.`);
	}
}

module.exports = GuildUnavaibleListener;