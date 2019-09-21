const Discord = require('discord.js');
const { Listener } = require('discord-akairo');
const i18n = require('i18next');
const config = require ('../../config.json');

class EmojiCreateListener extends Listener {
	constructor() {
		super('emojiCreate', {
			emitter: 'client',
			eventName: 'emojiCreate',
			category: 'emoji'
		});
	}

	exec(emoji) {
		emoji.fetchAuthor().then(author => {
			return emoji.guild.channels.get(config.defaultChannel).send(this.richEmbed(emoji.name, emoji.url, author));
		});
	}
	
	richEmbed(name, url, author) {
		return new Discord.RichEmbed()
			.setTitle(i18n.t('events:emoji.title'))
			.setAuthor(author.tag, author.avatarURL)
			.setColor(config.richEmbedColors.information)
			.setDescription(i18n.t('events:emoji.create.description'))
			.setThumbnail(url)
			.addField(i18n.t('events:emoji.create.shortcutTitle'), `\`:${name}:\``)
	}
}

module.exports = EmojiCreateListener;