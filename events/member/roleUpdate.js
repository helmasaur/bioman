const tools = require('../../util/objectHelper.js');

module.exports = (oldMember, newMember) => {
	let guild = newMember.guild;

	if (newMember.roles.size > oldMember.roles.size) {
		let newRole = tools.difference(newMember.roles, oldMember.roles)[0];
		console.log(`The member ${newMember.displayName} is now ${newRole.name}.`);
		guild.defaultChannel.send(`*The member ${newMember.user} is now **${newRole.name}**.*`);
	} else {
		let oldRole = tools.difference(oldMember.roles, newMember.roles)[0];
		console.log(`The member ${newMember.displayName} isn't anymore ${oldRole.name}.`);
		guild.defaultChannel.send(`*The member ${newMember.user} is now **${oldRole.name}**.*`);
	}
};