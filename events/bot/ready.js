const config = require('../../config.js');

module.exports = (bot) => {
	console.log('Bioman is launched.');
	bot.user.setGame(`version ${config.version}`);
	// Sends a message in each default channel of every guild where this bot is.
	bot.guilds.forEach(function(guild) {
    	guild.defaultChannel.send('*Bioman is launched.*');
	});
};