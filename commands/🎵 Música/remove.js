const Discord = require("discord.js")

module.exports = {
    name: "remove",
    aliases: ["Remove", "REMOVE", " remove", " Remove", " REMOVE"],
    usage: ["[número]"],
    cooldown: "7",
    description: "Remove uma música do queue",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        let queue = client.distube.getQueue(message.guild.id);
        if (!queue) return message.channel.send("<:X:748632517476745226> Não está nada a tocar!");
        if (args[0] < 1 && args[0] >= queue.songs.length) {
            return message.reply('por favor especifica um número válido.');
        }
        if(args[0].includes("-")) {
            const erroembed = new Discord.MessageEmbed()
                .setDescription("Não posso remover número negativos.")
                .setColor("RANDOM")
            message.channel.send(erroembed)
        }
        var voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('Entra num voice channel e tenta outra vez.');
        if (
            typeof queue.dispatcher == 'undefined' || queue.dispatcher == null
        ) {
            return message.reply('<:X:748632517476745226> Não está nada a tocar!');
        } else if (voiceChannel.id !== message.guild.me.voice.channel.id) {
            message.reply(`Precisas de estar no mesmo voice channel do Bot para usares o comando!`);
            return;
        }
        let userVoiceChannel = message.member.voice.channel;
        let clientVoiceConnection = message.guild.me.voice;
        if (userVoiceChannel === clientVoiceConnection.channel) {
            queue.songs.splice(args[0] - 1, 1);
            const removeembed = new Discord.MessageEmbed()
                .setDescription(`Música número **${args[0]}** removida do queue.`)
                .setColor("RANDOM")
            return message.channel.send(removeembed)
            } else {
                message.channel.send('<:X:748632517476745226> Só podes usar esse comando se estiveres no mesmo voice channel do Bot!');
        }
    }
}