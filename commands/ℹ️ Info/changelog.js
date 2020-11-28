const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const { shorten, base64, embedURL } = require('../../util/Util');

module.exports = {
    name: "changelog",
    aliases: ["Changelog", "CHANGELOG", " changelog", " Changelog", " CHANGELOG"],
    cooldown: "10",
    description: "Responde com informação sobre o Bot",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
        const { body } = await request
			.get(`https://api.github.com/repos/TonaS21/bot-dos-bostas/commits`)
			.set({ Authorization: `token ede75e2037288eb9a2b0a2b9d84c9281c86a717a` });
		const commits = body.slice(0, 10);
		const embed = new MessageEmbed()
			.setTitle(`[bot-dos-bostas:master] Latest 10 commits`)
			.setColor(0x7289DA)
			.setURL(`https://github.com/TonaS21/bot-dos-bostas/commits/master`)
			.setDescription(commits.map(commit => {
				const hash = embedURL(`\`${commit.sha.slice(0, 7)}\``, commit.html_url, false);
				return `${hash} ${shorten(commit.commit.message.split('\n')[0], 50)} - ${commit.author.login}`;
			}).join('\n'));
		return message.channel.send(embed);
    }
}