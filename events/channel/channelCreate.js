module.exports = (channel) => {
	// The new channel shouldn't be a DM
	if (channel.type === 'text' || channel.type === 'voice') {
		const guild = channel.guild;

		console.log(`The ${guild.type} channel ${channel.name} has been created.`);
		guild.defaultChannel.send(`*The ${channel.type} channel ${channel} has been created.*`);
	}
};