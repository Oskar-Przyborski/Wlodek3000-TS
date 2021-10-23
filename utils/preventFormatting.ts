const forbiddenChars = ["-","*","|","_","~","`"]
export default (str:string):string=>{
    let newStr:string[] = [] //new string
    str.split("").forEach(char=>{ //for every char in string
        if(forbiddenChars.includes(char)) newStr.push("\\"+char) //if char is one of the forbidden
        else newStr.push(char) //if char is good
    })
    return newStr.join("") //return joined new string
}