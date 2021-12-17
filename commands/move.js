const move = require("array-move");
const { canModifyQueue } = require("../util/Utils");

module.exports = {
  name: "move",
  aliases: ["mv"],
  description: `Déplacez les chansons de la file d'attente`,
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(`Il n'y a pas de file d'attente.`).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.reply(`Usage: ${message.client.prefix}move <Nombre dans la file d'attente>`);
    if (isNaN(args[0]) || args[0] <= 1)
      return message.reply(`Usage: ${message.client.prefix}move <Nombre dans la file d'attente>`);

    let song = queue.songs[args[0] - 1];

    queue.songs = move(queue.songs, args[0] - 1, args[1] == 1 ? 1 : args[1] - 1);
    queue.textChannel.send(`${message.author} a déplacé **${song.title}** vers ${args[1] == 1 ? 1 : args[1]} dans la file d'attente 🚚.`);
  }
};