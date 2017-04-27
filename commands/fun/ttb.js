const commando = require('discord.js-commando');

module.exports = class KickCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'ttb',
			group: 'fun',
			memberName: 'ttb',
			description: 'Command to send a message depending on a keyword.',
			guildOnly: true,

			args: [{
				key: 'name',
				label: 'tagname',
				prompt: 'Which tag would you like to display?',
				type: 'string'
			}]
		})
	}

	async run (msg, args) {
		const keyword = args.name.toLowerCase();
		const tags = require('../../data/ttb.json');

		for (let i = 0; tags.length > i; i++) {
        	if (tags[i].keyword === keyword) {
				return msg.channel.sendMessage(tags[i].display);
			}
		}
	}
}