onst Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let pages = ['[:white_check_mark:  Tüm Komutlar]\n\n[c!yardım]  •  Botun tüm komutlarını gösterir.\n[c!istatistik]  • Botun istatistiklerini gönderir.\n[c!avatar] •  Kendi avatarınızı veya etiketlediğiniz kişinin avatarını verir.\n[c!sunucubilgi]  •  Sunucu hakkında bilgi verir.\n[c!temizle] • Belirttiğiniz kadar mesajı siler.\n[c!canlıdestek] • Botun Sahibiyle Canlı Olarak Konuşursunuz.',  '[c!cowsay] • Bot Yazdıgınız Şeyi Cowsayla Yazar'];
  let page = 1; // Sayfa 1
 

  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(message.guild.name,bot.user.avatarURL)
  .setFooter(`© 2018 Kronos | Sayfa ${page} / ${pages.length}`,bot.user.avatarURL)
  .setThumbnail(bot.user.avatarURL)
  .setDescription(pages[page-1])
  .setAuthor(message.guild.name,bot.user.avatarURL)
message.channel.send(embed).then(msg => {

    msg.react('⬅').then(r => {
      msg.react('➡')

      //Filter
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;

      const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });
      const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });

      forwards.on('collect', r => {
        if(page === pages.length) return;
        page++;
        embed.setDescription(pages[page-1]);
        embed.setFooter(`© 2018 Çikolata | Sayfa ${page} / ${pages.length}`,bot.user.avatarURL)
        msg.edit(embed)
      })
      backwards.on('collect', r => {
        if(page === 1) return;
        page--;
        embed.setDescription(pages[page-1]);
        embed.setFooter(`© 2018 Çikolata | Sayfa ${page} / ${pages.length}`,bot.user.avatarURL)
        msg.edit(embed)
      })

    })
  })
}

module.exports.help = {
  name: "yardım"
}