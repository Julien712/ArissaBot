const { canModifyQueue } = require("../util/Utils");

module.exports = {
  name: "skipto",
  aliases: ["st"],
  description: `Passer au numéro de file d'attente sélectionné`,
  execute(message, args) {
    if (!args.length || isNaN(args[0]))
      return message
        .reply(`Usage: ${message.client.prefix}${module.exports.name} <Nombre dans la file d'attente>`)
        .catch(console.error);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(`Il n'y a pas de file d'attente.`).catch(console.error);
    if (!canModifyQueue(message.member)) return `Vous devez d'abord rejoindre un canal vocal !`;
    if (args[0] > queue.songs.length)
      return message
        .reply(`La file d'attente contient seulement ${queue.songs.length} chansons!`)
        .catch(console.error);

    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }

    queue.connection.dispatcher.end();
    queue.textChannel
      .send(`${message.author} ⏭ skip ${args[0] - 1} musiques`)
      .catch(console.error);
  }
};