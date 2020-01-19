const { Command } = require('discord-akairo');
const i18n = require('i18next');
const config = require('../../config.json');

class RadioCommand extends Command {
	constructor() {
		super('radio', {
			aliases: ['radio', 'rb2'],
			category: 'fun',
			args: [
				{
					id: 'action',
					type: ['play', 'stop']
				}
			]
		});
	}

	exec(msg, args) {
		const author = msg.member;
		const bot = msg.guild.me;
		const action = args.action;

		switch (action) {
			case 'stop':
				return msg.member.voiceChannel.leave();
			case 'play':
				if (bot.hasPermission(['CONNECT', 'SPEAK'])) {
					if (author.voiceChannel) {
						msg.member.voiceChannel.join()
							.then(connection => {
								return connection.playArbitraryInput(config.rb2);
			
							})
							.catch(() => {
								return msg.reply(i18n.t('rb2.error.connection'));
							});
					} else {
						return msg.reply(i18n.t('rb2.noPermission.author'));
					}
				} else {
					return msg.reply(i18n.t('rb2.noPermission.bot'));
				}
		}
	}
}

module.exports = RadioCommand