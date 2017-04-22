module.exports = (channel) => {
	let guild = channel.guild;

	console.log(`The room ${channel.name} has been deleted.`);
	guild.defaultChannel.sendMessage(`***#${channel.name}** has been deleted.*`);
}