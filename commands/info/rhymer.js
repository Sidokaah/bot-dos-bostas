const Discord = require("discord.js")
const fetch = require("node-fetch")
const config = require("../../config.json")
const db = require("quick.db")

module.exports = {
    name: "rhymer",
    aliases: ["Rhymer", "RHYMER", " rhymer", " Rhymer", " RHYMER"],
    run: async (client, message, args) => {
        let prefix = db.get(`prefix_${message.guild.id}`)
    	if(prefix === null) prefix = config.prefix;
        var text = args;
        if (args.length < 1) {
            message.react(":X:748632517476745226")
            message.reply(`Tenta incluir um palavra depois do comando, sendo a palavra inglesa.\`Eg: ${prefix}rhymer code\``);
        }
        else {
            var msg_array = text
            if (msg_array.length > 1) {
                message.channel.send("É recomendado que especifiques só uma palavra depois do comando.")
            }
            else {
                var search_term = msg_array[0];
                var ask_link = `http://api.wolframalpha.com/v2/query?appid=${config.wolfram_alpha_id}&input=rhymes%20with%20${search_term}&output=json`
                fetch(ask_link)
                    .then(res => res.json())
                    .then((out) => {
                        if (out.queryresult.success === false) {
                            message.channel.send("Não consegui encontrar nenhuma palavra :( ")
                        }
                        else {
                            var rhyming_words = out.queryresult.pods[1].subpods[0].plaintext
                            message.channel.send({ embed: { color: "RANDOM", title: `Rima com`, description: rhyming_words } });
                        }
                    })
                    .catch(err => { throw err });
            }
        }
    }
}