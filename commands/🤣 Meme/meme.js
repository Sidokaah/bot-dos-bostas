const got = require("got")

module.exports = {
    name: "meme",
    aliases: ["Meme", "MEME", " meme", " Meme", " MEME"],
    cooldown: "4",
    description: "Um meme aleatório lol",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        const subreddits = ["https://www.reddit.com/r/meme/random/.json", "https://www.reddit.com/r/dankmemes/random/.json", "https://www.reddit.com/r/memes/random/.json"]
        const randomMessage = subreddits[Math.floor(Math.random() * subreddits.length)];
        got(randomMessage).then(response => {
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