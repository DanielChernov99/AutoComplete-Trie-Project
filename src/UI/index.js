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
        countElement.textContent = Number(countElement.textContent) + 1
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
    suggestionList.innerHTML = ""
    if (searchValue === "") {
        suggestionList.classList.remove("visible")      
        return
    }
    suggestionList.classList.add("visible")
    const commandResult = trieController.handleCommand(`complete ${searchValue}`)
    let predictedWords
    if(commandResult.result){
        predictedWords = commandResult.data
        predictedWords.forEach(suggestion => {
            const wordElement = document.createElement("li")
        
            const notHighligthed = suggestion.word.slice(searchValue.length)
            const notHighligthedElement = document.createElement("span")
            notHighligthedElement.textContent = notHighligthed


            const highligthed = suggestion.word.slice(0,searchValue.length)
            const highligthedElement = document.createElement("span")
            highligthedElement.textContent = highligthed
            highligthedElement.classList.add("highlighted")


            wordElement.appendChild(highligthedElement)
            wordElement.appendChild(notHighligthedElement)
            suggestionList.appendChild(wordElement)

            wordElement.addEventListener("click",() =>{
                const commandResult = trieController.handleCommand(`use ${suggestion.word}`)
                searchInput.value = suggestion.word
                suggestionList.innerHTML = ""
                suggestionList.classList.remove("visible")
            })
        });
    }
        
})



    
