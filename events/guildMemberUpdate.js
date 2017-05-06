module.exports = (oldMember, newMember) => {
	let guild = newMember.guild;

	if(newMember.displayName != oldMember.displayName) {
		console.log(`The member ${oldMember.displayName} is now called ${newMember.displayName}.`);
		guild.defaultChannel.sendMessage(`*The member ${oldMember.displayName} is now called ${newMember.user}.*`);
	}
}