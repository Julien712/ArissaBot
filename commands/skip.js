const { canModifyQueue } = require("../util/Utils");

module.exports = {
  name: "skip",
  aliases: ["s"],
  description: `Skip la musique en cours de lecture`,
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply(`Il n'y a rien à skip.`).catch(console.error);
    if (!canModifyQueue(message.member)) return `Vous devez d'abord rejoindre un canal vocal !`;

    queue.playing = true;
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ skip la musique`).catch(console.error);
  }
};
