module.exports = (guild, user) => {
	console.log(`The member ${user} has been banned.`);
	guild.defaultChannel.sendMessage(`The member *${user} has been banned.*`);
}