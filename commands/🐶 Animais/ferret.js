const got = require("got")

module.exports = {
    name: "ferret",
    aliases: ["Ferret", "FERRET", " ferret", " Ferret", " FERRET"],
    cooldown: "4",
    description: "Imagens aleatórias de furões",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        got('https://www.reddit.com/r/ferrets/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let subreddit = content[0].data.children[0].data.subreddit;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
        })
    }
}