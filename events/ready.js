module.exports = (bot, configuration) => {
	console.log('Bioman is launched.');
	bot.user.setGame(`version ${configuration.version}`);
}