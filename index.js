/**
 * Module Imports
 */
const { Client, Collection, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./util/Utils");
const path = require("path");

const config = require('./config.json');

const client = new Client({
  fetchAllMembers: true,
  partials: ['MESSAGE', 'REACTION'],
  disableMentions: "everyone",
  restTimeOffset: 0
});

client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Client Events
 */
client.on("ready", () => {
  console.log(`${client.user.username} is ready!!`);
  client.user.setActivity(`&help`, { type: "WATCHING" });
});
client.on("warn", (info) => console.log(info));
client.on("error", console.error);

/**
 * Import all commands
 */
const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `S'il vous plaît, attendez ${timeLeft.toFixed(1)} secondes avant de réutiliser la commande ${command.name}.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("Une erreur s'est produite lors de l'exécution de cette commande.").catch(console.error);
  }
})

client.on('guildMemberAdd', member => {
  member.guild.channels.cache.get(config.greeting.channel).send(`${member}`, new MessageEmbed()
    .setImage(member.user.displayAvatarURL({ format: 'png' }))
    .setDescription(`${member} a rejoint le serveur. Nous sommes désormais ${member.guild.memberCount} ! 🎉`)
    .setColor('RANDOM'))
})

client.on('messageReactionAdd', (reaction, user) => {
  if (!reaction.message.guild || user.bot) return
  const reactionRoleElem = config.reactionRole[reaction.message.id]
  if (!reactionRoleElem) return
  const prop = reaction.emoji.id ? 'id' : 'name'
  const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
  if (emoji) reaction.message.guild.member(user).roles.add(emoji.roles)
  else reaction.users.remove(user)
})

client.on('messageReactionRemove', (reaction, user) => {
  if (!reaction.message.guild || user.bot) return
  const reactionRoleElem = config.reactionRole[reaction.message.id]
  if (!reactionRoleElem || !reactionRoleElem.removable) return
  const prop = reaction.emoji.id ? 'id' : 'name'
  const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
  if (emoji) reaction.message.guild.member(user).roles.remove(emoji.roles)
})

client.login(TOKEN);