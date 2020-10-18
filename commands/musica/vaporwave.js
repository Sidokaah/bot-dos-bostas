const Discord = require("discord.js")

module.exports = {
    name: "vaporwave",
    aliases: [],
    run: async (client, message, args) => {
        const command = ["vaporwave"]
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
            let filter = client.distube.setFilter(message, command);
            message.channel.send("Filtro do queue atual: " + (filter || "Off"));
        } else {
            message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
}