module.exports = (emoji) => {
	let guild = emoji.guild;

	console.log(`The emoticon ${emoji.name} (\`${emoji.identifier}\`) has been deleted.`)
	guild.defaultChannel.sendMessage(`*The emoticon ${emoji.name} (\`${emoji.identifier}\`) has been deleted.*`);
}