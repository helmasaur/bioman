const commando = require('discord.js-commando');
const giphy = require('giphy-api')();
const config = require ('../../config.js');

module.exports = class GifCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'gif',
			group: 'fun',
			memberName: 'gif',
			description: 'Command to send a random GIF depending on a keyword. If no keyword is indicated, a random GIF will be displayed.',
			guildOnly: false,

			args: [{
				key: 'keyword',
				label: 'keyword',
				prompt: 'Wich keyword do you want to use to search for a random GIF?',
				type: 'string',
				default: 'random'
			}]
		});
	}

	async run(msg, args) {
		const keyword = args.keyword;

		giphy.random({
			tag: keyword,
			rating: config.gifRating,
			fmt: 'json'
		})
		.then(function(result) {
			if (Object.keys(result.data).length > 0) {
				console.log(`The GIF ${result.data.url} has been sent using the keyword: ${keyword}.`);
				msg.channel.send(`*${result.data.image_original_url} \n via **GIPHY** (${result.data.url})*`);
			} else {
				console.log(`No GIF has been found using the keyword: ${keyword}.`);
				msg.reply(`*No GIF has been found using the keyword: ${keyword}.*`);
			}
		}).catch(function() {
			console.log('*A problem has occured while the bot tried to fine a GIF.*');
		});
	}
};