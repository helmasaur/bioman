module.exports = (oldMember, newMember) => {
	let guild = newMember.guild;

	if (newMember.presence.status === 'online') {
		console.log(`The member ${newMember.user.username} has logged in.`);
		guild.defaultChannel.sendMessage(`*The member ${newMember.user} has logged in.*`);
	} else if (newMember.presence.status === 'offline') {
		console.log(`The member ${newMember.user.username} has logged out.`);
		guild.defaultChannel.sendMessage(`*The membr ${newMember.user} has logged out.*`);
	}
}