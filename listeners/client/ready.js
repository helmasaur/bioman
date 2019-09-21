const { Listener } = require('discord-akairo');
const config = require('../../config.json');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            eventName: 'ready',
            category: 'client'
        });
    }

    exec() {
		console.log(`${config.name} is launched.`);
		this.client.user.setActivity(`${config.version.name} (v${config.version.number})`, {type: 'WATCHING'});
    }
}

module.exports = ReadyListener;