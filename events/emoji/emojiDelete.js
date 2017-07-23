const config = require('../../config.js');
const richEmbed = require ('../../util/richEmbedHelper.js');

module.exports = (emoji) => {
	let guild = emoji.guild;

	console.log(`The emoticon ${emoji.name} (\`${emoji.identifier}\`) has been deleted.`);
	if (config.richEmbed) {
		return guild.defaultChannel.send({embed: richEmbed.emoji('DELETE', emoji.url, emoji.name)});
	} else {
		return guild.defaultChannel.send(`*The emoticon **:${emoji.name}:** has been deleted.*`);
	}
};