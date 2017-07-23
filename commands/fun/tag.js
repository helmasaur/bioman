const commando = require('discord.js-commando');
const config = require ('../../config.js');
const tags = require('../../data/tags.json');
const tools = require('../../util/objectHelper.js');

module.exports = class TagCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'tag',
			group: 'fun',
			memberName: 'tag',
			description: 'Displays a message depending on a keyword.',
			details: `Tags avaible: ${tools.listData(tags)}`,
			throttling: {
				usages: config.throttlingUsages,
				duration: config.throttlingDuration
			},

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


//console.log(`The tag "${keyword}" has been sent.`);
//return msg.channel.send(`*${tags[i].display}*`);

//console.log(`*No tag has been found using the keyword: ${keyword}.*`);
//return msg.reply(`*No tag has been found using the keyword: ${keyword}.*`);