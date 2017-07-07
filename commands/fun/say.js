const commando = require('discord.js-commando');

module.exports = class SayCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'say',
			group: 'fun',
			memberName: 'say',
			description: 'Make Bioman say something.',
			guildOnly: false,

			args: [{
				key: 'sentence',
				label: 'sentence',
				prompt: 'What do you want me to say?',
				type: 'string'
			}]
		});
	}

	async run(msg, args) {
		const sentence = args.sentence;
		const commander = msg.member;

		if (commander.hasPermissions('SEND_TTS_MESSAGES')) {
			msg.delete();
			console.log(`The member ${commander.user} made Bioman says: "${sentence}"`);
			msg.channel.send(`*${sentence}*`, {tts: true});
		} else {
			console.log(`The member ${commander.user} tried to make Bioman say: "${sentence}".`);
			return msg.reply('*I don\'t have the right to repeat what you said.*');
		}
	}
};