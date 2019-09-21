const Discord = require('discord.js');
const { Listener } = require('discord-akairo');
const i18n = require('i18next');
const config = require ('../../config.json');

class EmojiUpdateListener extends Listener {
	constructor() {
		super('emojiUpdate', {
			emitter: 'client',
			eventName: 'emojiUpdate',
			category: 'emoji'
		});
	}

	exec(oldEmoji, newEmoji) {
		return newEmoji.guild.channels.get(config.defaultChannel).send(this.richEmbed(oldEmoji.name, newEmoji.name, newEmoji.url));
	}
	
	richEmbed(oldName, newName, url, author) {
		return new Discord.RichEmbed()
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