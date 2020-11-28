const Discord = require("discord.js");
const PastebinAPI = require('pastebin-js');

module.exports = {
    name: "guilds",
    description: "Lista os servers em que o Bot está",
    cooldown: "15",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    ownerOnly: true,
    run: async (client, message, args) => {
        let key = client.config.pastebin_key
        const pastebin = new PastebinAPI({
            'api_dev_key' : key
        });
        let servers = "";
        client.guilds.cache.forEach(g => {
            servers = servers + `${g.name} ► Membros: ${g.memberCount}\n`;
        });
        pastebin.createPaste("Servers: \n" + servers, "Servers")
            .then(function (data) {
                const embed = new Discord.MessageEmbed()
                    .setDescription("Successo! ► " + `[Clica aqui](${data})`)
                    .setColor("RANDOM")
                message.channel.send(embed);
                return;
            }).fail(function (err) {
                console.log(err);
                const embed = new Discord.MessageEmbed()
                    .setDescription("Ocorreu um erro ao executar o comando")
                    .setColor("RANDOM")
                message.channel.send(embed);
                return;
            })
    }
}