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

bot.on

bot.login(configuration.token);