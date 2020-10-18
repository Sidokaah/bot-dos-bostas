module.exports = {
    name: "flip",
    aliases: ["Flip", "FLIP", " flip", " Flip", " FLIP"],
    run: async (client, message, args) => {       
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("<:X:748632517476745226> Não tenho permissões para usar editar imagens (`MANAGE_MESSAGES`)!")
        const messages = [`${message.member.user}, deu **Cara**! <:cara:755159085070155936>`, `${message.member.user}, deu **Coroa**! <:coroa:755158379768578169>`]
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        message.channel.send(randomMessage)
    }
}