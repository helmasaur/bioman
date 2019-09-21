const { AkairoClient } = require('discord-akairo');
const i18next = require('i18next');
const Backend = require('i18next-node-fs-backend');
const config = require('./config.json');

const client = new AkairoClient({
	ownerID: config.ownerID,
	prefix: config.prefix,
	commandDirectory: './commands/',
	listenerDirectory: './listeners/',
	automateCategories: true
}, {
	dissableEveryone: true
});

client.login(config.token);

i18next.use(Backend).init({
	lng: config.language,
	fallbackLng: 'en',
	ns: ['commands', 'common', 'events'],
	defaultNS: 'commands',
	//debug: true,
	backend: {
		loadPath: './locales/{{lng}}/{{ns}}.json'
	}
});