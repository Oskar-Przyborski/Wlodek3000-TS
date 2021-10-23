import { ICommand } from "wokcommands"
import ruletka from "../utils/ruletka"
export default {
    category:"Zabawy",
    description:"Zagraj w rosyjską ruletkę!",
    slash:true,
    testOnly:true,
    options: [
        {
            name:"typ",
            description:"Ban albo dis z vc",
            type:"STRING",
            choices:[{name:"ban",value:"ban"},{name:"dis",value:"dis"}],
            required:true
        },
        {
            name:"szanse",
            description:"Szanse na wygraną, np 30 = 1/30 szans na wygraną.",
            type:"INTEGER"
        }
    ],
    callback: async ({interaction})=>{
        //get chances 
        const chances = interaction.options.getInteger("szanse") || 6
        if(chances < 2){
            await interaction.reply("Szanse muszą być większe niż 2!")
            setTimeout(()=>interaction.deleteReply(),2000)
            return
        }
        const type = interaction.options.getString("typ")
        ruletka(chances,type!,interaction)
    }
} as ICommand