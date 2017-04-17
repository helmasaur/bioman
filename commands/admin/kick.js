const commando = require('discord.js-commando');

module.exports = class KickCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'kick',
			group: 'admin',
			memberName: 'kick',
			description: 'Kick',
			guildOnly: true,

			args: [
				{
					key: 'member',
					label: 'user',
					prompt: 'Which member do you want to kick?',
					type: 'member'
				}
			]
		});
	}

	async run(msg, args) {
		const member = args.member;

		if (!msg.guild.member(this.client.user).hasPermission('KICK_MEMBERS')) {
			return msg.reply('I don\'t have the permission to kick members.');
		}

		if (!msg.member.hasPermission('KICK_MEMBERS')) {
			return msg.reply('You don\'t have the permission to kick members.');
		}

		if(!(msg.member.highestRole.position > member.highestRole.position || msg.member == msg.guild.owner)) {
			return msg.reply(`You don't have the permission to kick ${member.user}.`);
		}

		member.kick();
		return msg.channel.sendMessage(`${member.user} has been kicked.`);
	}
}
