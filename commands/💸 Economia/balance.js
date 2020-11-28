const Discord = require("discord.js")

module.exports = {
    name: "balance",
    aliases: [],
    usage: ["[nada | @alguém]"],
    description: "Vês o dinheiro de alguém",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        let bal = client.db.fetch(`money_${message.guild.id}_${member.id}`)
        if (bal === null) bal = 0;
        let bank = await client.db.fetch(`bank_${message.guild.id}_${member.id}`)
        if (bank === null) bank = 0;
        let moneyEmbed = new Discord.MessageEmbed()
          .setAuthor(`Dinheiro de ${member.user.username}`, member.user.displayAvatarURL())
          .setColor("RANDOM")
          .setDescription(`**Carteira: ${bal} moedas\nBanco: ${bank} moedas**`);
        message.channel.send(moneyEmbed)
    }
}