const fs = require('fs');
const Discord = require("discord.js");
const embed = new Discord.RichEmbed();

module.exports.run = async (message, args, bot) => {
	let Iduser = message.author.id; 

	user = message.guild.members.get(Iduser); 
	console.log(user.hasPermission("ADMINISTRATOR"));

	if(!user.hasPermission("ADMINISTRATOR"))
	return	message.channel.send("Vous n'avez pas la permission pour utiliser cette commande.");	
	

	let pathDuJson = './Commandes/banque.json';
	let ObjectBanque;
    if (fs.existsSync(pathDuJson)) 
	{
		ObjectBanque = fs.readFileSync(pathDuJson);
        ObjectBanque = JSON.parse(ObjectBanque);
	};

	idUser = args[0].replace("<@!", "").replace(">","");

			let userBalance = ObjectBanque.banque.find(x => x.UserID == idUser);


	if (!userBalance) {
		message.channel.send("L'utilisateur que vous demandez n'a pas été trouvé.");
	} 
	
	else{
		let somme = userBalance.solde + parseInt(args[1]);
		let indexUser = ObjectBanque.banque.indexOf(userBalance);
		userBalance.solde = somme;
		ObjectBanque.banque[indexUser] = userBalance;
		
		const callback = function (err)
		{
            if (err) throw Error("Sauvegard du fichier: Echec " + err);
            else console.log("Sauvegard du fichier : Ok ");
		};
		
		ObjectBanque = JSON.stringify(ObjectBanque);
		fs.writeFile(pathDuJson, ObjectBanque, callback);


		// ici ton code 
		
		
		embed.setTitle("Transaction effectuée !").setColor("#35aa08").setDescription(`Montant ajouté : ${args[1]} \n Total solde : ${somme}**$** \n Employé : ${message.mentions.members.first()}`).setTimestamp();
		message.channel.send(embed);
	}
};

module.exports.help = {
    name: 'payadd',
};