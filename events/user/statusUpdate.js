module.exports = (oldMember, newMember) => {
	let guild = newMember.guild;

	if (newMember.presence.status === 'online' && oldMember.presence.status === 'offline') {
		console.log(`The member ${newMember.user.tag} has logged in.`);
		guild.defaultChannel.send(`*The member ${newMember.user} has logged in.*`);
	} else if (newMember.presence.status === 'offline') {
		console.log(`The member ${newMember.user.tag} has logged out.`);
		guild.defaultChannel.send(`*The member ${newMember.user} has logged out.*`);
	}
};