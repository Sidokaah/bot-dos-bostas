const Discord = require("discord.js")
const request = require("request")

module.exports = {
    name: "acrónimo",
    usage: ["[acrónimo]"],
    description: "Manda-te informações sobre o acrónimo que especificaste",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        var text = args;
        if (args.length < 1) {
            message.react(":X:748632517476745226")
            message.reply("Por favor adiciona um termo para eu procurar. ^^\nEg: -acronym rofl");
        }
        else {
            var acronym = text;
            message.reply("A procurar na Database de Acrónimos: `" + `${acronym}` + "`")
            var acronym_uri = `http://acronyms.silmaril.ie/cgi-bin/xaa?${acronym}`;
            var acronym_meanings = [];
            request(acronym_uri, { json: true }, (err, _res, body) => {
                if (err) { return console.log(err); }
                var split_body = body.split("\n");
                var num_acronyms = split_body[4];
                if (num_acronyms.includes("0")) {
                    message.reply("Nenhum acrónimo existente como o que disseste.")
                }
                else {
                    var header = "```ml" + "\n" +
                        "Significado do Acrónimo: " + acronym + "👀 \n" +
                        "```"
                    for (var i = 6; i < split_body.length - 1; i += 4) {
                        var line = split_body[i]
                        line = line.trim()
                        var split_acr_array = line.split(" ");
                        var first_item = split_acr_array[0]
                        if (split_acr_array.length === 1) {
                            first_item = first_item.slice(7, first_item.length - 8)
                            split_acr_array[0] = first_item
                        }
                        else {
                            var strpd_item = first_item.slice(7, first_item.length + 5);
                            split_acr_array[0] = strpd_item;
                            var last_item = split_acr_array[split_acr_array.length - 1];
                            var strpd_last_item = last_item.slice(0, split_acr_array.length - 11);
                            split_acr_array[split_acr_array.length - 1] = strpd_last_item;
                        }
                        var final_acronym = split_acr_array.toString()
                        final_acronym = final_acronym.split(",").join(" ")
                        acronym_meanings.push(final_acronym)
                    }
                    message.channel.send({
                        embed: {
                            color: "RANDOM",
                            title: `Significado(s) do Acrónimo: ${acronym}`,
                            description: acronym_meanings.join("\n")
                        }
                    });
                }
            })
        }
    }
}