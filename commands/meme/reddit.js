const got = require("got")

module.exports = {
    name: "reddit",
    aliases: ["Reddit", "REDDIT", " reddit", " Reddit", " REDDIT"],
    cooldown: "3",
    run: async (client, message, args) => {
        if(!args.join(" ")) return message.channel.send("<:X:748632517476745226> Precisas de especificar um subreddit!")
        got(`https://www.reddit.com/r/${args.join(" ")}/random/.json`).then(response => {
            if(!message.channel.nsfw) return message.channel.send(`<:X:748632517476745226> Este comando só pode ser usado em canais de NSFW!`)
            if (message.channel.nsfw) {
                try {
                    let content = JSON.parse(response.body);
                    let permalink = content[0].data.children[0].data.permalink;
                    let memeUrl = `https://reddit.com${permalink}`;
                    let memeImage = content[0].data.children[0].data.url;
                    let subreddit = content[0].data.children[0].data.subreddit;
                    let memeTitle = content[0].data.children[0].data.title;
                    let memeUpvotes = content[0].data.children[0].data.ups;
                    let memeNumComments = content[0].data.children[0].data.num_comments;
                    message.channel.send(`**${memeTitle} (r/${subreddit}) - 👍 ${memeUpvotes} | 💬 ${memeNumComments}**\n\n${memeImage}`);
                } catch (error) {
                    message.channel.send("<:X:748632517476745226> Subreddit inválido, tenta escrever de outra forma!")
                }
            }
        })
    }
}