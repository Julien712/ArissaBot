const { canModifyQueue } = require("../util/Utils");

module.exports = {
  name: "stop",
  description: `Arrête la musique`,
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply(`Il n'y a rien à jouer.`).catch(console.error);
    if (!canModifyQueue(message.member)) return `Vous devez d'abord rejoindre un canal vocal !`;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏹ arrête la musique !`).catch(console.error);
  }
};


