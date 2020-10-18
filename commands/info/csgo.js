const Discord = require("discord.js")
const request = require("request")
const cheerio = require("cheerio");

module.exports = {
    name: "csgo",
    aliases: ["Csgo", "CSGO", " csgo", " Csgo", " CSGO"],
    run: async (client, message, args) => {
        function getStatData(location , $){
            var selector = $('.segment-stats .value').eq(location).text();
            var stat_array = $.parseHTML(selector);
            var stat = 0;
            if(stat_array == null || stat_array.lengh == 0){
                return -1;
            }else{
                stat = stat_array[0].data;
            }
        
            return stat;
        } 
        var UR_L = "https://tracker.gg/csgo/profile/steam/" + args[0] + "/overview";
        if(!args[0]){
            return message.channel.send("<:X:748632517476745226> Por favor especifica um ID64 da Steam!");
        }
        request(UR_L, function(err, resp, body){
            $ = cheerio.load(body);
            var KD = getStatData(0, $);
            if(KD == -1){
                return message.channel.send("<:X:748632517476745226> Inválido, vê se o perfil está privado e se especificaste um ID64 inválido!");
            }
            var KILLS = getStatData(1, $);
            var WIN = getStatData(2, $);
            var MVP = getStatData(3, $);
            var HS = getStatData(4, $);
            var DEATHS = getStatData(5, $);
            var aa = getStatData(6, $);
            var bb = getStatData(7, $);
            var SCORE = getStatData(8, $);
            var MONEY = getStatData(9, $);
            var dd = getStatData(10, $);
            var ss = getStatData(11, $);
            var BS = getStatData(12, $);
            var BD = getStatData(13, $);
            var HR = getStatData(14, $);
            var embed = new Discord.MessageEmbed()
                .setTitle("__***CSGO Stats***__")
                .setURL(UR_L)
                .setDescription("__**Estatísticas atuais**__")
                .addFields(
                    { name: "KD Ratio: " , value: "__" + KD + "__" + "\n" ,inline: true },
                    { name: "Precisão dos Tiros: ", value: "__" + ss + "__" + "\n",inline: true },
                    { name: "Dano Total Infrigido: ", value: "__" + dd + "__" + "\n",inline: true },
                    { name: "Derrotas Totais: ", value: "__" + bb + "__" + "\n",inline: true },
                    { name: "Vitórias Totais: ", value: "__" + aa + "__" + "\n",inline: true },
                    { name: "Percentagem Vitórias: ", value: "__" + WIN + "__" + "\n",inline: true },
                    { name: "MVPs Totais: ", value: "__" + MVP + "__" + "\n",inline: true },
                    { name: "Score Total: ", value: "__" + SCORE + "__" + "\n",inline: true },
                    { name: "Kills Totais: ", value: "__" + KILLS + "__" + "\n",inline: true },
                    { name: "Mortes Totais: ", value: "__" + DEATHS + "__" + "\n",inline: true },
                    { name: "Bombas Plantadas: ", value: "__" + BS + "__" + "\n",inline: true },
                    { name: "Bombas Defusadas: ", value: "__" + BD + "__" + "\n",inline: true },
                    { name: "Headshots Totais: ", value: "__" + HS + "__" + "\n",inline: true },
                    { name: "Dinheiro Recebido: ", value: "__" + MONEY + "__" + "\n",inline: true },
                    { name: "Hostages Resgatados: ", value: "__" + HR + "__" + "\n",inline: true },
                )
                .setTimestamp()
                .setFooter("Powered by: tracker.gg/csgo", client.user.displayAvatarURL())
                .setThumbnail("https://www.digitalhot.com.br/wp-content/uploads/2018/01/LOGO-CSGO-SKINS.png")
                .setColor("RANDOM");
            message.channel.send(embed);
        })
    }
}