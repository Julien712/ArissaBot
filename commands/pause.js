const { canModifyQueue } = require("../util/Utils");

module.exports = {
  name: "pause",
  description: `Mettre en pause la musique en cours de lecture`,
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply(`Il n'y a rien à jouer.`).catch(console.error);
    if (!canModifyQueue(message.member)) return `Vous devez d'abord rejoindre un canal vocal !`;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel
        .send(`${message.author} à mis en pause la musique. ⏸`)
        .catch(console.error);
    }
  }
};


