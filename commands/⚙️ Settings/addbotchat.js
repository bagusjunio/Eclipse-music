const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: `addbotchat`,
  aliases: [`addbotchannel`],
  category: `⚙️ Settings`,
  description: `Let's you enable a bot only chat where the community is allowed to use commands`,
  usage: `addbotchat <#chat>`,
  memberpermissions: [`ADMINISTRATOR`],
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //get the channel from the Ping
    let channel = message.mentions.channels.filter(ch => ch.guild.id == message.guild.id).first() || message.guild.channels.cache.get(message.content.trim().split(" ")[0]);
    //if no channel pinged return error
    if (!channel)
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["settings"]["addbotchat"]["variable1"]))
        ]
      });
    //try to find it, just incase user pings channel from different server
    try {
      message.guild.channels.cache.get(channel.id)
    } catch {
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["settings"]["addbotchat"]["variable2"]))
        ]
      });
    }
    //if its already in the database return error
    if (client.settings.get(message.guild.id, `botchannel`).includes(channel.id))
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["settings"]["addbotchat"]["variable3"]))
        ]
      });
    //push it into the database
    client.settings.push(message.guild.id, channel.id, `botchannel`);
    //these lines create the string of the Bot Channels
    let leftb = ``;
    if (client.settings.get(message.guild.id, `botchannel`).join(``) === ``) leftb = client.la[ls]["common"]["nobotchannels"];
    else
      for (let i = 0; i < client.settings.get(message.guild.id, `botchannel`).length; i++) {
        leftb += `<#` + client.settings.get(message.guild.id, `botchannel`)[i] + `> | `
      }
    //send informational message
    return message.reply({
      embeds: [new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(eval(client.la[ls]["cmds"]["settings"]["addbotchat"]["variable4"]))
        .setDescription(eval(client.la[ls]["cmds"]["settings"]["addbotchat"]["variable5"]))
      ]
    });

  }
};
/**
 * @INFO
 * Bot Coded by Bagus Junio#0104 | https://dsc.gg/servereclipse
 * @INFO
 * Work for Eclipse Development | https://www.servereclipse.site/
 * @INFO
 * Please mention him / Eclipse Development, when using this Code!
 * @INFO
 */
