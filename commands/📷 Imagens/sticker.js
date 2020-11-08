const fetch = require("node-fetch")
const config = require("../../config.json")

module.exports = {
    name: "sticker",
    aliases: ["Sticker", "STICKER", " sticker", " Sticker", " STICKER"],
    usage: ["[algum texto]"],
    description: "Procura um sticker que quiseres",
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
        if(message.channel.nsfw) {
            var text = args;
            if (args.length < 1) {
                message.react(":X:748632517476745226")
                message.reply("Adiciona o termo para eu procurar depois do comando. ^^")
            }
            else {
                var search_term = text
                var limit = 3
                var giphy_endpoint = `https://api.giphy.com/v1/stickers/search?q=${search_term}&limit=${limit}&api_key=${config.giphy_api_key}`
                fetch(giphy_endpoint)
                    .then(res => res.json())
                    .then((out) => {
                        if (out.data.length === 0) {
                            message.channel.send("Não consegui encontrar nenhum sticker :(")
                        }
                        else {
                            var randomNumber = getRandomNumber(0, limit - 1);
                            var giphy_link = out.data[randomNumber].embed_url;
                            message.channel.send(giphy_link)
                                .catch(console.error);
                        }
                    })
                    .catch(err => { throw err });
            }
            function getRandomNumber(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        } else {
            message.channel.send(`<:X:748632517476745226> Este comando só pode ser usado em canais de NSFW!`)
        }
    }
}