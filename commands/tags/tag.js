const commando = require('discord.js-commando');

module.exports = class TagCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'tag',
			group: 'tags',
			memberName: 'tag',
			description: 'Tag',
			guildOnly: true,

			args: [
				{
					key: 'name',
					label: 'tagname',
					prompt: 'Which tag would you like to display?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, args) {
		const tagName = args.name.toLowerCase();

		switch (tagName) {
			case 'boo':
				return msg.channel.sendMessage('Boo to you!');
			case 'moon':
				return msg.channel.sendMessage('🌕 🌖 🌗 🌘 🌑 🌒 🌓 🌔 🌕');
				//return message.channel.sendMessage(':full_moon: :waning_gibbous_moon: :last_quarter_moon: :waning_crescent_moon: :new_moon: :waxing_crescent_moon: :first_quarter_moon: :waxing_gibbous_moon: :full_moon:')
		}
	}
}
