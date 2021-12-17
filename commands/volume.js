const { canModifyQueue } = require("../util/Utils");

module.exports = {
  name: "volume",
  aliases: ["v"],
  description: `Changer le volume de la musique en cours de lecture`,
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply(`Il n'y a rien à jouer.`).catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply(`Vous devez d'abord rejoindre un canal vocal !`).catch(console.error);

    if (!args[0]) return message.reply(`🔊 Le volume actuelle est de: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply(`Veuillez utiliser un nombre pour régler le volume.`).catch(console.error);
    if (Number(args[0]) > 100 || Number(args[0]) < 0)
      return message.reply(`Veuillez utiliser un nombre compris entre 0 et 100.`).catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    return queue.textChannel.send(`Volume réglé sur: **${args[0]}%**`).catch(console.error);
  }
};;
