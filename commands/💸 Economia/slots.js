const Discord = require("discord.js")
const ms1 = require("parse-ms")

module.exports = {
    name: "slots",
    aliases: [],
    cooldown: "5",
    usage: ["[dinheiro]"],
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        const slotItems = ["🍇", "🍉", "🍊", "🍎", "🍌", "🍓", "🍒"];
        let user = message.author;
        let moneydb = await client.db.fetch(`money_${message.guild.id}_${user.id}`)
        let money = parseInt(args[0]);
        let win = false;
        let moneyhelp = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`<:X:748632517476745226> Especifica uma quantidade de dinheiro!`);
        let moneymore = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`<:X:748632517476745226> Estás a apostar mais do que tens!`);
        let moneynega = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`<:X:748632517476745226> Não podes apostar dinheiro negativo!`);
        if (!money) return message.channel.send(moneyhelp);
        if (money > moneydb) return message.channel.send(moneymore);
        if (args[0].includes("-")) return message.channel.send(moneynega);
        let number = []
        for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }
        if (number[0] == number[1] && number[1] == number[2]) { 
            money *= 9
            win = true;
        } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
            money *= 2
            win = true;
        }
        if (win) {
            let slotsEmbed1 = new Discord.MessageEmbed()
                .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nGanhaste ${money} moedas!`)
                .setColor("RANDOM")
            message.channel.send(slotsEmbed1)
            client.db.add(`money_${message.guild.id}_${user.id}`, money)
        } else {
            let slotsEmbed = new Discord.MessageEmbed()
                .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nPerdeste ${money} moedas!`)
                .setColor("RANDOM")
            message.channel.send(slotsEmbed)
            client.db.subtract(`money_${message.guild.id}_${user.id}`, money)
        }
    }
}