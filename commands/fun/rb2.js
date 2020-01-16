const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const config = require ('../../config.json');

class RadioCommand extends Command {
	constructor() {
		super('radio', {
			aliases: ['radio', 'rb2'],
			category: 'fun',
			args: [
				{
					id: 'action',
					type: ['play', 'stop']
				}
			]
		});
	}

	exec(msg, args) {
		const author = msg.member;
		const bot = msg.guild.me;
		const action = args.action;

		switch (action) {
			case 'stop':
				return msg.member.voiceChannel.leave();
			case 'play':
				if (bot.hasPermission(['CONNECT', 'SPEAK'])) {
					if (author.voiceChannel) {
						msg.member.voiceChannel.join()
							.then(connection => {
								return connection.playArbitraryInput('https://upload.wikimedia.org/wikipedia/commons/c/c8/Example.ogg');
			
							})
							.catch(console.log);
					}
				} else {
					return msg.reply('I don\'t have the right to connect to a voice channel or speak');
				}
		}
	}
}

module.exports = RadioCommand