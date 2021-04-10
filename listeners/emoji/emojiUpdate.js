const Discord = require('discord.js');
const { Listener } = require('discord-akairo');
const i18n = require('i18next');
const config = require ('../../config.json');

class EmojiUpdateListener extends Listener {
	constructor() {
		super('emojiUpdate', {
			emitter: 'client',
			event: 'emojiUpdate',
			category: 'emoji'
		});
	}

	exec(oldEmoji, newEmoji) {
		return newEmoji.guild.channels.cache.get(config.defaultChannel).send(this.embed(oldEmoji.name, newEmoji.name, newEmoji.url));
	}
	
	embed(oldName, newName, url, author) {
		return new Discord.MessageEmbed()
			.setTitle(i18n.t('events:emoji.title'))
			//.setAuthor(author.tag, author.avatarURL)
			.setColor(config.richEmbedColors.information)
			.setDescription(i18n.t('events:emoji.update.description'))
			.setThumbnail(url)
			.addField(i18n.t('events:emoji.update.shortcutTitle.old'), `\`:${oldName}:\``, true)
			.addField(i18n.t('events:emoji.update.shortcutTitle.new'), `\`:${newName}:\``, true);
	}
}

module.exports = EmojiUpdateListener;