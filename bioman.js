const commando = require('discord.js-commando');
const path = require('path');
const configuration = require ('./configuration.json');

const bot = new commando.Client({
	owner: configuration.ownerId,
	commandPrefix: configuration.prefix
});

require ('./util/eventLoader')(bot);

bot.login(configuration.token);