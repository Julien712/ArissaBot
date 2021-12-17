module.exports = {
  name: 'server',
  aliases: ["is"],
  description: 'Affiche le nom du serveur et le nombre d\'utilisateurs',
  execute(message) {
    message.channel.send(`Nom du serveur : ${message.guild.name} \nNombre d'utilisateurs : ${message.guild.memberCount}`);
  }
};