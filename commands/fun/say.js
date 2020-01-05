const { Command } = require('discord-akairo');
const i18n = require('i18next');
const config = require('../../config.json');

class SayCommand extends Command {
	constructor() {
		super('say', {
			aliases: ['say'],
			category: 'fun',
			args: [
				{
					id: 'sentence',
					match: 'content'
				}
			]
		});
	}

	async exec(msg, args) {
		const bot = msg.guild.me;
		const sentence = args.sentence;

		await msg.delete();
		await bot.setNickname(i18n.t('say.botNamePronunciation'));
		const message = await msg.channel.send(`${sentence}`, { tts: true });
		await message.delete();
		await bot.setNickname(config.name);
		return msg.channel.send(sentence);
	}
}

module.exports = SayCommand;