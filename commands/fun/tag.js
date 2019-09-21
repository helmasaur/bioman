const { Command } = require('discord-akairo');
const tags = require('../../data/tags.json');
const i18n = require('i18next');

class TagCommand extends Command {
	constructor() {
		super('tag', {
			aliases: ['tag', 'ttb'],
			category: 'fun',
			args: [
				{
					id: 'tagname',
					type: 'lowercase'
				}
			]
		});
	}

	async exec(msg, args) {
		const tagname = args.tagname;

		if(typeof tags[tagname] === 'undefined') {
			return msg.reply(`*${i18n.t('tag.noResult', { tagname })}*`);
		}
		else {
			return msg.channel.send(`*${tags[tagname].display}*`);
		}
	}
}

module.exports = TagCommand;