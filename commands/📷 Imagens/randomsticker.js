const fetch = require("node-fetch")
const config = require("../../config.json")

module.exports = {
    name: "randomsticker",
    aliases: ["Randomsticker", "RANDOMSTICKER", " randomsticker", " Randomsticker", " RANDOMSTICKER"],
    description: "Responde com um sticker aleatório",
    clientPermissions: ["SEND_MESSAGES", "ATTACH_FILES"],
    userPermissions: [],
    run: async (client, message, args) => {
        message.reply("A procurar um sticker aleatório no GIPHY...")
        var giphy_endpoint = `https://api.giphy.com/v1/stickers/random?rating=g&api_key=${config.giphy_api_key}`
        fetch(giphy_endpoint)
            .then(res => res.json())
            .then((out) => {
                var giphy_link = out.data.embed_url;
                message.channel.send(giphy_link)
                    .catch(console.error);
            })
            .catch(err => { throw err });
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
}