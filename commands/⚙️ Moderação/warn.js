const Discord = require("discord.js")

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
          try {
            let warnings = client.db.get(`warnings_${message.guild.id}_${user.id}`)
            let channel = client.db.get(`logs_${message.guild.id}`)
            let cases = client.db.get(`case_${message.guild.id}`)
            if(channel === null) {
          		if(warnings === null) {
            		client.db.set(`warnings_${message.guild.id}_${user.id}`, 1)
                    client.db.add(`case_${message.guild.id}`, 1)
            		user.send(`**Foste avisado no server: ${message.guild.name}**\n**Razão: ${reason ? reason : "Nenhuma razão especificada"}**`)
            		const suc = new Discord.MessageEmbed()
              			.setAuthor(`${user.user.tag} foi avisado!`, user.user.displayAvatarURL())
              			.setDescription(`**Razão:** ${reason ? reason : "Nenhuma razão especificada"}`)
              			.setColor("RANDOM")
            		await message.channel.send(suc)
          		} else if(warnings !== null) {
            		client.db.add(`warnings_${message.guild.id}_${user.id}`, 1)
                    client.db.add(`case_${message.guild.id}`, 1)
            		user.send(`**Foste avisado no server: ${message.guild.name}**\n**Razão: ${reason ? reason : "Nenhuma razão especificada"}**`)
            		const suc = new Discord.MessageEmbed()
              			.setAuthor(`${user.user.tag} foi avisado!`, user.user.displayAvatarURL())
              			.setDescription(`**Razão:** ${reason ? reason : "Nenhuma razão especificada"}`)
              			.setColor("RANDOM")
            		await message.channel.send(suc)
        		}
            } else if(channel !== null) {
                if(warnings === null) {
            		client.db.set(`warnings_${message.guild.id}_${user.id}`, 1)
                    client.db.add(`case_${message.guild.id}`, 1)
            		user.send(`**Foste avisado no server: ${message.guild.name}**\n**Razão: ${reason ? reason : "Nenhuma razão especificada"}**`)
                    message.channel.send(`<:tick:748569437589995731> Feito, vê **Caso #${cases}!**`)
            		const suc = new Discord.MessageEmbed()
                    	.setAuthor(`Usuário Avisado | Caso #${cases}`, user.user.displayAvatarURL())
                    	.setDescription(`**❯ Membro:** ${user.user.tag} [${user.user}]\n**❯ Moderador:** ${message.author.tag} [${message.author}]\n**❯ Razão:** ${reason ? reason : "Nenhuma razão especificada"}`)
              			.setColor("#318f3d")
                    	.setFooter(`ID: ${user.user.id}`)
                    	.setThumbnail(user.user.displayAvatarURL())
                    	.setTimestamp()
            		await client.channels.cache.get(channel).send(suc)
          		} else if(warnings !== null) {
            		client.db.add(`warnings_${message.guild.id}_${user.id}`, 1)
                    client.db.add(`case_${message.guild.id}`, 1)
            		user.send(`**Foste avisado no server: ${message.guild.name}**\n**Razão: ${reason ? reason : "Nenhuma razão especificada"}**`)
                    message.channel.send(`<:tick:748569437589995731> Feito, vê **Caso #${cases}!**`)
            		const suc = new Discord.MessageEmbed()
                    	.setAuthor(`Usuário Avisado | Caso #${cases}`, user.user.displayAvatarURL())
                    	.setDescription(`**❯ Membro:** ${user.user.tag} [${user.user}]\n**❯ Moderador:** ${message.author.tag} [${message.author}]\n**❯ Razão:** ${reason ? reason : "Nenhuma razão especificada"}`)
              			.setColor("#318f3d")
                    	.setFooter(`ID: ${user.user.id}`)
                    	.setThumbnail(user.user.displayAvatarURL())
                    	.setTimestamp()
            		await client.channels.cache.get(channel).send(suc)
        		}
            }
          } catch {
              return;
          }
    }
}