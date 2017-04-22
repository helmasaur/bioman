module.exports = (oldEmoji, newEmoji) => {
	let guild = emoji.guild;

	if (newEmoji.name != oldEmoji.name) {
		console.log(`The emoticon ${oldEmoji.name} is now called ${newEmoji.name}`);
		guild.defaultChannel.sendMessage(`The emoticon ${oldEmoji.name} is now called ${newEmoji.name}`);
	}
}