const { Listener } = require('discord-akairo');
const config = require ('../../config.json');

class DisconnectListener extends Listener {
    constructor() {
        super('disconnect', {
            emitter: 'client',
            eventName: 'disconnect',
            category: 'client'
        });
    }

    exec() {
		console.log(`${config.name} has stopped working.`);
    }
}

module.exports = DisconnectListener;