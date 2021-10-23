import { ICommand } from "wokcommands"
import algebra, { Expression } from 'algebra.js'
import { MessageEmbed } from "discord.js"
import preventFormatting from "../utils/preventFormatting"
export default {
    category:"Zabawy",
    description:"Uprość wyrażenie algebraiczne",
    slash:true,
    testOnly:true,
    options: [
        {
            name:"wyrazenie",
            description:"Podaj wyrazenie do uproszczenia",
            type:"STRING",
            required:true
        }
    ],
    callback: async ({interaction,user})=>{
        //get chances 
        const wyrazenie = interaction.options.getString("wyrazenie",true)

        try {
            let expression = algebra.parse(wyrazenie) as Expression
            const embed = new MessageEmbed()
                .addField("Podanie wyrażenie", preventFormatting(wyrazenie) )
                .addField("Uproszczone wyrażenie", preventFormatting(expression.toString()) )
                .setFooter(`Requested by ${user.username}`,user.displayAvatarURL())
            interaction.reply({embeds:[embed]})
        } catch (error) {
            interaction.reply("Nastąpił error!")
        }
    }
} as ICommand