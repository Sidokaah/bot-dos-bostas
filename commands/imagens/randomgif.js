const fetch = require("node-fetch")
const config = require("../../config.json")

module.exports = {
    name: "randomgif",
    aliases: ["Randomgif", "RANDOMGIF", " randomgif", " Randomgif", " RANDOMGIF"],
    run: async (client, message, args) => {
        message.channel.send("A procurar um gif aleatório no GIPHY...")
        var giphy_endpoint = `https://api.giphy.com/v1/gifs/random?rating=g&api_key=${config.giphy_api_key}`
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