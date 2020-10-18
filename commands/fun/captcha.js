const Discord = require("discord.js")
const fetch = require("node-fetch")
const config = require("../../config.json")
const db = require("quick.db")

module.exports = {
    name: "captcha",
    aliases: ["Captcha", "CAPTCHA", " captcha", " Captcha", " CAPTCHA"],
    run: async (client, message, args) => {
        let prefix = db.get(`prefix_${message.guild.id}`)
    	if(prefix === null) prefix = config.prefix;
        if (args.length < 1) {
            message.react(":X:748632517476745226")
            message.reply(`Precisas de pôr algum texto depois do comando para eu procurar. :eyes:\nEg: \`${prefix}captcha hi there\``);
        }
        else {
            var text = args;
            text = "captcha " + text;
            var captcha_encoded = text.split(" ").join("%20");
            var ask_link = `http://api.wolframalpha.com/v2/query?appid=${config.wolfram_alpha_id}&input=${captcha_encoded}&output=json`
            fetch(ask_link)
                .then(res => res.json())
                .then((out) => {
                    var img_link = out.queryresult.pods[1].subpods[0].img.src;
                    message.channel.send({
                        embed: {
                            image: {
                                url: img_link
                            },
                            color: "RANDOM",
                            title: `Captcha`,
                            description: "Texto ----> Captcha"
                        }
                    });
                })
                .catch(err => { throw err });
        }
    }
}