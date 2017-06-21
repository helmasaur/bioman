module.exports = (oldRole, newRole) => {
	let guild = newRole.guild;

	if (newRole.name !== oldRole.name) {
		console.log(`The role ${oldRole.name} is now called ${newRole.name}.`);
		guild.defaultChannel.send(`*The role ${oldRole.name} is now called ${newRole}.*`);
	}
};