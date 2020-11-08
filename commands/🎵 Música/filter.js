const Discord = require("discord.js")

module.exports = {
    name: "filter",
    usage: ["[filtro]"],
    description: "Ativa um filro à tua escolha",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        const command = args.join(" ")
        let queue = client.distube.getQueue(message.guild.id)
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        if (!message.member.voice.channelID) {
            message.react(":X:748632517476745226")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Precisas de estar num voice chat para mudares filters!`)
            return message.channel.send(embed)
        }
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel) {
            try {
                let filter = client.distube.setFilter(message, command);
            	message.channel.send("<:tick:748569437589995731> Filtro do queue atual: **" + (filter || "Off") + "**");
            } catch(e) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
                    .setTitle(`<:X:748632517476745226> Ocorreu um erro <:X:748632517476745226>`)
                    .setDescription("```\n" + "Ocorreu um erro: " + e + "```")
                	.setColor("RANDOM")
                	.setFooter(`Pedido por(a): ${message.member.user.username}`, message.member.user.displayAvatarURL())
                	.setTimestamp()
                message.channel.send(embed)
            }
        } else {
            message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
}