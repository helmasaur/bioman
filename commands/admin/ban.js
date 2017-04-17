const commando = require('discord.js-commando');

module.exports = class BanCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'ban',
			group: 'admin',
			memberName: 'ban',
			description: 'bans',
			guildOnly: true,

			args: [
				{
					key: 'member',
					label: 'user',
					prompt: 'Which member do you want to ban?',
					type: 'member'
				}
			]
		});
	}

	async run(msg, args) {
		const member = args.member;

		if (!msg.guild.member(this.client.user).hasPermission('BAN_MEMBERS')) {
			return msg.reply('I don\'t have the permission to ban members.');
		}

		if (!msg.member.hasPermission('BAN_MEMBERS')) {
			return msg.reply('You don\'t have the permission to ban members.');
		}

		if(!(msg.member.highestRole.position > member.highestRole.position || msg.member == msg.guild.owner)) {
			return msg.reply(`You don't have the permission to ban ${member.user}.`);
		}

		member.ban();
		return msg.channel.sendMessage(`${member.user} has been banned.`);
	}
}
