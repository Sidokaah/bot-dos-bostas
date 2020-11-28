const Discord = require("discord.js")
const fortnite = require("simple-fortnite-api")
const Client = new fortnite("7f72eb91-2fb4-4143-b75d-a0d0fa6d1306");

module.exports = {
    name: "fortnite",
    aliases: ["Fortnite", "FORTNITE", " fortnite", " Fortnite", " FORTNITE"],
    usage: ["[nome da conta]"],
    description: "Procura as estatísticas de fortnite de alguém.",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        let prefix = client.db.get(`prefix_${message.guild.id}`)
    	if(prefix === null) prefix = client.config.prefix;
        if (!args[0]) return message.channel.send("Por favor especifica um nome.");
        if (args[1] && !["lifetime", "solo", "duo", "squad"].includes(args[1])) return message.channel.send(`Como usar: ${prefix}fortnite <username> <gametype>``\nModos de Jogo: Lifetime, Solo, Duo, Squad`);
        let gametype = args[1] ? args[1].toLowerCase() : "lifetime";
        let data = await Client.find(args[0])
        if (data && data.code === 404) return message.channel.send("Não consegui encontrar ninguém com esse nome.")
        const { image, url, username } = data;
        const { scorePerMin, winPercent, kills, score, wins, kd, matches } = data[gametype]
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Epic Games (Fortnite) | ${username}`, image)
            .setThumbnail(image)
            .setDescription(`**Modo de Jogo:** ${gametype.slice(0, 1).toUpperCase() + gametype.slice(1)}
                    **Kills:** ${kills || 0}
                    **Score:** ${score || 0}
                    **Score por minuto:** ${scorePerMin || 0}
                    **Wins:** ${wins || 0}
                    **Win Ratio:** ${winPercent || "0%"}
                    **KDR:** ${kd || 0}
                    **Jogos:** ${matches || 0}
                    **Link:** [link para o perfil](${url})`)
            .setTimestamp()
        message.channel.send(embed)
    }
}