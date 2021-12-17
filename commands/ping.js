module.exports = {
  name: "ping",
  cooldown: 10,
  description: `Afficher le ping du bot`,
  execute(message) {
    message
      .reply(`📈 Ping vers l'API: ${Math.round(message.client.ws.ping)} ms`)
      .catch(console.error);
  }
};