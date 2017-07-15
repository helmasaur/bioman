const commando = require('discord.js-commando');

module.exports = class RouletteCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'horsengel-roulette',
			group: 'games',
			memberName: 'horsengel-roulette',
			description: '',

			args: [{
				key: 'provoked',
				label: 'user',
				prompt: '',
				type: 'member'//,
				//infinite: true
			}]
		});
	}

	async run(msg, args) {
		const commander = msg.member;
		let provoked = args.provoked;
		let player = commander;
		let gameOver = true;
		let round;

		let revolver = [];
		const magazine = 6;
		const bullets = 1;
		let chamber;

		for (chamber = 0; chamber < magazine; chamber++) {
			revolver[chamber] = 0;
		}

		for (let b = 0; b < bullets; b++) {
			chamber = Math.floor(Math.random() * (magazine));
			revolver[chamber] = 1;
		}
		console.log(revolver);

		const filterStart = message => {
			if (message.author.id === provoked.id && message.content.startsWith('yes')) {
				return true;
			} else {
				return false;
			}
		}

		const filterContinue = (message) => {
			if (message.author.id === player.id && message.content === 'pan') {
				return true;
			} else {
				return false;
			}
		}

		// Game
		msg.channel.send(`${provoked}, you have been challenged by ${commander} to a *Horsengel roulette* duel. Your answer must start by \`yes\` to accept it. (You have 30 seconds.)`);
		const game = await msg.channel.awaitMessages(filterStart, {maxMatches: 1, time: 30000, errors: ['time']})
			.then(async () => {
				gameOver = false;
			})
			.catch(() => {
				return msg.reply(`Your opponent, ${provoked} preferred to run away.`);
			}
		);

		if (!gameOver) {
			for (chamber = 0; chamber < magazine; chamber++) {
				msg.channel.send(`${player}, it's your turn to shoot. You should use the command \`pan\` to shoot. (You have 30 seconds.)`);

				round = await msg.channel.awaitMessages(filterContinue, {maxMatches: 1, time: 30000, errors: ['time']})
					.then(() => {
						if (revolver[chamber] === 1) {
							chamber = magazine;
							return msg.channel.send(`${player} is dead.`);
						}
						msg.channel.send(`${player} is still alive.`);
					})
					.catch(() => {
						return msg.reply(`${player} preferred to run away.`);
					});

				if (player.id === commander.id) {
					player = provoked;
				} else {
					player = commander;
				}
			}
		}
	}
};