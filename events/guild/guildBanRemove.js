module.exports = (guild, user) => {
	console.log(`The member ${user} has been unbanned.`);
	guild.defaultChannel.send(`*The member ${user} has been unbanned.*`);
};