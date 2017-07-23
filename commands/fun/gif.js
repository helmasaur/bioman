const commando = require('discord.js-commando');
const config = require ('../../config.js');
const richEmbed = require('../../util/richEmbedHelper.js');
const giphy = require('giphy-api')(config.giphyToken);

module.exports = class GifCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'gif',
			group: 'fun',
			memberName: 'gif',
			description: 'Sends a random GIF depending on a keyword. If no keyword is indicated, a random GIF will be displayed.',
			throttling: {
				usages: config.throttlingUsages,
				duration: config.throttlingDuration
			},

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
		const commander = msg.member;
		const keyword = args.keyword;

		giphy.random({
			tag: keyword,
			rating: config.gifRating,
			fmt: 'json'
		})
		.then(function(result) {
			if (Object.keys(result.data).length > 0) {
				console.log(`The GIF ${result.data.url} has been sent using the keyword: ${keyword}.`);
				if(config.richEmbed) {
					return msg.channel.send({embed: richEmbed.gif(commander.user, keyword, result.data.image_url, result.data.url)});
				} else {
					return msg.channel.send(`*${result.data.image_url} \n via **GIPHY** (${result.data.url})*`);
				}
			} else {
				console.log(`No GIF has been found using the keyword: ${keyword}.`);
				return msg.reply(`*No GIF has been found using the keyword: ${keyword}.*`);
			}
		}).catch(function() {
			console.log('*A problem has occured while the bot tried to fine a GIF.');
			return msg.reply(`*I believe that a server issue occured. Try again with the same keyword.*`);
		});
	}
};