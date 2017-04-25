const commando = require('discord.js-commando');

module.exports = class KickCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'ban',
			group: 'admin',
			memberName: 'ban',
			description: 'Command to make the bot ban someone.',
			guildOnly: true,

			args: [{
				key: 'member',
				label: 'user',
				prompt: 'Which member do you want to ban?',
				type: 'member'
			}]
		});
	}

	async run (msg, args) {
		const bot = msg.guild.member(this.client.user);
		const commander = msg.member;
		const member = args.member;

		if (!bot.hasPermission('BAN_MEMBERS')) {
			console.log(`Bioman couldn\'t the member ${member.user} because he didn't have the permission.`);
			return msg.reply('*I don\'t have the permission to ban members.*');
		} else if (!msg.member.hasPermission('BAN_MEMBERS')) {
			console.log(`The member ${commander.user} tried to ban the member ${commander.user} but he didn't have the permission.`);
			return msg.reply('*You don\'t have the permission to ban members.¨');
		} else if (!(msg.member.highestRole.position > member.highestRole.position || msg.member == msg.guild.owner)) {
			return msg.reply(`*You don't have the permission to ban the member ${member.user}.*`);
		} else {
			member.ban();
			console.log(`The member ${member.user} has been banned by the member ${commander.user}.`);
			return msg.channel.sendMessage(`*The member ${member.user} has been banned.*`);
		}
	}
}