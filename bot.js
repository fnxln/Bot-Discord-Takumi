//Importar o modulo Discord.js
const Discord = require('discord.js');

//Importar o arquivo JSON com as configurações
const { token, prefix } = require('./config.json');

//Importando cliente do Discord e sua biblioteca de comandos
const client = new Discord.Client();
client.commands = new Discord.Collection();

//Modulo FS para pegar os arquivos de comandos da pasta commands
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//Usar esses comandos nos arquivos da pasta commands
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//Biblioteca de espera do discord
const cooldowns = new Discord.Collection();

//Quando o cliente estiver pronto ele ira executar todos os codigos abaixo
client.once('ready', () => {

    //Mostrar no console que ele está ativo.
	var figlet = require('figlet');

    figlet('BOT READY!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    });

    /*const activities_list = [
        "Explorando o Ubuntu Mate", 
        "Tentando instalar o Arch Linux",
        "Analisando o Ubuntu", 
        "Trabalhando com o Mint",
        "Usando o Kali porque sou hacker",
        "Fujicando no ElementaryOS",
        "Preparando o PC com o SteamOS",
        "Instalando o Ubuntu Minimal no PC de pedra",
        "Desenvolvendo no PopOS_Linux",
        "Jogando no Manjaro",
        "Vendo se o MXLinux é tão bom assim",
        "Arriscando o Gentoo",
        "Rodando o Bot no CentOS",
        "Usando OpenBSD",
        "Doom Emacs é bom sim!"
    ]

    setInterval(function(){
        var status = activities_list[Math.floor(Math.random() * activities_list.length)]
        client.user.setPresence({ activity: {name: status}, status:'online'})
    }, 100000)*/
});

//Codigo para pegar os comandos da pasta e executar em ordem
client.on('message', message => {
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

    //Codigo para que tenha um certo tempo de limite na hora de executar os comandos
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 5) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`por favor espere ${timeLeft.toFixed(1)} segundos para executar o comando \`${command.name}\`.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('Erro ao tentar executar esse comando.');
	}

});

//token de acesso
client.login(token);