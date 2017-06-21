const config = require('../../config.js');

module.exports = (bot) => {
	console.log('Bioman is launched.');
	bot.user.setGame(`version ${config.version}`);
};