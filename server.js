require("express")().listen(1343);
const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login("Token"); // UYGULAMA TOKEN'INIZI GİRMEYİ UNUTMAYIN! - İŞLEMLERİ DİKKATLİ YAPIN.
const fetch = require("node-fetch");
const fs = require('fs')

setInterval(() => {
  var links = db.get("linkler");
  if(!links) return;
  var linkA = links.map(c => c.url)
  linkA.forEach(link => {
    try {
      fetch(link)
    } catch(e) { console.log("" + e) };
  })
  console.log("Login success! | App/Logined [Online] | Shard 1/1 Online")
}, 60000)

client.on("ready", () => {
if(!Array.isArray(db.get("linkler"))) {
db.set("linkler", [])
}
})

client.on("ready", () => {
  client.user.setActivity(`u.help | ${db.get("linkler").length} / ${client.guilds.size}`)
  console.log(`Logined - 7`)
})

// Zed sizi seviyor.

client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "z!ekle") {
  var link = spl[1]
  fetch(link).then(() => {
    if(db.get("linkler").map(z => z.url).includes(link)) return message.channel.send("Bu site daha önce veri tabanına eklenmiş durumda, geçersiz işlem.")
    message.channel.send("Uptime edilecek hedef site veri tabanına eklendi.");
    db.push("linkler", { url: link, owner: message.author.id})
  }).catch(e => {
    return message.channel.send("Başarısız!" + e)
  })
  }
})

// Zed sizi seviyor.

client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "z!sitesay") {
  var link = spl[1]
 message.channel.send(`${db.get("linkler").length} / ${client.guilds.size}`)
}})



const Discord = require('discord.js');

client.on("message", message => {
  if(message.author.bot) return;
    var spl = message.content.split(" ");
  if(spl[0] == "z!yardım") {
let embed = new Discord.RichEmbed()
.setColor('GREY')
.addField(`Uptime Bot`, `Bot'a hedef siteyi girerek sürekli uptime olmasını sağlarsınız.`)
.addField(`Genel Komutlar`,`

**z!yardım** *-* Yardım menüsü
**z!ekle** *-* Veri tabanına site eklersiniz
**z!sitesay** *-* Sistemde kaç site olduğunu listeler
`)
.addField(`Linkimiz`, `[0017](https://discord.gg/0017)
[Botumuzu ekleme linki](Bot URL'i / Discord permissions sitesinden alabilirsiniz.)
[Destek sunucu linkimiz](https://discord.gg/0017)`)
.setThumbnail(client.user.avatarURL)
.setAuthor(`Uptime`, client.user.avatarURL)
.setFooter(`2020 © Uptime Bot | Zed on the deadline.`, client.user.avatarURL)
return message.channel.send(embed);
    }
 
})

// Zed sizi seviyor.

client.on("message", async message => {

  if(!message.content.startsWith("u.eval")) return;
  if(!["id","id"].includes(message.author.id)) return;
  var args = message.content.split("u.eval")[1]
  if(!args) return message.channel.send("Hyr! :(")
  
      const code = args
    
    
      function clean(text) {
          if (typeof text !== 'string')
              text = require('util').inspect(text, { depth: 3 })
          text = text
              .replace(/`/g, '`' + String.fromCharCode(8203))
              .replace(/@/g, '@' + String.fromCharCode(8203))
          return text;
      };
  
      var evalEmbed = ""
      try {
          var evaled = await clean(await eval(await code));
          if (evaled.constructor.name === 'Promise') evalEmbed = `\`\`\`\n${evaled}\n\`\`\``
          else evalEmbed = `\`\`\`js\n${evaled}\n\`\`\``
          
  if(evaled.length < 1900) { 
     message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
  } else {
    var hast = await require("hastebin-gen")(evaled, { url: "https://hasteb.in" } )
  message.channel.send(hast)
  }
      } catch (err) {
          message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
      }
  })
  
  const log = message => {
  console.log(`${message}`);
}
  
// Zed sizi seviyor...
  