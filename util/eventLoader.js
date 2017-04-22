const loadEvent = (event) => require(`../events/${event}`);

module.exports = bot => {
	// Bot events
	bot.on('disconnect', loadEvent('disconnect'));
	bot.on('ready', loadEvent('ready'));
	bot.on('reconnecting', loadEvent('reconnecting'));

	// Guild events
	// Channel
	bot.on('channelCreate', loadEvent('channelCreate'));
	bot.on('channelDelete', loadEvent('channelDelete'));
	bot.on('channelUpdate', loadEvent('channelUpdate'));
	// Emoticon (emoji events fixend in discord.js v11.1)
	bot.on('emojiCreate', loadEvent('emojiCreate'));
	bot.on('emojiDelete', loadEvent('emojiDelete'));
	bot.on('emojiUpdate', loadEvent('emojiUpdate'));

	// User events
	bot.on('guildBanAdd', loadEvent('guildBanAdd'));
	bot.on('guildBanRemove', loadEvent('guildBanRemove'));
	bot.on('guildBanAdd', loadEvent('guildMemberAdd'));
	bot.on('guildBanRemove', loadEvent('guildMemberRemove'));
	bot.on('guildMemberUpdate', loadEvent('guildMemberUpdate'));
	bot.on('presenceUpdate', loadEvent('presenceUpdate'));
}