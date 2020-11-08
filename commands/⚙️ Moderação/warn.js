const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
	name: "warn",
    usage: ["[@alguém razão]"],
    description: "Avisa alguém do server",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: ["ADMINISTRATOR"],
    run: async (client, message, args) => {
          const user = message.mentions.members.first()
          if(!user) {
            return message.channel.send("<:X:748632517476745226> Por favor menciona a pessoa que queres avisar!")
          }
          if(message.mentions.users.first().bot) {
            return message.channel.send("<:X:748632517476745226> Não podes avisar bots!")
          }
          if(message.author.id === user.id) {
            return message.channel.send("<:X:748632517476745226> Não te podes avisar a ti mesmo!")
          }
          if(user.id === message.guild.owner.id) {
            return message.channel.send("<:X:748632517476745226> Não podes avisar o server owner!")
          }
          const reason = args.slice(1).join(" ")
          if(!reason) return message.channel.send("<:X:748632517476745226> Por favor especifica a razão para avisares essa pessoa!")
          try {
            let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
          	if(warnings === null) {
            	db.set(`warnings_${message.guild.id}_${user.id}`, 1)
            	user.send(`**Foste avisado no server: ${message.guild.name}**\n**Razão: ${reason}**`)
            	const suc = new Discord.MessageEmbed()
              		.setAuthor(`${user.user.username} foi avisado!`, user.user.displayAvatarURL())
              		.setDescription(`Razão: **${reason}**`)
              		.setColor("RANDOM")
            	await message.channel.send(suc)
          	} else if(warnings !== null) {
            	db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            	user.send(`**Foste avisado no server: ${message.guild.name}**\n**Razão: ${reason}**`)
            	const suc = new Discord.MessageEmbed()
              		.setAuthor(`${user.user.username} foi avisado!`, user.user.displayAvatarURL())
              		.setDescription(`Razão: **${reason}**`)
              		.setColor("RANDOM")
            	await message.channel.send(suc)
        	}
          } catch {
              return;
          }
    }
}