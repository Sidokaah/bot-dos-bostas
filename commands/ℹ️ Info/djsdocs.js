const Discord = require("discord.js")
const axios = require("axios")

module.exports = {
    name: "djsdocs",
    aliases: ["discord.js-docs"],
    usage: ["[qualquer coisa]"],
    cooldown: "5",
    description: "Procura alguma coisa na documentação do Discord.js",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args)}`
        axios
        .get(uri).then((embed) => {
            const { data } = embed
            if (data && !data.error) {
                message.channel.send({ embed: data })
            } else {
                message.channel.send('<:X:748632517476745226> Não consegui encontrar essa documentação!')
            }
        }).catch((err) => {
            console.error(err)
        })
    }
}