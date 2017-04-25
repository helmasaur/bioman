const commando = require('discord.js-commando');
const path = require('path');
const configuration = require ('./configuration.json');

// Bioman creation
const bot = new commando.Client({
	owner: configuration.ownerId,
	commandPrefix: configuration.prefix
});

// Event handler
require ('./util/eventLoader')(bot);

bot.registry
	.registerGroups([
		['admin', 'Admin'],
		['fun', 'Fun']
	])
	.registerDefaults()
	.registerCommandsIn(path.join(__dirname, 'commands'));
	//.registerCommandsIn(path.join(__dirname, 'commands'));

bot.login(configuration.token);