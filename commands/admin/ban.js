const commando = require('discord.js-commando');

module.exports = class BanCommand extends commando.Command {
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

	async run(msg, args) {
		const guild = msg.guild;
		const bot = guild.me;
		const commander = msg.member;
		const member = args.member;

		if (!bot.hasPermission('BAN_MEMBERS')) {
			console.log(`Bioman couldn\'t the member ${member.user} because he didn't have the permission.`);
			return msg.reply('*I don\'t have the permission to ban members.*');
		} else if (!commander.hasPermission('BAN_MEMBERS')) {
			console.log(`The member ${commander.user} tried to ban the member ${commander.user} but he didn't have the permission.`);
			return msg.reply('*You don\'t have the permission to ban members.');
		} else if (!(commander.highestRole.position > member.highestRole.position || commander.id === msg.guild.ownerID)) {
			console.log(`The member ${commander.user} tried to ban the member ${commander.user} but he didn't have the permission.`);
			return msg.reply(`*You don't have the permission to ban the member ${member.user}.*`);
		} else {
			//guild.ban(member, { reason: `${commander.id}` });
			console.log(`The member ${user} has been banned by the member ${commander.user}.`);
			guild.defaultChannel.send(`*The member ${user} has been banned by ${commander.user}.*`);
			return member.send(`You have been banned by ${commander.user}.`);
		}
	}
};