//const commando = require('discord.js');
const commando = require('discord.js-commando');
const path = require('path');
const configuration = require('./configuration.json');

const bot = new commando.Client({
	owner: configuration.ownerId,
	commandPrefix: configuration.prefix
});

bot.on('ready', () => {
	console.log('I am ready!');
});

bot.on('presenceUpdate', (oldMember, newMember) => {
	let guild = newMember.guild;

	if (newMember.presence.status === 'online') {
		guild.defaultChannel.sendMessage(`**${newMember.user} s'est connecté(e).**`);
	}
	else if (newMember.presence.status === 'offline') {
		guild.defaultChannel.sendMessage(`**${newMember.user} s'est déconnecté(e).**`);
	}
});

/*bot.on('message', message => {
	if (!message.author.bot && message.content.length > 1 && message.content.startsWith(configuration.prefix)) {
		let command = message.content.split(' ')[0];
		command = command.slice(configuration.prefix.length);
		let args = message.content.split(' ').slice(1);

		if (args.length === 1) {
			if(command === 'ttb') {
				if (args[0] === 'charlotte') {
					message.channel.sendMessage('Char ! Char ! Charlotte !');
				}
				else if (args[0] === 'choucroute') {
					message.channel.sendMessage('Le saviez-vous ? Choucroute est mignonne ! Maintenant, oui.');
				}
				else if (args[0] === 'helmasaur') {
					message.channel.sendMessage('Helma ! Helma ! Helmasaur !');
				}
				else if (args[0] === 'horsengel') {
					message.channel.sendMessage('Horsengel sera _kick_.');
				}
				else if (args[0] === 'neru') {
					message.channel.sendMessage(':regional_indicator_f: :regional_indicator_a: :regional_indicator_u: :regional_indicator_t: :regional_indicator_a: :regional_indicator_n: :regional_indicator_e: :regional_indicator_r: :regional_indicator_u:');
				}
				else if (args[0] === 'orange') {
					message.channel.sendMessage('Ne s\'agit-il pas du patriarche ?');
				}
				else if (args[0] === 'thouka') {
					message.channel.sendMessage('Touh ! Touh ! Touhka !');
				}

				else if (args[0] === 'h+c') {
					message.channel.sendMessage(':evergreen_tree: :spy: :candy: :girl: :underage: :articulated_lorry: :upside_down: :girl: :heart: :spy: :ring: :wedding: :stars:');
				}
				else if (args[0] === 'motmot') {
					message.channel.sendMessage(':point_right: :ok_hand: :banana: :peach:');
				}
				else {
					message.reply('Argument inexistant.');
				}
			}
			else if (command === 'kick') {
				let member = message.guild.member(message.mentions.users.first());

				if (message.mentions.users.size === 0) {
					message.reply('Indiquer membre.');
				}
				else if (!member) {
					message.reply('Membre inexistant.');
				}
				else {
					if (message.guild.member(bot.user).hasPermission('KICK_MEMBERS') && message.guild.member(message.author).hasPermission('KICK_MEMBERS')) {
						member.kick().then(member => {
							message.channel.sendMessage(`**${member.user} a été _kick_.**`).catch(console.error);
						});
					}
					else {
						message.reply('Interdit');
					}
				}
			}
		}
		else if (command === 'bouh') {
			message.channel.sendMessage('Bouh toi-même !');
		}
		else if (command === 'lune') {
			message.channel.sendMessage(':full_moon: :waning_gibbous_moon: :last_quarter_moon: :waning_crescent_moon: :new_moon: :waxing_crescent_moon: :first_quarter_moon: :waxing_gibbous_moon: :full_moon:')
		}
		else {
			message.reply('Commande inexistante.');
		}
	}
});*/

bot.registry
	.registerGroups([
		['admin', 'Admin'],
		['info', 'Info'],
		['tags', 'Tags']
	])
	.registerDefaults()
	.registerCommandsIn(path.join(__dirname, 'commands'));

bot.login(configuration.token);
