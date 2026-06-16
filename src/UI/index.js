import AutoCompleteTrie from "../AutoCompleteTrie.js"
import AutoCompleteController from "../AutoCompleteController.js"

const trieController = new AutoCompleteController()

const addInput = document.querySelector("#addInput")
const addButton = document.querySelector("#addButton")
const actionResultText = document.querySelector("#addResultText")
const searchInput = document.querySelector("#searchInput")
const suggestionList = document.querySelector("#suggestionsList")
const countElement = document.querySelector("#countNumber")

const removeActionMessage =function(){
    actionResultText.classList.remove("success", "error")
    actionResultText.textContent = ""
}  

addButton.addEventListener("click",() =>{  
    const inputValue = addInput.value.trim()
    const commandResult = trieController.handleCommand(`add ${inputValue}`)
    actionResultText.classList.remove("success", "error")

    if(commandResult.result){
        actionResultText.textContent = `Added ${commandResult.wordUsed} to dictionary`
        actionResultText.classList.add("success")
        addInput.value = ""
    }
    else{
        actionResultText.textContent = `${commandResult.message}`
        actionResultText.classList.add("error")
    }
    setTimeout(() => removeActionMessage(),3000)
})



searchInput.addEventListener("input",() =>{
    const searchValue = searchInput.value.trim()
})

    
