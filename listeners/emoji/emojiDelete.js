const Discord = require('discord.js');
const { Listener } = require('discord-akairo');
const i18n = require('i18next');
const config = require ('../../config.json');

class EmojiDeleteListener extends Listener {
	constructor() {
		super('emojiDelete', {
			emitter: 'client',
			event: 'emojiDelete',
			category: 'emoji'
		});
	}

	async exec(emoji) {
		return emoji.guild.channels.cache.get(config.defaultChannel).send(this.embed(emoji.name, emoji.url));
	}
	
	embed(name, url) {
		return new Discord.MessageEmbed()
			.setTitle(i18n.t('events:emoji.title'))
			//.setAuthor(author.tag, author.avatarURL)
			.setColor(config.richEmbedColors.information)
			.setDescription(i18n.t('events:emoji.delete.description'))
			.setThumbnail(url)
			.addField(i18n.t('events:emoji.delete.shortcutTitle'), `\`:${name}:\``)
	}
}

module.exports = EmojiDeleteListener;