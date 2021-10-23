import { ICommand } from "wokcommands"
import nerdamer from "nerdamer"
require("nerdamer/Algebra.js")
require("nerdamer/Calculus.js")
require("nerdamer/Solve.js")
import { MessageEmbed } from "discord.js"
import preventFormatting from "../utils/preventFormatting"
export default {
    category:"Zabawy",
    description:"Znajdź x dla równania algebraicznego",
    slash:true,
    testOnly:true,
    options: [
        {
            name:"rownanie",
            description:"Podaj równanie",
            type:"STRING",
            required:true
        },
        {
            name:"dla",
            description:"Dla jakiej zmiennej to rozwiązać",
            type:"STRING",
            required:false
        }
    ],
    callback: async ({interaction,user})=>{
        //get chances 
        const rownanie = interaction.options.getString("rownanie",true)
        let dla = interaction.options.getString("dla")
        if(dla == null) dla = "x"
        try {
            const equation = nerdamer(rownanie).toString()
            const answer = nerdamer(rownanie).solveFor(dla).toString()
            const embed = new MessageEmbed()
                .addField("Równanie",preventFormatting(equation))
                .addField("Wynik",`${dla} = ${preventFormatting(answer)}`)
                .setFooter(`Requested by ${user.username}`,user.displayAvatarURL())
            interaction.reply({embeds:[embed]})
        } catch (error) {
            interaction.reply("Nastąpił error!\n" + error)
        }
        
    }
} as ICommand