const { Listener } = require('discord-akairo');
const config = require('../../config.json');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready',
            category: 'client'
        });
    }

    exec() {
        console.log(`${config.name} is launched.`);
		return this.client.user.setActivity(`${config.version.name} (${config.version.number})`, { type: 'WATCHING' });
    }
}

module.exports = ReadyListener;