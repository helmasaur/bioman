const commando = require('discord.js-commando');

module.exports = class KickCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'say',
			group: 'fun',
			memberName: 'say',
			description: 'Command to make Bioman say something.',
			guildOnly: false,

			args: [{
				key: 'sentence',
				label: 'sentence',
				prompt: 'What do you want me to say?',
				type: 'string'
			}]
		})
	}

	async run(msg, args) {
		const sentence = args.sentence;
		const commander = msg.member;

		if(commander.hasPermission('SEND_TTS_MESSAGES')) {
			console.log(`Bioman says: "${sentence}"`);
			return msg.channel.sendMessage(`*${sentence}*`);
		} else {
			console.log(`The member ${commander.user} tried to make Bioman say: "${sentence}".`);
			return msg.reply(`*I don't have the right to repeat after you.*`);
		}
	}
}