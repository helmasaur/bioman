module.exports = (channel) => {
	if (channel.type === 'text' || channel.type === 'voice') {
		let guild = channel.guild;

		console.log(`The channel ${channel.name} has been deleted.`);
		guild.defaultChannel.send(`*The channel **#${channel.name}** has been deleted.*`);
	}
};