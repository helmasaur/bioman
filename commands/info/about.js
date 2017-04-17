const commando = require('discord.js-commando');

module.exports = class About extends commando.Command {
	constructor(client) {
		super(client, {
			description: 'Affiche des informations à propos du bot.',
			group: 'info',
			memberName:  'about',
			name: 'about'
		});
	}

	async run(msg) {
		return msg.channel.sendMessage('tuoba');
	}
}
