const Discord = require("discord.js")

module.exports = {
    name: "loop",
    aliases: ["Loopnow", "LoopNow", "LOOPNOW", " loopnow", " Loopnow", " LoopNow", " LOOPNOW"],
    run: async (client, message, args) => {
        let queue = client.distube.getQueue(message);
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        const embed = new Discord.MessageEmbed()
            .setDescription(`Repeat mode está: **${queue.repeatMode ? queue.repeatMode == 2 ? "Todo o Queue" : "Esta música" : "Desligado"}**`)
            .setColor("RANDOM")
        message.channel.send(embed)
    }
}