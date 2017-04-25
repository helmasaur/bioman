const commando = require('discord.js-commando');

module.exports = class KickCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'kick',
			group: 'admin',
			memberName: 'kick',
			description: 'Command to make the bot kick someone.',
			guildOnly: true,

			args: [{
				key: 'member',
				label: 'user',
				prompt: 'Which member do you want to kick?',
				type: 'member'
			}]
		});
	}

	async run (msg, args) {
		const bot = msg.guild.member(this.client.user);
		const commander = msg.member;
		const member = args.member;

		if (!bot.hasPermission('KICK_MEMBERS')) {
			console.log(`Bioman couldn\'t kick the member ${member.user} because he didn't have the permission.`);
			return msg.reply('*I don\'t have the permission to kick members.*');
		} else if (!msg.member.hasPermission('KICK_MEMBERS')) {
			console.log(`The member ${commander.user} tried to kick the member ${commander.user} but he didn't have the permission.`);
			return msg.reply('*You don\'t have the permission to kick members.*');
		} else if (!(msg.member.highestRole.position > member.highestRole.position || msg.member == msg.guild.owner)) { // for my guild:  || commander.roles.some(r => member.roles.has(r.id))
			console.log(`The member ${commander.user} tried to kick ${commander.user} but he didn't have the permission.`);
			return msg.reply(`You don't have the permission to kick ${member.user}.`);
		} else {
			member.kick();
			console.log(`The member ${member.user} has been kicked by the member ${commander.user}.`);
			return msg.channel.sendMessage(`${member.user} has been kicked by ${commander.user}.`);
		}
	}
}