const commando = require('discord.js-commando');
const config = require('../../config.js');

module.exports = class AboutCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'about',
			group: 'info',
			memberName: 'about',
			description: 'Displays information about Bioman.'
		});
	}

	async run(msg) {
		const guild = msg.guild;
		const commander = msg.member;

		console.log(`The member ${commander.user.tag} asked about Bioman's information.`);
		/* <client>.users.get('id') */
		guild.defaultChannel.send(`**Bioman Peebolo (version ${config.version})**\n\nBioman has been created by Helmasaur after the death of *AwesomeBot* using the *discord.js* framework. It was first used for a group called *TeamToilettesBio* but the aim is to make it universal.).\n\n🗂 Source code (MIT license): https://github.com/Helmasaur/Bioman\n 🐦 Helmasaur on Twitter: https://twitter.com/Helmasaur\n\n*Thanks to discord.js community for their great help. I also want to thank BelleChoucroute for the wise advice she gives me and the official plastic duck used for tests known under the name Horsengel.*`);
	}
};