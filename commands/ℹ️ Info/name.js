const Discord = require("discord.js")
const fetch = require("node-fetch")
const config = require("../../config.json")
const db = require("quick.db")

module.exports = {
    name: "name",
    aliases: ["Name", "NAME", " name", " Name", " NAME"],
    usage: ["[nome]"],
    description: "Procura informação sobre um nome",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        let prefix = db.get(`prefix_${message.guild.id}`)
    	if(prefix === null) prefix = config.prefix;
        var text = args;
        if (args.length < 1) {
            message.react(":X:748632517476745226")
            message.reply(`Adiciona um nome depois do comando para eu saber o que procurar. :eyes:\nEg: ${prefix}name silvia`)
        }
        else {
            var msg_array = text
            var name = msg_array[0];
            if (msg_array.length > 2) {
                message.channel.send("Só consigo procurar um nome de cada vez. ")
            }
            else {
                var name_query = message.content.slice(1, message.content.length);
                var name_query_encoded = name_query.split(" ").join("%20");
                var ask_link = `http://api.wolframalpha.com/v2/query?appid=${config.wolfram_alpha_id}&input=${name_query}&output=json`
                fetch(ask_link)
                    .then(res => res.json())
                    .then((out) => {
                        var num_pods = out.queryresult.numpods;
                        if (num_pods === 0) {
                            message.channel.send("Desculpa, não consegui encontrar nada. :(")
                        }
                        else {
                            var interpretation = out.queryresult.pods[0].subpods[0].plaintext;
                            var basic_details = out.queryresult.pods[1].subpods[0].plaintext;
                            var graph = out.queryresult.pods[0].subpods[0].img.src;
                            var historical_details = out.queryresult.pods[2].subpods[0];
                            var estimates = out.queryresult.pods[3].subpods[0];
                            var age_dist = out.queryresult.pods[4].subpods[0];
                            var alternate_names = out.queryresult.pods[5].subpods[0].plaintext;
                            if (alternate_names === "") {
                                alternate_names = "Nenhum nome alternativo"
                            }
                            var notable_ppl = out.queryresult.pods[6].subpods[0].plaintext;
                            message.channel.send({
                                embed: {
                                    color: "RANDOM",
                                    title: `${interpretation}`,
                                    description: basic_details,
                                    image: {
                                        url: graph
                                    },
                                    fields: [{
                                        name: "Nomes Alternativos",
                                        value: alternate_names
                                    },
                                    {
                                        name: `Pessoas Famosas`,
                                        value: notable_ppl
                                    }]
                                }
                            });
                        }
                    })
                    .catch(err => { throw err });
            }
        }
    }
}