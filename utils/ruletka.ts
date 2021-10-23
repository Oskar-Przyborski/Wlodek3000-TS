import { CommandInteraction, MessageOptions,Message, MessageComponentInteraction, GuildMember } from "discord.js";

import DiscordJS from "discord.js";
import banMember from "./ban";
import randomInt from "./randomInt";

const ruletka = async (szanse:number,typ:string,interaction:CommandInteraction | MessageComponentInteraction)=>{
    const zabojczyWynik = randomInt(1,szanse)
    const wynik = randomInt(1,szanse)
    let message:MessageOptions
    let resultMessage:Message | void 
    if(zabojczyWynik===wynik){
        if(typ=="ban"){
            interaction.member = interaction.member as GuildMember
            if(banMember(interaction.guild!.me!,interaction.member,1,'Hhahahah byś z painta umiał korzystać to bym cie oszczędził'))
            interaction.reply(`ups, zły przycisk`)
            else interaction.reply(`Masz szczęście. Nie mam uprawnień.`)
        }
        else if(typ=="dis"){
            interaction.member = interaction.member as GuildMember
            interaction.member!.voice.disconnect("hahhhah byś umiał powiększyć w wordzie czcionke to byś tu został")
            interaction.reply(`haha alt+f4 chyba kliknął`)
        }
    }else{
        message = {embeds:[ //embed
            new DiscordJS.MessageEmbed()
            .setThumbnail(interaction.user.displayAvatarURL())
            .setColor("GREEN")
            .setTitle(`Wynik ruletki dla ${interaction.user.username}`)
            .addField("Typ",typ,true)
            .addField("Szanse",szanse.toString())
            .addField("Zabójczy wynik",zabojczyWynik.toString(),true)
            .addField("Wynik",wynik.toString(),true)
            .addField("Celnosc",`${(100 - (Math.abs(wynik-zabojczyWynik)/szanse)*100).toFixed(2)}%`,true)
        ],components:[ //button
            new DiscordJS.MessageActionRow()
            .addComponents(
                new DiscordJS.MessageButton()
                    .setLabel("Jeszcze raz")
                    .setStyle("DANGER")
                    .setEmoji("🔫")
                    .setCustomId("RouletteAgain")
            )
        ]}
        resultMessage = await interaction.reply(message)
    }
    const filter = (btnInteraction: { user: { id: string; }; })=>{
        return btnInteraction.user.id === interaction.user.id
    }
    const collector = interaction.channel!.createMessageComponentCollector({
        filter,
        max:1,
        time:1000*6
    })

    collector.on("end", async (collection)=>{
        //if not any interaction collected
        if(!collection.first()) {
            if(message==null) return
            if(message.embeds == null) return 
            message.components = []
            message.embeds[0] = new DiscordJS.MessageEmbed()
                .setColor("GREEN")
                .setTitle(`${interaction.user.username} przetrwał ruletkę`)
            interaction.editReply(message)
            return
        }else{
            const btnInteraction = collection.first()!
            if(btnInteraction.customId === "RouletteAgain" && btnInteraction.user.id ===interaction.user.id){
                let btnMessage = btnInteraction.message as Message
                ruletka(szanse,typ,btnInteraction)
                message.components = []
                message.embeds![0] = new DiscordJS.MessageEmbed()
                    .setColor("GREEN")
                    .setTitle(`${btnInteraction.user.username} przetrwał ruletkę`)
                btnMessage.edit(message)
            }
        }
    })
}
export default ruletka
// (szanse,typ,interaction)=>{
//     ruletka(szanse,typ,interaction)
// }