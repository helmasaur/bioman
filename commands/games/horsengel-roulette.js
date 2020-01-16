const { Command } = require('discord-akairo');
const config = require('../../config.json');
const HorsengelRoulette = require('horsengel-roulette');

class HorsengelRouletteCommand extends Command {
	constructor() {
		super('horsengel-roulette', {
			aliases: ['horsengel-roulette', 'hr'],
			category: 'games',
			args: [
				{
					id: 'provoked',
					type: 'member'
				}
			]});
	}

	async exec(msg, args) {
		const hr = new HorsengelRoulette(msg, msg.member, args.provoked, '!', config.language);
		hr.load(6, 1);
		hr.start(msg);
	}
}

module.exports = HorsengelRouletteCommand;