const commando = require('discord.js-commando');

module.exports = class BanCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'ban',
			group: 'admin',
			memberName: 'ban',
			description: 'Makes the bot ban someone.',
			guildOnly: true,

<<<<<<< Updated upstream
			args: [{
				key: 'member',
				label: 'user',
				prompt: 'Which member do you want to ban?',
				type: 'member'
			}]
=======
			args: [
				{
					key: 'member',
					label: 'user',
					prompt: 'Which member do you want to ban?',
					type: 'member'
				},
				{
					key: 'description',
					prompt: '',
					label: 'description',
					type: 'string'
				}
			]
>>>>>>> Stashed changes
		});
	}

	async run(msg, args) {
		const guild = msg.guild;
		const bot = guild.me;
		const commander = msg.member;
		const member = args.member;
<<<<<<< Updated upstream
=======
		let description;

		if (args.description === '') {
			description = 'no reason given';
		} else {
			description = args.description;
		}
>>>>>>> Stashed changes

		if (!bot.hasPermission('BAN_MEMBERS')) {
			console.log(`Bioman couldn\'t the member ${member.user.tag} because he didn't have the permission.`);
			return msg.reply('*I don\'t have the permission to ban members.*');
		} else if (!commander.hasPermission('BAN_MEMBERS')) {
			console.log(`The member ${commander.user} tried to ban the member ${commander.user.tag} but he didn't have the permission.`);
			return msg.reply('*You don\'t have the permission to ban members.');
		} else if (!(commander.highestRole.position > member.highestRole.position || commander.id === msg.guild.ownerID)) {
			console.log(`The member ${commander.useruser.tag} tried to ban the member ${commander.user.tag} but he didn't have the permission.`);
			return msg.reply(`*You don't have the permission to ban the member ${member.user}.*`);
		} else {
<<<<<<< Updated upstream
			//guild.ban(member, { reason: `${commander.id}` });
			console.log(`The member ${user} has been banned by the member ${commander.user.tag}.`);
			guild.defaultChannel.send(`*The member ${user} has been banned by ${commander.user}.*`);
			return member.send(`You have been banned by ${commander.user}.`);
=======
			guild.ban(member, {reason: description}});

			console.log(`The member ${user} has been banned by the member ${commander.user.tag} (${description}).`);
			guild.defaultChannel.send(`*The member ${user} has been banned by ${commander.user} (${description}).*`);
			return member.send(`You have been banned by ${commander.user} ${description}.`);
>>>>>>> Stashed changes
		}
	}
};