const Discord = require("discord.js")

module.exports = {
    name: "bob",
    aliases: [],
    run: async (client, message, args) => {
        message.channel.send("░░░░░▄▄▄░░▄██▄░░░\n░░░░░▐▀█▀▌░░░░▀█▄░░░\n░░░░░▐█▄█▌░░░░░░▀█▄░░\n░░░░░░▀▄▀░░░▄▄▄▄▄▀▀░░\n░░░░▄▄▄██▀▀▀▀░░░░░░░\n░░░█▀▄▄▄█▀▀░░\n░░░▌░▄▄▄▐▌▀▀▀░░ Este é o Bob\n▄░▐░░░▄▄░█░▀▀ ░░\n▀█▌░░░▄░▀█▀▀ ░░ Copia-o e cola-o em todos os servers\n░░░░░░░▄▄▐▌▄▄░░░ Para que ele possa\n░░░░░░░▀███▀█░▄░░ Dominar o Discord\n░░░░░░▐▌▀▄▀▄▀▐▄░░ Só não o spames\n░░░░░░▐▀░░░░░░▐▌░░ \n░░░░░░█░░░░░░░░█░░░░░░░\n░░░░░░█░░░░░░░░█░░░░░░░\n░░░░░░█░░░░░░░░█░░░░░░░")
    }
}