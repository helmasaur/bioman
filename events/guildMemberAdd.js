module.exports = member => {
	let = member.guild;

	console.log(`The member ${member.user} is now a member of ${guild.name}. Welcome!`);
	guild.defaultChannel.sendMessage(`*The member ${member.user} is now a member of ${guild.name}. Welcome!*`);
}