module.exports = (oldMember, newMember) => {
	let guild = newMember.guild;

	if(!newMember.displayName != newMember.displayName) {
		console.log(`${oldMember.displayName} is now called ${newMember.displayName}.`);
		guild.defaultChannel.sendMessage(`*${oldMember.displayName} is now called ${newMember.user}.*`);
	}
}