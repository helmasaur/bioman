module.exports = member => {
	let guild = member.guild;

	console.log(`The member ${member.user} has left the guild ${guild.name}.`);
	guild.defaultChannel.send(`*The member ${member.user} has left the guild ${guild.name}.*`);
};