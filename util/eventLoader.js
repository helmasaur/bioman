const requestEvent = (event) => require(`../events/${event}`);

module.exports = bot => {
	// Bot events
	bot.on('disconnect.js', requestEvent('disconnect'));
	bot.on('ready', requestEvent('ready'));
	bot.on('reconnecting', requestEvent('reconnecting'));
	// Guild events
	bot.on('channelCreate', requestEvent('channelCreate'));
	bot.on('channelDelete', requestEvent('channelDelete'));
	bot.on('channelUpdate', requestEvent('channelUpdate'));
	// User events
	bot.on('guildMemberUpdate', requestEvent('guildMemberUpdate'));
	bot.on('presenceUpdate', requestEvent('presenceUpdate'));
}