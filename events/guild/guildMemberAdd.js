module.exports = member => {
	let guild = member.guild;

	console.log(`The member ${member.user} is now a member of ${guild.name}. Welcome!`);
	guild.defaultChannel.send(`*The member ${member.user} is now a member of ${guild.name}. Welcome!*`);
};