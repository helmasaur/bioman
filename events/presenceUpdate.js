module.exports = (oldMember, newMember) => {
	let guild = newMember.guild;

	if (newMember.presence.status === 'online') {
		console.log(`${newMember.user.username} has logged in.`);
		guild.defaultChannel.sendMessage(`*${newMember.user} has logged in.*`);
	} else if (newMember.presence.status === 'offline') {
		console.log(`${newMember.user.username} has logged out.`);
		guild.defaultChannel.sendMessage(`*${newMember.user} has logged out.*`);
	}
}