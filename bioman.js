const commando = require('discord.js-commando');
const path = require('path');
const config = require('./config.js');

// Bioman creation
const bot = new commando.Client({
	owner: config.ownerId,
	commandPrefix: config.prefix
});

// Event handler
require('./util/eventLoader')(bot);

// Command handler
bot.registry
	.registerGroups([
		['admin', 'Admin'],
		['fun', 'Fun']
	])
	.registerDefaults()
	.registerCommandsIn(path.join(__dirname, 'commands'));

bot.login(config.token);