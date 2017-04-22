module.exports = (channel) => {
	let guild = channel.guild;

	console.log(`The room ${channel.name} has been created.`);
	guild.defaultChannel.sendMessage(`*${channel} has been created.*`);
}