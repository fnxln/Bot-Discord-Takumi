const Discord = require('discord.js');

module.exports ={
    name: 'github',
    description: 'Link do meu repositório do Github',
	  execute(message) {

      const description = require(`../JSON/embed.json`);
      const embedFooter = description.ASKED_BY.replace('%user', message.author.tag);

      const embed = new Discord.MessageEmbed()
        .setTitle('👨🏽‍💻Clique aqui para acessar meu repositório.👨🏽‍💻')
        .setURL('https://github.com/Drack112/Fujiwara-Takumi')
        .setThumbnail("https://cdn.discordapp.com/avatars/741030476780929109/d32d83140bff5929772060e2cc1a5453.png?size=4096")
        .setDescription("***Não esqueça de ler a documentação que está na primeira aba. Tenho certeza que irá gostar!.***")
        .setFooter(embedFooter)
        .setTimestamp()
        .setColor('')

    message.channel.send(embed)
  }
};
