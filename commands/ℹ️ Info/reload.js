const Discord = require("discord.js");
const fs = require("fs")

module.exports = {
    name: "reload",
    description: "Dá reload a um comando [OWNER_ONLY]",
    cooldown: "7",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    ownerOnly: true,
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("Por favor especifica um comando para atualizar!")
        const commandName = args[0].toLowerCase();
        const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
        if (!command) return message.channel.send("Esse comando não existe!")
        fs.readdirSync(`${process.cwd()}/commands`).forEach(f => {
            const files = fs.readdirSync(`${process.cwd()}/commands/${f}`);
            if (files.includes(`${commandName}.js`)) {
                const file = `${process.cwd()}/commands/${f}/${commandName}.js`;
                try {
                    delete require.cache[require.resolve(file)];
                    client.commands.delete(commandName);
                    const pull = require(file);
                    client.commands.set(commandName, pull);
                    const embed = new Discord.MessageEmbed()
                    	.setDescription("Comando Atualizado!" + "\n" + `Comando: \`${commandName}.js\``);
					message.channel.send(embed)
                } catch (err) {
                    return message.channel.send("Ocorreu um erro a executar o comando: `" + err + "`")
                    console.log(err.stack || err);
                    return;
                }
            }
        })
    }
}