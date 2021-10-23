import { ColorResolvable, MessageEmbed } from "discord.js"
import { ICommand } from "wokcommands"
//questions options
const questions = [
    {name:"winrar",value:"winrar"},
    {name:"google",value:"google"},
    {name:"google prezentacje",value:"google prezentacje"},
    {name:"google maps",value:"google maps"},
    {name:"html",value:"html"}
]
//answers to to the questions
const questionsAnswersEmbedData = [
    {
        name:"google prezentacje",
        title:"Pomoc na temat prezentacji google",
        url:"https://www.google.pl/intl/pl/slides/about/",
        thumbnailUrl:"https://play-lh.googleusercontent.com/DG-zbXPr8LItYD8F2nD4aR_SK_jpkipLBK77YWY-F0cdJt67VFgCHZtRtjsakzTw3EM",
        color:"#3bd1ff",
        fields:[
            {
                name:"Co to jest?",
                value:"Dzięki Prezentacjom Google możesz tworzyć i edytować pliki samodzielnie lub z innymi oraz przedstawiać je w dowolnym miejscu."
            }
        ]
    },
    {
        name:"winrar",
        title:"Pomoc na temat winrara",
        url:"https://www.winrar.pl",
        thumbnailUrl:"https://www.winrar.pl/images/winrarpl.jpg",
        color:"#3bd1ff",
        fields:[
            {
                name:"Co to jest?",
                value:"WinRAR to program do kompresji plików, który oferuje pełną gamę funkcjonalności i obsługuje wiele formatów do ekstrakcji. Można kompresować pliki w dwóch archiwalnych formatach RAR i ZIP, ale mają one szerokie zastosowanie Format jest głównym rywalem wszechobecnego formatu ZIP."
            },
            {
                name:"Funkcje",
                value:`-Pakowanie wielu plików do jednego archiwum
                -Kompresja plików
                -Zabezpieczanie archiwów hasłem
                -Skanowanie antywirusowe`
            },
            {
                name:"Jak zdobyć?",
                value:`Program można pobrać na oficjalnej stronie programu: https://www.winrar.pl/winrar/pobierz
                Konieczna jest także licencja dostępna tu: https://softx.pl/program/winrar-156s`
            }
        ]
    },
    {
        name:"google",
        title:"Pomoc na temat google",
        url:"https://google.com",
        thumbnailUrl:"https://lh3.googleusercontent.com/proxy/ydpcscNNsegfNxSxlhl-7EjiEg9HmiYA-hWwyfrqXRoZHouT-rsWkUSS7GurKeNrQCT5FOqq55jxFNlqrZtEzX9R5fTK2_u2E5HBgwnEdsQwnf_xQz2MpsOVEnE",
        color:"#3bd1ff",
        fields:[
            {
                name:"Co to jest?",
                value:"Google LLC – amerykańskie przedsiębiorstwo informatyczne. Jego flagowym produktem jest wyszukiwarka Google, a deklarowaną misją – „uporządkowanie światowych zasobów informacji tak, by stały się powszechnie dostępne i użyteczne dla każdego”."
            },
            {
                name:"Produkty",
                value:`-Wyszukiwarka
                -Mapy
                -Tłumacz
                -Chrome
                -Youtube
                -Gmail
                -Dokumenty
                -Dysk
                -Prezentacje
                i wiele więcej`
            }
        ]
    },
    {
        name:"google maps",
        title:"Pomoc na temat map google",
        url:"https://google.com/maps",
        thumbnailUrl:"https://play-lh.googleusercontent.com/Kf8WTct65hFJxBUDm5E-EpYsiDoLQiGGbnuyP6HBNax43YShXti9THPon1YKB6zPYpA",
        color:"#3bd1ff",
        fields:[
            {
                name:"Co to jest?",
                value:"Jest to serwis internetowy umożliwiający wyszukiwanie obiektów, oglądanie map, zdjęć lotniczych powierzchni Ziemi, 360° panoramiczne widoki z poziomu ulic (Street view), natężenie ruchu ulicznego w czasie rzeczywistym, planowanie tras podróży samochodem, transportem publicznym, rowerem, pieszo lub samolotem oraz tworzenie „wizytówek” firm”."
            }
        ]
    },
    {
        name:"html",
        title:"Pomoc na temat języka html",
        url:"https://pl.wikipedia.org/wiki/HTML",
        thumbnailUrl:"https://cdn-icons-png.flaticon.com/512/919/919827.png",
        color:"#3bd1ff",
        fields:[
            {
                name:"Co to jest?",
                value:"HTML pozwala opisać strukturę informacji zawartych wewnątrz strony internetowej, nadając odpowiednie znaczenie semantyczne poszczególnym fragmentom tekstu – formując hiperłącza, akapity, nagłówki, listy – oraz osadza w tekście dokumentu obiekty plikowe np. multimedia bądź elementy baz danych np. interaktywne formularze danych. HTML umożliwia określenie wyglądu dokumentu w przeglądarce internetowej. Do szczegółowego opisu formatowania akapitów, nagłówków, użytych czcionek i kolorów, zalecane jest wykorzystywanie kaskadowych arkuszy stylów."
            }
        ]
    },
]
export default {
    category:"Włodek",
    description:"Pomoc od włodka!",
    slash:true,
    testOnly:true,
    options: [
        {
            name:"temat",
            description:"Na jaki temat potrzebujesz pomocy?",
            type:"STRING",
            choices:questions,
            required:true
        }
    ],
    callback: async ({interaction})=>{
        //get response data from questionsAnswersEmbedData
        let questionAnswerData = questionsAnswersEmbedData.filter((q)=>q.name == interaction.options.getString("temat",true))[0]
        //create embed to send
        const embed = new MessageEmbed()
            .setTitle(questionAnswerData.title)
            .setURL(questionAnswerData.url)
            .setThumbnail(questionAnswerData.thumbnailUrl)
            .setColor(questionAnswerData.color as ColorResolvable)
            .addFields(questionAnswerData.fields)
        // questionAnswerData.fields.forEach((field)=>{
        //     embed.addField(field.name,field.value)
        // })
        //send 
        interaction.reply({embeds:[embed]})
    }
} as ICommand