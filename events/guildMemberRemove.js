module.exports = member => {
	let = member.guild;

	console.log(`The member ${member.user} has left the guild ${guild.name}.`);
	guild.defaultChannel.sendMessage(`*The member ${member.user} has left the guild ${guild.name}.*`);
}