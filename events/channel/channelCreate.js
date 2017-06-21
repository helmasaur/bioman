module.exports = (channel) => {
	let guild = channel.guild;

	console.log(`The channel ${channel.name} has been created.`);
	guild.defaultChannel.send(`*The channel ${channel} has been created.*`);
};