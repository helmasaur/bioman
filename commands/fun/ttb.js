const commando = require('discord.js-commando');
const tags = require('../../data/ttb.json');
const tools = require('../../util/objectHelper.js');

module.exports = class TTBCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'ttb',
			group: 'fun',
			memberName: 'ttb',
			description: 'Command to send a TTB related message depending on a keyword.',
			details: `Tags avaible: ${tools.listData(tags)}`,
			guildOnly: false,

			args: [{
				key: 'name',
				label: 'tagname',
				prompt: 'Which tag would you like to display?',
				type: 'string'
			}]
		});
	}

	async run(msg, args) {
		const keyword = args.name.toLowerCase();
		const tag = tags[keyword];

		if(typeof tag === 'undefined') {
			console.log(`No tag has been found using the keyword: ${keyword}.`);
			return msg.reply(`*No tag has been found using the keyword: ${keyword}.*`);
		}
		else {
			console.log(`The tag "${tag.name}" has been sent.`);
			return msg.channel.send(`*${tag.display}*`);
		}
	}
};