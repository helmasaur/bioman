module.exports = (oldRole, newRole) => {
	guild = newRole.guild;

	if (newRole.name != oldRole.name) {
		console.log(`The role ${oldRole.name} is now called ${newRole.name}.`);
		guild.defaultChannel.sendMessage(`*The role ${oldRole.name} is now called ${newRole}.*`);
	}
}