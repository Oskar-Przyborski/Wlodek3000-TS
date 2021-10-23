import { ICommand } from "wokcommands"
import algebra, { Equation } from 'algebra.js'
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
            description:"Podaj równanie do rozwiązania",
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
            let equation = algebra.parse(rownanie) as Equation
            let answer = equation.solveFor(dla);
            const embed = new MessageEmbed()
                .addField("Równanie",preventFormatting(equation.toString()))
                .addField("Wynik",`${dla} = ${preventFormatting(answer.toString())}`)
                .setFooter(`Requested by ${user.username}`,user.displayAvatarURL())
            interaction.reply({embeds:[embed]})
        } catch (error) {
            interaction.reply("Nastąpił error!")
        }
        
    }
} as ICommand