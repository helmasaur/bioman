const tools = require('../../util/objectHelper.js');

module.exports = (oldChannel, newChannel) => {

	// Channel's name updated
	if (newChannel.name !== oldChannel.name) {
		console.log(`The channel ${oldChannel.name} is now called ${newChannel.name}.`);
		newChannel.send(`*The channel **#${oldChannel.name}** is now called ${newChannel}.*`);
	}

	// Channel's topic updated
	if (newChannel.topic !== oldChannel.topic) {
		if(tools.isEmpty(newChannel.topic)) {
			console.log(`The channel ${newChannel.name}'s topic has been deleted.`);
			newChannel.send(`*The channel ${newChannel}'s topic has been deleted.*`);
		} else {
			console.log(`The channel ${newChannel.name}'s topic has been updated: ${newChannel.topic}`);
			newChannel.send(`The channel *${newChannel}'s topic has been updated:\n\`\`\`${newChannel.topic}\`\`\`*`);
		}
	}
};