modules.exports = (guild, user) => {
	console.log(`The member ${user} has been unbanned.`);
	guild.defaultChannel.sendMessage(`*The member ${user} has been unbanned.*`);
}