const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const i18n = require('i18next');
const config = require ('../../config.json');
const giphy = require('giphy-api')(config.giphyToken);

class GifCommand extends Command {
	constructor() {
		super('gif', {
			aliases: ['gif'],
			category: 'fun',
			args: [
				{
					id: 'keyword',
					default: 'random'
				}
			]
		});
	}

	exec(msg, args) {
		const author = msg.member;
		const keyword = args.keyword;

		giphy.random({
			tag: keyword,
			rating: config.gifRating,
			fmt: 'json'
		})
		.then(result => {
			if (Object.keys(result.data).length > 0) {
				return msg.channel.send({embed: this.embed(author.user, keyword, result.data.image_url, result.data.url)});
			} else {
				return msg.reply(`*${i18n.t('gif.noResult')}*`, { keyword });
			}
		}).catch(() => {
			return msg.reply(`*${i18n.t('gif.error')}*`);
		});
	};

	embed(author, keyword, image, link) {
		return new Discord.RichEmbed()
			.setTitle(i18n.t('gif.title'))
			.setAuthor(author.tag, author.displayAvatarURL)
			.setColor('RANDOM')
			.setFooter(i18n.t('gif.poweredBy'), 'https://pbs.twimg.com/profile_images/699676239620083713/WCUM0RqH_400x400.jpg')
			.setDescription(`${i18n.t('gif.originalLink')} ${link}`)
			.setImage(image)
			.addField('Keyword', keyword);
	};
}

module.exports = GifCommand;