module.exports = (channel) => {
	let guild = channel.guild;

	console.log(`The channel ${channel.name} has been deleted.`);
	guild.defaultChannel.sendMessage(`*The channel **#${channel.name}** has been deleted.*`);
}