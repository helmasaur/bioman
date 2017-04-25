const commando = require('discord.js-commando');
const giphy = require('giphy-api')();

module.exports = class KickCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'gif',
			group: 'fun',
			memberName: 'gif',
			description: 'Command to send a random GIF from a keyword.',
			guildOnly: true,

			args: [{
				key: 'keyword',
				label: 'keyword',
				prompt: 'Wich keyword do you want to use to search for a random GIF?',
				type: 'string'
			}]
		});
	}

	async run (msg, args) {
		const keyword = args.keyword;

		giphy.random({
    		tag: keyword,
    		rating: 'g',
    		fmt: 'json'
		})
		.then(function (result) {
			if (Object.keys(result.data).length > 0) {
				console.log(`The GIF ${result.data.url} has been send using the keyword: ${keyword}.`);
				msg.channel.sendMessage(`${result.data.image_original_url} \n via **GIPHY** (${result.data.url})`);
			} else {
				console.log(`No GIF has been found using the keyword: ${keyword}.`);
				msg.channel.sendMessage(`*No GIF has been found using the keyword: ${keyword}.*`);
			}
		}).catch(function () {
			console.log('*A problem has occured while the bot tried to fine a GIF.*');
		});
	}
}