const commando = require('discord.js-commando');
const config = require('../../config.js');

module.exports = class YesCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'yes',
			group: 'inhibitors',
			memberName: 'yes',
			description: 'This command is used to inhibitate its use in `horsengel-roulette`.',
			guildOnly: true,
		});
	}

	async run(msg) {
		// Pew pew pew
	}
};