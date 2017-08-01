const Discord = require('discord.js');
const config = require ('../config.js');
const tools = require('./objectHelper.js');
const colors = require('../data/colors.json');

// Information
exports.about = (owner, bot) => {
	return new Discord.RichEmbed()
					.setTitle(`About Bioman Peebolo (version ${config.version})`)
					.setAuthor(owner.tag, owner.displayAvatarURL)
					.setColor(colors.bot)
					.setFooter('Bioman is a trademark of Toei Company', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Toei_logo.svg/langfr-256px-Toei_logo.svg.png')
					.setDescription('Bioman has been created by [*Helmasaur*](https://twitter.com/Helmasaur) after the death of *AwesomeBot*. It is based on the framework [*discord.js*](https://discord.js.org). It was first used for a group called [*TeamToilettesBio*](https://twitter.com/search?q=%23TeamToilettesBio). Now, the aim is to make it universal.\n\nLots of thanks to *discord.js* [community](https://discord.gg/bRCvFy9) for their great help. I also want to thank [*BelleChoucroute*](https://twitter.com/Clo_Stylinson) for the wise advice she gives me and the official plastic duck used for tests known under the name [*Horsengel*]((https://twitter.com/Horsengel).')
					.setImage('https://media.giphy.com/media/Zomi7MddlQLF6/giphy.gif')
					.setThumbnail(bot.displayAvatarURL)
					.addField('Source code', '[GitHub](https://github.com/Helmasaur/Bioman)', true)
					.addField('Licence',  '[MIT License](https://github.com/Helmasaur/Bioman/blob/master/LICENSE)', true);
};

exports.emoji = (event, url, name, altName = '-') => {

	let description
	if (event === 'CREATE') {
		description = 'An emoticon has been added.';
		name = `:${name}:`;
	} else if (event === 'DELETE') {
		description = 'An emoticon has been deleted.';
		[name, altName] = [`:${altName}:`, name];
	}
	if (event === 'UPDATE') {
		description = 'An emoticon has been modified.';
		name = `:${name}:`;
		altName = `:${altName}:`;
	}

	return new Discord.RichEmbed()
					.setTitle('Emoticon')
					//.setAuthor('Helmasaur#1285', 'https://cdn.discordapp.com/avatars/164470149473107969/09183bdb425e9fa911ed928c4249fa25.png')
					.setColor(colors.information)
					.setDescription(description)
					.setThumbnail(url)
					.addField('Previous shortcut', `\`${altName}\``, true)
					.addField('New shortcut', `\`${name}\``, true);
}

// Administration
exports.moderation = (action, commander, member, reason) => {
	return new Discord.RichEmbed()
					.setAuthor(commander.tag, commander.displayAvatarURL)
					.setColor(colors.moderation)
					//.setImage('https://img1.closermag.fr/var/closermag/storage/images/media/images-des-contenus/article/2016-08-04-corbier-l-ancien-complice-de-dorothee-je-deviens-ce-que-les-medias-ont-fait-de-moi-c-est-a-dire-rien/archive-corbier-1989/5405200-2-fre-FR/Archive-Corbier-1989_exact1024x768_l.jpg')
					.setThumbnail(member.displayAvatarURL)
					.addField('Action', action, true)
					.addField('Reason', reason, true)
					.addField('Member', member, true)
					.addField('ID', member.id, true);
};

// Games
exports.horsengelRoulette = (p1, p2, round, gameOver = false) => {
	const players = [p1, p2];
	let description = `${p1}, it\'s your turn to shoot. Use the command \`${config.prefix}pan\` to shoot.`;
	let revolver = '[o][o][o][o][o][o]';
	let index = 0;
	let indexMinus = 0;

	if (round > 0) {
		if (!(tools.isEven(round))) {
			[p1, p2] = [p2, p1];
		}

		let p = '1';
		for (let i = 1; i < round + 1; i++) {
			index = i * 3 - 2;
			revolver = tools.replaceAt(revolver, p, index);
			if (p === '1') {
				p = '2';
			} else {
				p = '1';
			}
		}

		if (gameOver) {
			description = `${p1} shot and has lost.`;
			round++;
			index = round * 3 - 2;
			revolver = tools.replaceAt(revolver, 'X', index);
		} else {
			description = `${p2} shot but he is still alive. ${p1}, it\'s your turn to shoot. Use the command \`${config.prefix}pan\` to shoot.`;
		}
	}

	return new Discord.RichEmbed()
					.setTitle('Horsengel roulette')
					.setColor(colors.games)
					.setDescription(description)
					//.setThumbnail()
					.addField('Player 1', players[0], true)
					.addField('Player 2', players[1], true)
					.addBlankField(true)
					.addField('Round', round, true)
					.addField('Revolver', revolver, true)
					.addBlankField(true);
};

// Fun
exports.gif = (commander, keyword, image, link) => {
return new Discord.RichEmbed()
				.setTitle('GIF generator')
				.setAuthor(commander.tag, commander.displayAvatarURL)
				.setColor('RANDOM')
				.setFooter('Powered by GIPHY', 'https://pbs.twimg.com/profile_images/699676239620083713/WCUM0RqH_400x400.jpg')
				.setDescription(`Original link: ${link}`)
				.setImage(image)
				.addField('Keyword', keyword);
};