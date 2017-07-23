const commando = require('discord.js-commando');
const config = require ('../../config.js');

module.exports = class SayCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'say',
			group: 'fun',
			memberName: 'say',
			description: 'Make Bioman say something.',
			throttling: {
				usages: config.throttlingUsages,
				duration: config.throttlingDuration
			},

			args: [{
				key: 'sentence',
				label: 'sentence',
				prompt: 'What do you want me to say?',
				type: 'string'
			}]
		});
	}

	async run(msg, args) {
		const commander = msg.member;
		const bot = msg.guild.me;
		const sentence = args.sentence;

		if (commander.hasPermission('SEND_TTS_MESSAGES')) {
			if (bot.hasPermission('SEND_TTS_MESSAGES')) {
				await msg.delete();
				await bot.setNickname('Biomane');
				console.log(`The member ${commander.user.tag} made Bioman says: "${sentence}"`);
				const message = await msg.channel.send(`${sentence}`, {tts: true});
				await message.delete();
				await bot.setNickname(config.name);
				msg.channel.send(`*${sentence}*`);
				return;
			} else {
				console.log(`Bioman couldn\'t sent a TTS message because he doesn't have the permission.`);
				return msg.reply('*I don\'t have the permission to speak.*');
			}
		} else {
			console.log(`The member ${commander.user.tag} tried to make Bioman say: "${sentence}".`);
			return msg.reply('*I don\'t have the right to repeat what you said.*');
		}
	}
};