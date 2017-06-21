const loadEvent = (event) => {
	return require(`../events/${event}`);
};

module.exports = (bot) => {
	// Bot events
	bot.on('disconnect', loadEvent('bot/disconnect'));
	bot.on('ready', () => loadEvent('bot/ready')(bot));
	bot.on('reconnecting', loadEvent('bot/reconnecting'));

	// Guild events
	bot.on('guildUnavaible', loadEvent('guild/guildUnavaible'));
	// Ban
	bot.on('guildBanAdd', () => loadEvent('guild/guildBanAdd'));
	bot.on('guildBanRemove', loadEvent('guild/guildBanRemove'));
	// Channel
	bot.on('channelCreate', loadEvent('channel/channelCreate'));
	bot.on('channelDelete', loadEvent('channel/channelDelete'));
	bot.on('channelUpdate', loadEvent('channel/channelUpdate'));
	// Emoticon
	bot.on('emojiCreate', loadEvent('emoji/emojiCreate'));
	bot.on('emojiDelete', loadEvent('emoji/emojiDelete'));
	bot.on('emojiUpdate', loadEvent('emoji/emojiUpdate'));
	// Roles
	bot.on('roleCreate', loadEvent('role/roleCreate'));
	bot.on('roleDelete', loadEvent('role/roleDelete'));
	bot.on('roleUpdate', loadEvent('role/roleUpdate'));

	// User/guild member events
	bot.on('guildMemberUpdate', (oldMember, newMember)  => {
		if (newMember.displayName !== oldMember.displayName) {
			loadEvent('member/displayNameUpdate')(oldMember, newMember);
		} else if (!newMember.roles.equals(oldMember.roles)) {
			loadEvent('member/roleUpdate.js')(oldMember, newMember);
		}
	});
	bot.on('presenceUpdate', (oldMember, newMember) => {
		if (newMember.presence.status !== oldMember.presence.status) {
			loadEvent('user/statusUpdate')(oldMember, newMember);
		} else if (newMember.presence.game !== oldMember.presence.game) {
			loadEvent('user/gameUpdate')(oldMember, newMember);
		}
	});
};