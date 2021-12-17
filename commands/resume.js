const { canModifyQueue } = require("../util/Utils");

module.exports = {
  name: "resume",
  aliases: ["r"],
  description: `Reprendre la lecture de la musique en cours`,
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply(`Il n'y a rien à jouer.`).catch(console.error);
    if (!canModifyQueue(message.member)) return `Vous devez d'abord rejoindre un canal vocal !`;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel
        .send(`${message.author} ▶ reprend la musique !`)
        .catch(console.error);
    }

    return message.reply(`La file d'attente n'est pas mise en pause.`).catch(console.error);
  }
};