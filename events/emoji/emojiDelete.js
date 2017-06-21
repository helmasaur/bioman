module.exports = (emoji) => {
	let guild = emoji.guild;

	console.log(`The emoticon ${emoji.name} (\`${emoji.identifier}\`) has been deleted.`)
	guild.defaultChannel.send(`*The emoticon ${emoji.name} has been deleted.*`);
};