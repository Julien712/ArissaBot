const { MessageEmbed } = require("discord.js");
const { support_server } = require("../config.json");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Afficher toutes les commandes et leurs descriptions",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setAuthor(`${message.client.user.username}`, `${message.client.user.displayAvatarURL({ format: "png" })}`)
      .setTitle(`${message.client.user.username } Aide`)
      .setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      .setDescription(`Liste de toutes les commandes`)
      .setColor("RANDOM")
      .setFooter(`Requested by ${message.author.username}`);

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `\`\`\`${message.client.prefix}${cmd.name}\`\`\``,
        `${cmd.description} | Aliases: (${cmd.aliases ? `${cmd.aliases}` : ""})`,
        true
      );
    });
    helpEmbed.addField(`**Liens !**`, `**[Aide](${support_server || "https://discord.gg/8t5VWQzxCx"}) • [Invite Bot](https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=8&scope=bot)**`)

    
    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  }
};