module.exports = (oldMember, newMember) => {
	let guild = newMember.guild;

	// Checks if it's not the bot's name which is modified during a "say" command
	if (oldMember.displayName === 'Bioman' && newMember === 'Biomane' || oldMember.displayName === 'Biomane' && newMember === 'Bioman') {
		console.log(`The member ${oldMember.displayName} is now called ${newMember.displayName}.`);
		guild.defaultChannel.send(`*The member **${oldMember.displayName}** is now called ${newMember.user}.*`);
	}
};