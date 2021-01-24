const Discord = require('discord.js');

module.exports ={
    name: 'help',
	aliases: ['ajuda', 'comandos'],
    description: 'Gerar a lista de comandos que eu tenho.',
	execute(message) {

        const description = require(`../JSON/embed.json`);
        const embedFooter = description.ASKED_BY.replace('%user', message.author.tag);

        const embed = new Discord.MessageEmbed()
            .setTitle('🤖 Meus comandos 🤖')
            .setThumbnail("https://cdn.discordapp.com/avatars/741030476780929109/d32d83140bff5929772060e2cc1a5453.png?size=4096")
            .setDescription(`
            **()ajuda, ()help ou ()comandos** - Mostra todos os comandos que eu tenho.;
            **()avatar, ()foto ou ()foto-perfil** - Gerar o avatar do usuário ou de um usuário marcado.
            **()github** - Link do meu repositório do Github.;
            `)
            .setImage("https://i.imgur.com/8lebxQY.png")
            .setFooter(embedFooter)
            .setTimestamp()
            .setColor('blue');

    message.reply(embed);
  }
};
