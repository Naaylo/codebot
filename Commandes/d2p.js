const fs = require('fs');
const Discord = require("discord.js");
const embed = new Discord.RichEmbed();

module.exports.run = async (message, args, bot) => {
    let user = message.author

    embed.setColor("#5d9985");
    embed.setTitle("Demande de paye");
    embed.setDescription(`${user} \nDemande sa paye`);
    embed.setTimestamp();
    bot.channels.get("").send(embed);
};

module.exports.help = {
    name: 'd2p',
};