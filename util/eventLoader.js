const loadEvent = (event) => require(`../events/${event}`);

module.exports = (bot, configuration) => {
	// Bot events
	bot.on('disconnect', loadEvent('disconnect'));
	bot.on('ready', () => loadEvent('ready')(bot, configuration));
	bot.on('reconnecting', loadEvent('reconnecting'));

	// Guild events
	bot.on('guildUnavaible', loadEvent('guildUnavaible'));
	// Channel
	bot.on('channelCreate', loadEvent('channelCreate'));
	bot.on('channelDelete', loadEvent('channelDelete'));
	bot.on('channelUpdate', loadEvent('channelUpdate'));
	// Emoticon (emoji events fixend in discord.js v11.1)
	bot.on('emojiCreate', loadEvent('emojiCreate'));
	bot.on('emojiDelete', loadEvent('emojiDelete'));
	bot.on('emojiUpdate', loadEvent('emojiUpdate'));
	// Roles
	bot.on('roleCreate', loadEvent('roleCreate'));
	bot.on('roleDelete', loadEvent('roleDelete'));
	bot.on('roleUpdate', loadEvent('roleUpdate'));

	// User events
	bot.on('guildBanAdd', loadEvent('guildBanAdd'));
	bot.on('guildBanRemove', loadEvent('guildBanRemove'));
	bot.on('guildBanAdd', loadEvent('guildMemberAdd'));
	bot.on('guildBanRemove', loadEvent('guildMemberRemove'));
	bot.on('guildMemberUpdate', loadEvent('guildMemberUpdate'));
	bot.on('presenceUpdate', loadEvent('presenceUpdate'));
}