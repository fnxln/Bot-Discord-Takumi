const Discord = require("discord.js")

module.exports = {
	name: 'avatar',
	aliases: ['foto', 'foto-perfil'],
	description: 'Gerar o avatar do usuário ou de um usuário marcado.',
	execute(message) {
        const user = message.mentions.users.first() || message.author;

        const description = require(`../JSON/avatar.json`);

        const embedTitle = description.AVATAR_OF.replace('%user', user.username);
        const embedFooter = description.ASKED_BY.replace('%user', message.author.tag);
        const embedURL = description.AVATAR_URL.replace('%user', user.username)

	const embed = new Discord.MessageEmbed()
            .setTitle(embedTitle)
            .setDescription(`[${embedURL}](${user.displayAvatarURL({ format:"png", size: 4096, dynamic: true })})`)
            .setColor('RANDOM')
            .setImage(user.displayAvatarURL({ format:"png", size: 4096,dynamic: true }))
            .setFooter(embedFooter, `${message.author.displayAvatarURL({ format:"png", size: 4096, dynamic: true})}`)
	    .setTimestamp()

        message.channel.send(embed)
	},
};