const { canModifyQueue } = require("../util/Utils");

module.exports = {
  name: "shuffle",
  description: `Mélange la file d'attente`,
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(`Il n'y a pas de file d'attente.`).catch(console.error);
    if (!canModifyQueue(message.member)) return `Vous devez d'abord rejoindre un canal vocal !`;

    let songs = queue.songs;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    queue.songs = songs;
    message.client.queue.set(message.guild.id, queue);
    queue.textChannel.send(`${message.author} 🔀 a mélangé la file d'attente`).catch(console.error);
  }
};