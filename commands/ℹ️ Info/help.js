const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name: "help",
    usage: ["[nada | comando]"],
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        let prefix = client.db.get(`prefix_${message.guild.id}`)
    	if(prefix === null) prefix = client.config.prefix;
		if (!args[0]) {
      	let categories = [];
      	readdirSync("./commands/").forEach((dir) => {
        	const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          		file.endsWith(".js")
        	);
        function capitalize (s) {
  			if (typeof s !== 'string') return ''
  			return s.charAt(0).toUpperCase() + s.slice(1)
		}
        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);
          if (!file.name) return "No command name.";
          let name = file.name.replace(".js", "");
          return `\`${name}\``;
        });
        let data = new Object();
        data = {
          name: `${capitalize(dir)} - [${cmds.length}]`,
          value: cmds.length === 0 ? "Em progresso." : cmds.join(" "),
        };
        categories.push(data);
      });
      const embed = new MessageEmbed()
        .setAuthor("Lista de Comandos", client.user.displayAvatarURL())
        .addFields(categories)
        .setDescription(`<:discord1:748909489293492376> **Server de Suporte:** [Link](https://discord.gg/fnvdugV)\n<:paulbot:759341625167839232> **Invite do Bot:** [Link](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=271969366&scope=bot)\n<:github:748909140084129872> **Github Repository:** [Link](https://github.com/TonaS21/bot-dos-bostas)\n\n**O prefix atual do server é ➜ ${prefix}**`)
        .setFooter(`Pedido por: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor("RANDOM");
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );
      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Comando inválido! Usa \`${prefix}help\` para veres os meus comandos!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }
      const embed = new MessageEmbed()
        .setAuthor("Detalhes do comando:", message.author.displayAvatarURL({ dynamic: true }))
      	.setDescription(`**Comando:** ${command.name ? `\`${command.name}\`` : "Nenhum nome para este comando."}` + "\n" + `**Descrição:** ${command.description ? `\`${command.description}\`` : "Nenhuma descrição para este comando."}` + "\n" + `**Outros nomes (ou formas de usar o comando):** ${command.aliases ? `\`${command.aliases.join("`, `")}\`` : "Nenhuma alias para este comando."}` + "\n" + `**Cooldown:** ${command.cooldown ? `${command.cooldown} segundos` : `Cooldown default de 3 segundos`}` + "\n" + `**Como usar:** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : `\`${prefix}${command.name}\``}` + "\n" + `**Permissões do Bot:** ${command.clientPermissions.length > 0 ? `\`${command.clientPermissions.join("`, `")}\`` : `Nenhuma em específico`}` + "\n" + `**Permissões do Usuário:** ${command.userPermissions.length > 0 ? `\`${command.userPermissions.join("`, `")}\`` : `Nenhuma em específico`}` + "\n" + `**NSFW:** ${command.nsfw ? "`Sim`" : "`Não`"}` + "\n" + `**Owner-Only:** ${command.ownerOnly ? "`Sim`" : "`Não`"}`)
      	.setThumbnail(client.user.displayAvatarURL())
        .setFooter(`Pedido por: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor("RANDOM");
      return message.channel.send(embed);
        }
    }
}