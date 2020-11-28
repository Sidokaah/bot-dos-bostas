const Discord = require("discord.js")
const fetch = require("node-fetch")
const dateFormat = require('dateformat');

module.exports = {
    name: "steam",
    aliases: ["Steam", "STEAM", " steam", " Steam", " STEAM"],
    usage: ["[steamID]"],
    description: "Procura informação sobre um usuário da Steam",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        const token = ""; //steam api token aqui
        if (!args[0]) return message.channel.send("Por favor especifica um nome de conta!");
        const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${args.join(" ")}`;
        fetch(url).then(res => res.json()).then(body => {
            if (body.response.success === 42) return message.channel.send("Não consegui encontrar um perfil Steam com esse nome.");
            const id = body.response.steamid;
            const summaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${id}`;
            const bans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${token}&steamids=${id}`;
            const state = ["Offline", "Online", "Ocupado", "Ausente", "A dormir", "Looking to trade", "Looking to play"];
            fetch(summaries).then(res => res.json()).then(body => {
                if (!body.response) return message.channel.send("**Não consegui encontrar um profile com esse nome!**");
                const { personaname, avatarfull, realname, personastate, loccountrycode, profileurl, timecreated } = body.response.players[0];
                fetch(bans).then(res => res.json()).then(body => {
                    if (!body.players) return message.channel.send("**Não consegui encontrar um profile com esse nome!**");
                    const { NumberOfVACBans, NumberOfGameBans } = body.players[0];
                    const embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setAuthor(`Serviços Steam | ${personaname}`, avatarfull)
                        .setThumbnail(avatarfull)
                        .setDescription(`**Nome Real:** ${realname || "Sem conhecimento"}
                    **Estado:** ${state[personastate]}
                    **País:** :flag_${loccountrycode ? loccountrycode.toLowerCase() : "white"}:
                    **Conta criada a:** ${dateFormat(timecreated * 1000, "d/mm/yyyy (h:MM:ss TT)")}
                    **Bans:** Vac: ${NumberOfVACBans}, Game: ${NumberOfGameBans}
                    **Link:** [link para o perfil](${profileurl})`)
                        .setTimestamp();
                    message.channel.send(embed)
                })
            })
        })
    }
}
