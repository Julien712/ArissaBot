const { canModifyQueue } = require("../util/Utils");

module.exports = {
  name: "loop",
  aliases: ["l"],
  description: `Mettre la musique en boucle`,
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply(`Il n'y a rien à écouter.`).catch(console.error);
    if (!canModifyQueue(message.member)) return `Vous devez d'abord rejoindre un canal vocal !`;

    // toggle from false to true and reverse
    queue.loop = !queue.loop;
    return queue.textChannel
      .send(`Loop est maintenant ${queue.loop}` ? `**on**` : `**off**` )
      .catch(console.error);
  }
};