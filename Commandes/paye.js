const Discord = require("discord.js");
const fs = require('fs');
const embed = new Discord.RichEmbed();

module.exports.run = async (message, args, bot) => {
//Definit user comme la personne mentionner ou alors l'auteur du message si personne mentionné // configurationServer is not defined 
    let user = message.mentions.members.first() || message.author;
//#region  Récuperation de l'objet 
    // premier truc faut savoir ou le fichier json se trouve Ex la il // 
    let pathDuJson = './Commandes/banque.json';
    // pour ce qui suit je part du principe que dans ton fichier json tu as : 
    // {"banque":[]} 
    // si le fichier existe 
    // on vient lire  le fichier et le mettre dans la variable con
	let ObjectBanque;
    if (fs.existsSync(pathDuJson)) 
	{
		  ObjectBanque = fs.readFileSync(pathDuJson);
            // on vien traduire la chaine json en objet (et le ranger a dans la même variable (sa écrase))
        ObjectBanque = JSON.parse(ObjectBanque);
	};
    if(args[0]){
	args = args[0].replace("<@!", "").replace(">","");
	}
    else {
		args = message.author.id;
    };

	// récuperation de la banque de l'utilisateur : 	
	let userBalance = ObjectBanque.banque.find(x => x.UserID == args);
        // si ya rien on vien crée l'utilisateur et le rajouter a notre tableau 
	
       if (!userBalance) {
           message.channel.send("L'utilisateur que vous demandez n'a pas été trouvé.");
       }
       else {
        console.log(userBalance.solde);
        embed.setTitle("Mon Solde !").setColor("#88c7cf").setDescription(`${userBalance.solde}**$**`).setTimestamp();
		   message.channel.send(embed);
       };
    };

module.exports.help = {
    name: 'paye',
};