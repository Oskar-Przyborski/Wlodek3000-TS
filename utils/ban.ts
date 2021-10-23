import { GuildMember } from "discord.js"

export default (clientMember:GuildMember,member:GuildMember,days:number,reason:string)=>{
    if(clientMember.permissions.has("BAN_MEMBERS") && member.bannable){
        member.ban({days:days,reason:reason})
        return true
    }
    else return false
}