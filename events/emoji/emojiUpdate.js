module.exports = (oldEmoji, newEmoji) => {
	let guild = newEmoji.guild;

	if (newEmoji.name != oldEmoji.name) {
		console.log(`The emoticon ${oldEmoji.name} is now called ${newEmoji.name}`);
		guild.defaultChannel.send(`*The emoticon **${oldEmoji.name}** is now called ${newEmoji.name}*`);
	}
};