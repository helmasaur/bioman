module.exports = role => {
	let guild = role.guild;

	console.log(`The role ${role.name} has been created.`);
	guild.defaultChannel.send(`*The role ${role} has been created.*`);
};