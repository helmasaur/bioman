const { Listener } = require('discord-akairo');

class ReconnectingListener extends Listener {
    constructor() {
        super('reconnecting', {
            emitter: 'client',
            eventName: 'reconnecting',
            category: 'client'
        });
    }

    exec() {
		console.log(`${Bioman} is trying to reconnect itself.`);
    }
}

module.exports = ReconnectingListener;