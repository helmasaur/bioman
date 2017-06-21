module.exports = (oldMember, newMember) => {
	let guild = newMember.guild;

	console.log(`The member ${oldMember.displayName} is now called ${newMember.displayName}.`);
	guild.defaultChannel.send(`*The member **${oldMember.displayName}** is now called ${newMember.user}.*`);
};