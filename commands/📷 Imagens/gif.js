const fetch = require("node-fetch")
const config = require("../../config.json")

module.exports = {
    name: "gif",
    aliases: ["Gif", "GIF", " gif", " Gif", " GIF"],
    usage: ["[algum texto]"],
    description: "Procura gifs sobre o que quiseres",
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
        if(message.channel.nsfw) {
            var text = args;
            if (args.length < 1) {
                message.react(":X:748632517476745226")
                message.reply("Especifica algum termo para eu procurar um gif. :grin:");
            }
            else {
                var limit = 5;
                var search_term = text;
                var giphy_endpoint = `https://api.giphy.com/v1/gifs/search?rating=g&api_key=${config.giphy_api_key}&limit=${limit}&q=${search_term}`
                fetch(giphy_endpoint)
                    .then(res => res.json())
                    .then((out) => {
                        if (out.data.length === 0) {
                            message.channel.send("Não consegui encontrar nenhum gif :(")
                        }
                        else {
                            var randomNumber = getRandomNumber(0, limit - 1)
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