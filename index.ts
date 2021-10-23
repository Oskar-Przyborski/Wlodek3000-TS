import DiscordJS, {Intents} from 'discord.js'
import  WOKCommands from "wokcommands"
import path from "path"
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

let client = new DiscordJS.Client({intents:[
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
]})

client.on("ready",()=>{
    console.log("Wypiłem kawkę, jestem gotowy!")
    //deleteServerCommands()
    new WOKCommands(client,{
        commandsDir: path.join(__dirname,"commands"),
        testServers:["819517560688476231"],
        botOwners:["717744851046891520"],
        typeScript:true
    })
})
client.on("messageCreate",(message)=>{
    if(message.mentions.has(client.user!)) message.reply("co pingujesz cwelu")
})

const deleteServerCommands = async ()=>{
    const resp = await axios.put("https://discord.com/api/v8/applications/899373353440268340/guilds/819517560688476231/commands",{},{
        headers:{
            "Authorization": `Bot ${process.env.TOKEN}`
        }
      })
    console.log(resp)
}

client.login(process.env.TOKEN)