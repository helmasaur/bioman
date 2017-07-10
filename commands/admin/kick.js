const commando = require('discord.js-commando');

module.exports = class KickCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'kick',
			group: 'admin',
			memberName: 'kick',
			description: 'Makes the bot kick someone.',
			guildOnly: true,

<<<<<<< Updated upstream
			args: [{
				key: 'member',
				label: 'user',
				prompt: 'Which member do you want to kick?',
				type: 'member'
			}]
=======
			args: [
				{
					key: 'member',
					label: 'user',
					prompt: 'Which member do you want to kick?',
					type: 'member'
				},
				{
					key: 'description',
					label: 'description',
					prompt: '',
					type: 'string',
					default : ''
				}
			]
>>>>>>> Stashed changes
		});
	}

	async run(msg, args) {
		const bot = msg.guild.me;
		const commander = msg.member;
<<<<<<< Updated upstream
		let member = args.member;
=======
		const member = args.member;
		let description;

		if (args.description === '') {
			description = 'no reason given';
		} else {
			description = args.description;
		}
>>>>>>> Stashed changes

		if (!bot.hasPermission('KICK_MEMBERS')) {
			console.log(`Bioman couldn\'t kick the member ${member.user.tag} because he doesn't have the permission.`);
			return msg.reply('*I don\'t have the permission to kick members.*');
		} else if (member.id === commander.id ) {
			if (commander.id === msg.guild.ownerID) {
				console.log(`The member ${commander.user.tag} tried to kicked himslf but he doesn't have the permission.`);
				return msg.reply('*You don\'t have the permission to kick yourself.*');
			} else {
				commander.kick();
				console.log(`The member ${commander.user.tag} has kicked himself.`);
				return msg.channel.send(`*The member ${commander.user} has kicked himself.*`);
			}
		} else if (!commander.hasPermission('KICK_MEMBERS')) {
			console.log(`The member ${commander.user.tag} tried to kick the member ${commander.user.tag} but he doesn't have the permission.`);
			return msg.reply('*You don\'t have the permission to kick members.*');
		} else if (!(commander.highestRole.position > member.highestRole.position || commander.id === msg.guild.ownerID)) {
			console.log(`The member ${commander.user.tag} tried to kick ${commander.user.tag} but he doesn't have the permission.`);
			return msg.reply(`*You don't have the permission to kick ${member.user}.*`);
		} else {
<<<<<<< Updated upstream
			member.kick();
			const invite = await msg.defaultChannel.createInvite({maxAge: 0, maxUses: 1});

			console.log(`The member ${member.user.tag} has been kicked by the member ${commander.user.tag}.`);
			msg.channel.send(`*The member has been ${member.user} has been kicked by ${commander.user}.*`);
			member.send(`You have been kicked by ${commander.user}.`);
=======
			console.log(`The member ${member.user.tag} has been kicked by the member ${commander.user.tag} (${description}).`);
			msg.channel.send(`*The member has been ${member.user} has been kicked by ${commander.user} (${description}).*`);
			member.send(`You have been kicked by ${commander.user} (${description}).`);
>>>>>>> Stashed changes

			if (bot.hasPermission('CREATE_INSTANT_INVITE')) {
				const invite = await msg.guild.defaultChannel.createInvite({maxAge: 0, maxUses: 1});

				console.log(`An invitation link has been send to the kicked member ${member.user.tag}`)
				await member.send(invite.url);
			} else {
				console.log(`Bioman couldn't invite the kicked member ${member.user.tag} because he doesn't have the permission`);
				await msg.reply(`*I couldn't send an invitation link to the kicked member ${member.user} because I don't have the permission to create invitations.*`);
			}

			member.kick(description});
			return;
		}
	}
};