const commando = require('discord.js-commando');
const config = require('../../config.js');

module.exports = class PanCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'pan',
			group: 'inhibitor',
			memberName: 'pan',
			description: 'This command is used to inhibitate its use in `horsengel-roulette`.'
		});
	}

	async run(msg) {
		// Pew pew pew
	}
};