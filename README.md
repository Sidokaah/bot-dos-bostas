# Bot dos Bostas
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![Dependencies](https://david-dm.org/TonaS21/bot-dos-bostas.svg)](https://david-dm.org/TonaS21/bot-dos-bostas)
[![Dev Dependencies](https://david-dm.org/TonaS21/bot-dos-bostas/dev-status.svg)](https://david-dm.org/TonaS21/bot-dos-bostas?type=dev)

O meu grande Bot do discord.
Com cerca de 120 comandos para usares, desde música até memes.

O Bot tem diversas features como reaction controller na música, páginas no queue e, brevemente, comando help interativo.

Baseado em Discord.js, com o module DisTube.

# Comandos

- **Música**

| Comandos      | Descrição                                                                                                                 | Como usar              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `play ou p`   | Toca uma música ou playlist do youtube. Se `distube.options.searchSongs = true`, vais poder escolher entre algumas opções, mas no bot normal `searchSongs = false`| -play bitch lasagna    |
| `pause`       | Pausa a música que está a tocar                                                                                           | -pause                 |
| `resume`      | Resume a música que estava a tocar                                                                                        | -resume                |
| `stop ou leave`| Sai do voice channel e para de tocar música                                                                              | -stop                  |
| `search`      | Procura por uma música no youtube e dá-te opções para escolheres                                                          | -search rap god        |
| `remove`      | Tira uma música específica do queue                                                                                       | -remove 4              |
| `queue`       | Mostra-te o queue                                                                                                         | -queue                 |
| `shuffle`     | Mistura o queue                                                                                                           | -shuffle               |
| `skip`        | Passa para a música a seguir                                                                                              | -skip                  |
| `clearqueue`  | Tira todas as músicas do queue menos a que está a tocar                                                                   | clearqueue             |
| `jump`        | Passa para uma música específica no queue                                                                                 | -jump 5                |
| `volume`      | Adjust song volume                                                                                                        | -volume                |
| `changevolume`| Muda o volume da música                                                                                                   | -cv 150                |
| `loop`        | Repetir a música, o queue ou nada. 0 - Nada; 1 - A música que está a tocar; 2 - Todo o queue                              | -loop 0, 1 ou 2        |
| `playskip`    | Dá skip à música que estava a tocar e toca uma música que quiseres                                                        | -playskip godzilla     |
| `lyrics`      | Procura a letra da música que está a tocar ou de uma música em específico                                                 | -lyrics song-name      |
| `np ou nowplaying`| Mostra o que está a tocar com uma barra sempre a mudar o tempo restante                                               | -np                    |
| `playlist`    | Uma playlist minha                                                                                                        | -playlist              |
| `bitch`       | Uma playlist de bitch lasagna                                                                                             | -bitch                 |
| `cool`        | Uma playlist dum amigo meu com muitos dubsteps, mas mesmo muitos.                                                         | -cool                  |
| `Todos os filters`| Entre eles estão: bassboost, echo, gate, flanger, reverse, karaoke, nightcore, vaporwave, haas e 3d.                  | -bassboost             |
| `autoplay`    | Ativa o autoplay                                                                                                          | -autoplay              |
| `autoplaynow` | Vês o estado do autoplay no momento                                                                                       | -autoplaynow           |
| `loopnow`     | Vês o estado do loop no momento                                                                                           | -loopnow               |

- **Memes**

| Comandos      | Descrição                                                                                                                 | Como usar              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `meme`        | Um meme aletório do subreddit `r/meme`                                                                                    | -meme                  |
| `twitter`     | Um meme aleatório do twitter                                                                                              | -twitter               |
| `discordmeme` | Um meme aleatório sobre o discord                                                                                         | -discordmeme           |
| `4chan`       | Um meme aleatório do 4chan                                                                                                | -goose                 |
| `comic`       | Um meme aleatório de comics                                                                                               | -ferret                |
| `reddit`      | Especificas um reddit para mandar um meme aleatório                                                                       | -reddit dankmemes      |
| `meirl`       | Um meme aleatório do subreddit `r/me_irl`                                                                                 | -meirl                 |
| `wholesome`   | Um meme aleatório do subreddit `r/wholesomememes`                                                                         | -wholesome             |
| `sports`      | Um meme aleatório sobre desporto                                                                                          | -sports                |
| `facepalm`    | Um meme aleatório do subreddit `r/facepalm`                                                                               | -facepalm              |

- **Diversão**

| Comandos      | Descrição                                                                                                                 | Como usar              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `randomfacts` | Factos random que eu fix                                                                                                  | -randomfacts           |
| `8ball`       | Perguntas alguma coisa ao bot que ele te responde                                                                         | -8ball O neves é gay?  |
| `slap`        | Dás um chapada a alguém                                                                                                   | -slap @someone         |
| `roast`       | Dás roast a alguém                                                                                                        | -roast @someone        |
| `neves`       | O neves é paneleiro...                                                                                                    | -neves                 |
| `exposesezul` | Expose que o mister Star a.k.a Tomás Estrela fez ao Sezul                                                                 | -exposesezul           |
| `p!ng`        | Ping!                                                                                                                     | -p!ng                  |
| `pong`        | Imagens aleatórias de panda                                                                                               | -pong                  |
| `creeper`     | Imagens aleatórias de raposas                                                                                             | -creeper               |
| `rps`         | Imagens aleatórias de animais em geral                                                                                    | -rps pedra             |
| `flip`        | Cara ou coroa                                                                                                             | -flip                  |
| `minesweeper` | Um jogo de minesweeper                                                                                                    | -minesweeper 5 10 5    |
| `badjoke`     | Uma piada que não tem graça xD                                                                                            | -badjoke               |
| `advice`      | Dá-te um conselho para a vida                                                                                             | -advice                |
| `isretarded`  | Percentagem se tu ou alguém é retardado                                                                                   | -isretarded @someone   |
| `say`         | O bot vai dizer o que quiseres                                                                                            | -say something         |
| `isgamer`     | Percentagem se tu ou alguém é gamer                                                                                       | -isgamer @someone      |
| `isgay`       | Percentagem se tu ou alguém é gay                                                                                         | -isgay @someone        |
| `issimp`      | Percentagem se tu ou alguém é um simp                                                                                     | -issimp @someone       |
| `lenny`       | Um meme aleatório do subreddit `r/facepalm`                                                                               | -lenny                 |
| `captcha`     | Um meme aleatório do subreddit `r/facepalm`                                                                               | -captcha something     |
| `pp`          | Tamanho do teu ou o pp de alguém                                                                                          | -pp @someone           |
| `isloli`      | Percentagem se tu ou alguém é uma loli                                                                                    | -isloli @someone       |
| `iswaifu`     | Percentagem se tu ou alguém é uma waifu                                                                                   | -iswaifu @someone      |
| `isanimegirl` | Percentagem se tu ou alguém é uma anime girl                                                                              | -isanimegirl @someone  |
| `isdank`      | Percentagem se tu ou alguém é um dank memer                                                                               | -isdank @someone       |

- **Moderação e Informação**

| Comandos      | Descrição                                                                                                                 | Como usar              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `kick`        | Kickas alguém do teu server                                                                                               | -kick @TonaS           |
| `ban`         | Dás ban a alguém do server                                                                                                | -ban @Sezul            |
| `mute`        | Dás mute a alguém                                                                                                         | -mute @someone         |
| `warn`        | Avisas alguém                                                                                                             | -warn @someone         |
| `userinfo`    | Informação sobre uma pessoa do server                                                                                     | -userinfo, -userinfo @TonaS|
| `clear`       | Apagas um número específico de mensagens                                                                                  | -clear 69              |
| `ping`        | Ping do bot                                                                                                               | -ping                  |
| `announce`    | Anuncias alguma coisa num canal à tua escolha                                                                             | -announce #olá O ivo é gay|
| `report`      | Reportas alguém do server                                                                                                 | -report @lolgame       |
| `covid`       | Estatísticas da covid-19 num país ou mundialmente                                                                         | -covid portugal, -covid all|
| `uptime`      | Uptime do bot                                                                                                             | -uptime                |
| `steam`       | Procuras um perfil da steam (por id)                                                                                      | -steam TonaS21         |
| `help`        | Mostras os comandos do bot                                                                                                | -help                  |
| `help-eng`    | Mostras os comandos do bot em Inglês                                                                                      | -help-eng              |
| `invite`      | Dá o invite do bot                                                                                                        | -invite                |
| `weather`     | Mostra a meteorologia numa cidade do mundo à escolha                                                                      | -weather Lisboa        |
| `instagram`   | Procura uma conta do instagram                                                                                            | -instagram tonas_21    |
| `lock`        | Dá lock ao server (Anti-Raid).                                                                                            | -lock on | off         |
| `serverinfo`  | Mostra estatísticas e informação sobre um server                                                                          | -serverinfo            |
| `yt`          | Procura um canal do Youtube                                                                                               | -yt PewDiePie          |
| `math`        | Faz matemática por ti seu burro (+, -, *, :)                                                                              | -math 1 + 1            |
| `giveaway`    | Crias um giveaway no teu server                                                                                           | -giveaway #general 5m nitro|
| `delrole`     | Tiras um role a uma pessoa                                                                                                | -delrole @someone Membro|
| `giverole`    | Dás um role a alguém do server                                                                                            | -giverole @someone Gay |
| `hasrole`     | Vês se uma pessoa tem um role                                                                                             | -hasrole @someone Fixe |
| `urban`       | Procura o significado de alguma coisa no pior dicionário                                                                  | -urban garcez          |
| `fortnite`    | Procura uma conta de fortnite no fortnite tracker                                                                         | -fortnite TonaS_       |
| `slowmode`    | Define o slowmode de um text channel                                                                                      | -slowmode 10           |
| `kpop`        | Procura fotografias de kpopers? (não sei como dizer)                                                                      | -kpop                  |
| `name`        | Mostra informações sobre um nome                                                                                          | -name Gilberto         |
| `define`      | Define alguma palavra (penso que é só em inglês)                                                                          | -define technology     |
| `acrónimo`    | Manda-te informações sobre o acrónimo que especificáste                                                                   | -acrónimo lmfao        |
| `rhymer`      | O bot vai mandar uma palavra que rima com a que mandáste                                                                  | -rhymer shit           |
| `sobre`       | Informações sobre o Bot                                                                                                   | -sobre                 |
| `categorias`  | Mostra as categorias de comandos do bot                                                                                   | -categorias            |

- **Imagens**

| Comandos      | Descrição                                                                                                                 | Como usar              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `inverse`     | Factos random que eu fix                                                                                                  | -randomfacts           |
| `minecraft`   |                                                                                                                           |                        |
| `animepunch`              | Dás um chapada a alguém                                                                                                   | -slap @someone         |
| `roast`       | Dás roast a alguém                                                                                                        | -roast @someone        |
| `neves`       | O neves é paneleiro...                                                                                                    | -neves                 |
| `exposesezul` | Expose que o mister Star a.k.a Tomás Estrela fez ao Sezul                                                                 | -exposesezul           |
| `p!ng`        | Ping!                                                                                                                     | -p!ng                  |
| `pong`        | Imagens aleatórias de panda                                                                                               | -pong                  |
| `creeper`     | Imagens aleatórias de raposas                                                                                             | -creeper               |
| `rps`         | Imagens aleatórias de animais em geral                                                                                    | -rps pedra             |
| `flip`        | Cara ou coroa                                                                                                             | -flip                  |
| `minesweeper` | Um jogo de minesweeper                                                                                                    | -minesweeper 5 10 5    |
| `badjoke`     | Uma piada que não tem graça xD                                                                                            | -badjoke               |
| `advice`      | Dá-te um conselho para a vida                                                                                             | -advice                |
| `isretarded`  | Percentagem se tu ou alguém é retardado                                                                                   | -isretarded @someone   |
| `say`         | O bot vai dizer o que quiseres                                                                                            | -say something         |
| `isgamer`     | Percentagem se tu ou alguém é gamer                                                                                       | -isgamer @someone      |
| `isgay`       | Percentagem se tu ou alguém é gay                                                                                         | -isgay @someone        |
| `issimp`      | Percentagem se tu ou alguém é um simp                                                                                     | -issimp @someone       |
| `lenny`       | Um meme aleatório do subreddit `r/facepalm`                                                                               | -lenny                 |
| `captcha`     | Um meme aleatório do subreddit `r/facepalm`                                                                               | -captcha something     |
| `pp`          | Tamanho do teu ou o pp de alguém                                                                                          | -pp @someone           |
| `isloli`      | Percentagem se tu ou alguém é uma loli                                                                                    | -isloli @someone       |
| `iswaifu`     | Percentagem se tu ou alguém é uma waifu                                                                                   | -iswaifu @someone      |
| `isanimegirl` | Percentagem se tu ou alguém é uma anime girl                                                                              | -isnanimegirl @someone |
| `isdank`      | Percentagem se tu ou alguém é um dank memer                                                                               | -isdank @someone       |

- **Animais**

| Comandos      | Descrição                                                                                                                 | Como usar              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `cats`        | Imagens aleatórias de gatos                                                                                               | -cats                  |
| `dogs`        | Imagens aleatórias de cães                                                                                                | -dogs                  |
| `quacc`       | Imagens aleatórias de patos                                                                                               | -quacc                 |
| `mrlizard`    | Imagens aleatórias de lagartos                                                                                            | -mrlizard              |
| `goose`       | Imagens aleatórias de gansos                                                                                              | -goose                 |
| `ferret`      | Imagens aleatórias de furões                                                                                              | -ferret                |
| `snake`       | Imagens aleatórias de cobras                                                                                              | -snake                 |
| `panda`       | Imagens aleatórias de panda                                                                                               | -panda                 |
| `foxsays`     | Imagens aleatórias de raposas                                                                                             | -foxsays               |
| `animais`     | Imagens aleatórias de animais em geral                                                                                    | -animais               |

# Como Instalar e usar o Bot

Fazes `npm i`. O que isto faz? Instala todas as dependencies que são precisas para o Bot funcionar bem. Entre elas estão `discord.js`, node-fetch, fs, distube, entre outros.

**Nota**: Precisas de ter instalado:


- `node.js`;
- `ffmpeg`;
- Um editor de texto como: `Visual Studio Code <-- Recomendo; Notepad++, entre outros.`
# Links Importantes:

[Discord.js](https://discord.js.org/#/) - Library em que o bot foi baseado. Caso não saibas o significado de alguma coisa no código do Bot, podes procurar aqui nos Docs deles ---> [Link](https://discord.js.org/#/docs/main/stable/general/welcome).

[DisTube](https://distube.js.org/) - Module para a música. Muito fácil de usar, e é Open Source! Se tiveres alguma dúvida ou precisares de ajuda relacionada com o DisTube, podes entrar no Server de Suporte, O Owner do Bot (ya ele fez um bot) vai-te sempre responder, mas lembra-te, ele não fala português ---> [Link](https://discord.gg/X3NY853).

[Server de Suporte do Bot](https://discord.gg/DRnnZPS) - Caso venhas a ter alguma dúvida ou o Bot não esteja a funcionar bem, entra no server e faz a tua pergunta ou diz o erro que está a acontecer.

[Invite do bot](https://discord.com/api/oauth2/authorize?client_id=733694571866882098&permissions=8&scope=bot) - Convida o Bot para o teu server!


**Nota:** Se não souberes muito de JavaScript ou código em geral, não te aconselho a mudares muita coisa do código do bot, só o que eu digo que podes no index.js!
Bot feito por TonaS#9344

# Redes Sociais

Bot feito por TonaS#9344

[Steam](https://steamcommunity.com/id/TonaS21/)

[Twitter](https://twitter.com/tonasfoot5)

[Instagram](https://www.instagram.com/tonas_21/)

