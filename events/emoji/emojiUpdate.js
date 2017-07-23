const config = require('../../config.js');
const richEmbed = require ('../../util/richEmbedHelper.js');

module.exports = (oldEmoji, newEmoji) => {
	let guild = newEmoji.guild;

	if (newEmoji.name !== oldEmoji.name) {
		console.log(`The emoticon ${oldEmoji.name} is now called ${newEmoji.name}`);
		if (config.richEmbed) {
			return guild.defaultChannel.send({embed: richEmbed.emoji('UPDATE', newEmoji.url, newEmoji.name, oldEmoji.name)});
		} else {
			return guild.defaultChannel.send(`*The emoticon **:${oldEmoji.name}:** is now called ${newEmoji.name}*`);
		}
	}
};