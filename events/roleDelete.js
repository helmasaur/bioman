module.exports = role => {
	guild = role.guild;

	console.log(`The role ${role.name} has been created.`);
	guild.defaultChannel.sendMessage(`The role ${role.name} has been deleted.`);
}