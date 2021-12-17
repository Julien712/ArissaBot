const { canModifyQueue } = require("../util/Utils");

const pattern = /^[0-9]{1,2}(\s*,\s*[0-9]{1,2})*$/;

module.exports = {
  name: "remove",
  aliases: ["rm"],
  description: `Supprimer la chanson de la file d'attente`,
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.channel.send(`Il n'y a pas de file d'attente.`).catch(console.error);
    if (!canModifyQueue(message.member)) return `Vous devez d'abord rejoindre un canal vocal !`;
    if (!args.length) return message.reply(`Usage: ${message.client.prefix}remove <nombre de la musique dans la file d'attente>`);

    const argu = args.join("");
    const songs = argu.split(",").map((arg) => parseInt(arg));
    let removed = [];

    if (pattern.test(argu)) {
      queue.songs = queue.songs.filter((item, index) => {
        if (songs.find((songIndex) => songIndex - 1 === index)) removed.push(item);
        else return true;
      });

      queue.textChannel.send(
        `${message.author} ❌ a rétiré **${removed.map((song) => song.title).join("\n")}** de la file d'attente.`
      );
    } else if (!isNaN(args[0]) && args[0] >= 1 && args[0] <= queue.songs.length) {
      console.log("we got elsed!");
      return queue.textChannel.send(
        `${message.author} ❌ a rétiré **${queue.songs.splice(args[0] - 1, 1)[0].title}** de la file d'attente.`
      );
    } else {
      console.log("we got the last one");
      return message.reply(`Usage: ${message.client.prefix}remove <nombre de la musique dans la file d'attente>`);
    }
  }
};