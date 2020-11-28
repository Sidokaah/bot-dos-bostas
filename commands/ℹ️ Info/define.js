const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
    name: "define",
    aliases: ["Define", "DEFINE", " define", " Define", " DEFINE"],
    usage: ["[palavra]"],
    description: "Define uma palavra",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        let prefix = client.db.get(`prefix_${message.guild.id}`)
    	if(prefix === null) prefix = client.config.prefix;
        var text = args;
        if (args.length < 1) {
            message.react(":X:748632517476745226")
            message.reply(`Adiciona uma palavra depois do comando par eu saber o que queres que eu defina. \nEg: ` + prefix + "`define technology`")
        }
        else {
            var search_term = text;
            search_term = "define" + search_term;
            var url_encoded_search_term = search_term.split(" ").join("%20")
            var ask_link = `http://api.wolframalpha.com/v2/query?appid=${client.config.wolfram_alpha_id}&input=${url_encoded_search_term}&output=json`
            fetch(ask_link)
                .then(res => res.json())
                .then((out) => {
                    var num_pods = out.queryresult.numpods;
                    if (num_pods === 0) {
                        message.channel.send("Desculpa, não consegui encontrar nada, podes tentar depois de novo? :D")
                    }
                    else {
                        var interpretation = out.queryresult.pods[0].subpods[0].plaintext;
                        var answer = out.queryresult.pods[1].subpods[0].plaintext;
                        message.channel.send({
                            embed: {
                                color: "RANDOM",
                                title: `${interpretation}`,
                                description: answer
                            }
                        });
                    }
                })
                .catch(err => { throw err });
        }
    }
}