const Discord = require("discord.js")

module.exports = {
    name: "autoplaynow",
    aliases: ["Autoplaynow", "AutoPlayNow", "AUTOPLAYNOW", " autoplaynow", " Autoplay", " AutoPlayNow", " AUTOPLAYNOW"],
    run: async (client, message, args) => {
        let queue = client.distube.getQueue(message);
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        const embed = new Discord.MessageEmbed()
            .setDescription(`O AutoPlay está: **${queue.autoplay ? "Ligado" : "Desligado"}**`)
            .setColor("RANDOM")
        message.channel.send(embed)
    }
}