module.exports = (oldMember, newMember) => {
	let guild = newMember.guild;

	if (newMember.presence.game === null) {
		console.log(`*The member ${newMember.user.tag} has stopped playing to ${oldMember.presence.game.name}.`);
		guild.defaultChannel.send(`*The member ${newMember.user} has stopped playing to **${oldMember.presence.game.name}**.*`);
	} else {
		console.log(`The member ${newMember.user.tag} started playing to ${newMember.presence.game.name}.`);
		guild.defaultChannel.send(`*The member ${newMember.user} started playing to **${newMember.presence.game.name}**.*`);
	}
};