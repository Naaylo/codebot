const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const { REPL_MODE_SLOPPY } = require('repl');
const config = require("./config.json");


bot.commands = new Discord.Collection();
fs.readdir("./Commandes/", (error, f) => {
  if(error) console.log(error);

  let commandes = f.filter(f => f.split(".").pop() === "js");
  if(commandes.length <= 0) return console.log("aucune commande trouvé dans le dossier");

  commandes.forEach((f) => {
    let commande = require(`./Commandes/${f}`);
    console.log(`${f} commande chargée !`);
    bot.commands.set(commande.help.name, commande);

  });
});

fs.readdir("./Events/", (error, f) => {
  if(error) console.log(error);
  console.log(`${f.length} events en chargement`);

  f.forEach((f) => {
      const events = require(`./Events/${f}`);
      const event = f.split(".")[0];

    bot.on(event, events.bind(null, bot));
  });

});

bot.on('message', message => {
  if (message.author.bot) return

  const args = message.content.trim().split(/ +/g)
  const commandName = args.shift().toLowerCase()
  if (!commandName.startsWith(config.prefix)) return
  const command = bot.commands.get(commandName.slice(config.prefix.length))
  if (!command) return
  command.run(message, args, bot)

});


bot.login('ODE1Mjg3MjEyMjkwOTk4Mjg0.YDqNYg.F5pLlFHzRAUrm159SWNuFA_dBm0') 