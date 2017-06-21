module.exports = (emoji) => {
	let guild = emoji.guild;

	console.log(`The emoticon ${emoji.name} has been added.`);
	guild.defaultChannel.send(`*The emoticon ${emoji.name} has been added.*`);
};