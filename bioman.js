const commando = require('discord.js-commando');
const path = require('path');
const tools = require('./util/toolsHelper.js');

const configuration = require('./configuration.json');
configuration.name = tools.upperFirst(require('./package.json').name);
configuration.description = require('./package.json').description;
configuration.version = require('./package.json').version;

// Bioman creation
const bot = new commando.Client({
	owner: configuration.ownerId,
	commandPrefix: configuration.prefix
});

// Event handler
require('./util/eventLoader')(bot, configuration);

bot.registry
	.registerGroups([
		['admin', 'Admin'],
		['fun', 'Fun']
	])
	.registerDefaults()
	.registerCommandsIn(path.join(__dirname, 'commands'));

bot.login(configuration.token);