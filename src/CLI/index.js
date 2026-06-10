import AutoCompleteTrie from "../AutoCompleteTrie"
import AutoCompleteController from "../AutoCompleteController"
import ConsoleView from "./ConsoleView"
import promptSync from "prompt-sync"


let running = true
const trieController = new AutoCompleteController()
const cliView = new ConsoleView()
const prompt = promptSync()


cliView.showWelcome()

while(running){
    let userInput = prompt("> ")
    



    if(placeholder.result ==="exit"){
        running = false
    }
}