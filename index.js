const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const i18next = require('i18next');
const Backend = require('i18next-node-fs-backend');
const config = require('./config.json');

class Bioman extends AkairoClient {
	constructor() {
		super({
			ownerID: config.ownerID
		}, {
			disableMentions: 'everyone'
		});

		this.commandHandler = new CommandHandler(this, {
			directory: './commands/',
			prefix: config.prefix
		});

		this.listenerHandler = new ListenerHandler(this, {
			directory: './listeners/'
		});

		this.commandHandler.loadAll();
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.listenerHandler.loadAll();
	}
}

const client = new Bioman();
client.login(config.token);

i18next.use(Backend).init({
	lng: config.language,
	fallbackLng: 'en',
	ns: ['commands', 'commandsUtil', 'events'],
	defaultNS: 'commands',
	// debug: true,
	backend: {
		loadPath: './locales/{{lng}}/{{ns}}.json'
	}
});