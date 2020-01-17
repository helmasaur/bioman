const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const i18n = require('i18next');
const config = require('../../config.json');

class AboutCommand extends Command {
	constructor() {
		super('about', {
			aliases: ['about'],
			category: 'info'
		});
	}

	async exec(msg) {
		const owner = await msg.guild.client.fetchUser('164470149473107969');

		return msg.channel.send({embed: this.embed(owner, this.client.user)});
	}

	embed(owner, bot) {
		return new Discord.RichEmbed()
			.setTitle(`Bioman ${config.version.name} (v${config.version.number})`)
			.setAuthor(owner.tag, owner.displayAvatarURL)
			.setColor(config.richEmbedColors.bot)
			.setFooter(i18n.t('about.embed.copyright'), 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Toei_logo.svg/langfr-256px-Toei_logo.svg.png')
			.setDescription(i18n.t('about.embed.description'))
			.setImage('https://media.giphy.com/media/Zomi7MddlQLF6/giphy.gif')
			.setThumbnail(bot.displayAvatarURL)
			.addField(i18n.t('about.embed.sourceCode'), '[GitHub](https://github.com/Helmasaur/Bioman)', true)
			.addField(i18n.t('about.embed.license'),  '[MIT License](https://github.com/Helmasaur/Bioman/blob/master/LICENSE)', true);
	}
}

module.exports = AboutCommand;