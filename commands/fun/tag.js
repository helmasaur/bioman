const commando = require('discord.js-commando');

module.exports = class KickCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'tag',
			group: 'fun',
			memberName: 'tag',
			description: 'Command to send a message depending on a keyword.',
			guildOnly: false,

			args: [{
				key: 'name',
				label: 'tagname',
				prompt: 'Which tag would you like to display?',
				type: 'string'
			}]
		})
	}

	async run(msg, args) {
		const keyword = args.name.toLowerCase();
		const tags = require('../../data/tags.json');

	 	var tag = (tags.find(t => t.keyword === keyword).display);

		for (let i = 0; tags.length > i; i++) {
        	if (tags[i].keyword === keyword) {
				console.log(`The tag "${keyword}" has been sent.`);
        		return msg.channel.sendMessage(`*tags[i].display*`);
        	} else {
				console.log(`*No tag has been found using the keyword: ${keyword}.*`);
				return msg.reply(`*No tag has been found using the keyword: ${keyword}.*`);
			}
    	}
	}
}