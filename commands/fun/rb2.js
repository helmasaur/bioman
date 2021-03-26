const { Command } = require('discord-akairo');
const i18n = require('i18next');
const config = require('../../config.json');

// Optional dependencies
let voice;
try {
	require('ffmpeg-static');
	require('@discordjs/opus');
	voice = true;
}
catch {
	voice = false;
}

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

	async exec(msg, args) {
		const author = msg.member;
		const bot = msg.guild.me;
		const action = args.action;

		if (action === "stop") {
			if (bot.voiceChannel) {
				return msg.member.voiceChannel.leave();
			} else {
				return msg.reply(i18n.t('rb2.error.noConnection'))
			}
		}

		if (config.rb2 === "") {
			return msg.reply(i18n.t('rb2.error.noRadio'))
		}

		// Dependencies are missing
		if (!voice) {
			const owner = await msg.guild.fetchMember(config.ownerID)
				.catch(() => i18n.t('rb2.error.module.admin'));
			
			if (author.id === owner.id) {
				return msg.reply(i18n.t('rb2.error.module.owner'));
			}
			return msg.reply(i18n.t('rb2.error.module.member', { owner: owner, interpolation: { escapeValue: false } }));
		}

		if (action === "play") {
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
					return msg.reply(i18n.t('rb2.error.author'));
				}
			} else {
				return msg.reply(i18n.t('rb2.noPermission.bot'));
			}
		}
	}
}

module.exports = RadioCommand