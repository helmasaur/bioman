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

	async run(msg, args) {
		const bot = msg.guild.me;
		const commander = msg.member;
		let member = args.member;

		if (!bot.hasPermission('KICK_MEMBERS')) {
			console.log(`Bioman couldn\'t kick the member ${member.user} because he doesn't have the permission.`);
			return msg.reply('*I don\'t have the permission to kick members.*');
		} else if (member.id === commander.id ) {
			if (commander.id === msg.guild.ownerID) {
				console.log(`The member ${commander.user} tried to kicked himslf but he doesn't have the permission.`);
				return msg.reply('*You don\'t have the permission to kick yourself.*');
			} else {
				commander.kick();
				console.log(`The member ${commander.user} has kicked himself.`);
				return msg.channel.send(`*The member ${commander.user} has kicked himself.*`);
			}
		} else if (!commander.hasPermission('KICK_MEMBERS')) {
			console.log(`The member ${commander.user} tried to kick the member ${commander.user} but he doesn't have the permission.`);
			return msg.reply('*You don\'t have the permission to kick members.*');
		} else if (!(commander.highestRole.position > member.highestRole.position || commander.id === msg.guild.ownerID)) {
			console.log(`The member ${commander.user} tried to kick ${commander.user} but he doesn't have the permission.`);
			return msg.reply(`*You don't have the permission to kick ${member.user}.*`);
		} else {
			member.kick();
			let invite = await msg.defaultChannel.createInvite({maxAge: 0, maxUses: 1});

			console.log(`The member ${member.user} has been kicked by the member ${commander.user}.`);
			msg.channel.send(`*The member has been ${member.user} has been kicked by ${commander.user}.*`);
			member.send(`You have been kicked by ${commander.user}.`);

			if (bot.hasPermission('CREATE_INSTANT_INVITE')) {
				console.log(`An invitation link has been send to the kicked member ${member.user}`)
				return member.send(invite);
			} else {
				console.log(`Bioman couldn't invite the kicked member ${member.user} because he doesn't have the permission`);
				return msg.reply(`*I couldn't send an invitation link to the kicked member ${member.user} because I don't have the permission to create invitations.*`);
			}
		}
	}
};