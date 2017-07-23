const commando = require('discord.js-commando');
const config = require ('../../config.js');
const richEmbed = require('../../util/richEmbedHelper.js');

module.exports = class RouletteCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'horsengel-roulette',
			aliases: ['hr'],
			group: 'games',
			memberName: 'horsengel-roulette',
			description: 'Russian roulette game but when you lose, you get kicked.',

			args: [{
				key: 'provoked',
				label: 'user',
				prompt: 'With which member do you want to play Horsengel roulette?',
				type: 'member'/*,
				infinite: true*/
			}]
		});
	}

	async run(msg, args) {
		const commander = msg.member;
		let provoked = args.provoked;
		const bot = msg.guild.me;

		// Game variables
		let player = commander;
		let gameStart = false;
		let round;
		const lostMessage = "lost a Horsengel roulette";

		// Kick command
		const kick = (player, lostMessage) => msg.client.registry.commands.get('kick')
			.run(bot.lastMessage, {member: player, description: lostMessage});

		// Checks if the provoked person is the commander or the bot.
		if (provoked.id === bot.id) {
			const biomanLostMessage = 'Bioman can\'t lose.';
			console.log(`${commander.user.tag} provoked Bioman to a Horsengel roulette duel.`);
			msg.channel.send(`*!kick ${player} ${biomanLostMessage}*`);
			return kick(commander, biomanLostMessage);
		} else if (provoked.id === commander.id) {
			if (commander.id === msg.guild.ownerID) {
				console.log(`${commander.user.tag} tried to play Horsengel roulette with himself.`);
				return msg.reply('*I can\'t suggest you to kick yourself. I would feel remorse after.*');
			} else {
				console.log(`${commander.user.tag} tried to play Horsengel roulette with himself.`);
				return msg.channel.send('*It would be easier to kick yourself. Or would you need some help?*');
			}
		}
		console.log(`${commander.user.tag} provoked ${provoked.user.tag} to a Horsengel roulette duel.`);

		// Revolver variables
		let revolver = [];
		const magazine = 6;
		const bullets = 1;
		let chamber;

		// Initialise the chambers
		for (chamber = 0; chamber < magazine; chamber++) {
			revolver[chamber] = 0;
		}

		// Adds bullets to random chambers
		for (let b = 0; b < bullets; b++) {
			chamber = Math.floor(Math.random() * (magazine));
			revolver[chamber] = 1;
		}
		console.log(`Magazine: ${revolver}.`);

		//  Answers filters (for <TextChannel>.awaitMessages)
		const filterStart = message => {
			if (message.author.id === provoked.id && message.content.startsWith(`${config.prefix}yes`)) {
				return true;
			} else {
				return false;
			}
		}

		const filterContinue = (message) => {
			if (message.author.id === player.id && message.content === `${config.prefix}pan`) {
				return true;
			} else {
				return false;
			}
		}

		// Game
		msg.channel.send(`*${provoked}, you have been challenged by ${commander} to a* Horsengel roulette *duel. Your answer must start by \`${config.prefix}yes\` to accept it. (You have 30 seconds.)*`);
		try {
			const game = await msg.channel.awaitMessages(filterStart, {maxMatches: 1, time: 30000, errors: ['time']})
			// Start of the game
			for (chamber = 0; chamber < magazine; chamber++) {
				console.log(`${player.user.tag}'s turn.`)
				if (config.richEmbed) {
					msg.channel.send({embed: richEmbed.horsengelRoulette(commander, provoked, chamber)});
				} else {
					msg.channel.send(`*${player}, it's your turn to shoot. You should use the command \`${config.prefix}pan\` to shoot. (You have 30 seconds.)*`);
				}

				try {
					// Round
					round = await msg.channel.awaitMessages(filterContinue, {maxMatches: 1, time: 30000, errors: ['time']})
					if (revolver[chamber] === 1) {
						// Prevents the kick of the owner of the guild
						if (player.user.id === msg.guild.ownerID) {
							console.log(`${player.user.tag} lost the Horsengel roulette duel but can't be kicked.`);
							return msg.channel.send(`*I don't have the right to kick ${player} but I can say that he lost.*`);
						} else {
							console.log(`${player.user.tag} lost the Horsengel roulette duel.`);
							if (config.richEmbed) {
								msg.channel.send({embed: richEmbed.horsengelRoulette(commander, provoked, chamber, true)});
							} else {
								msg.channel.send(`${player} shot and lost.`);
							}
							msg.channel.send(`*!kick ${player} ${lostMessage}*`);
							return kick(player, lostMessage);
						}
					}
					console.log(`${player.user.tag} is still alive.`);
					if (!config.richEmbed) {
						msg.channel.send(`${p2} shot but he is still alive.`);
					}
				} catch(e) {
					console.log(`${player.user.tag} gave up to the Horsengel roulette duel.`);
					return msg.channel.send(`*${player} preferred to run away.*`);
				}

				// Switches players
				if (player.id === commander.id) {
					player = provoked;
				} else {
					player = commander;
				}
			}
		} catch(e) {
			console.log(`${provoked.user.tag} didn't answer to the Horsengel roulette duel.`);
			return msg.channel.send(`*Your opponent, ${provoked} preferred to run away.*`);
		}
	}
};