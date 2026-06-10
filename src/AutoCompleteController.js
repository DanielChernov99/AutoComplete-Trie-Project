
export default class AutoCompleteController {
    constructor(){

    }

    handleCommand(args){

    }
    validateArgs(args){
        if(!args) return {result: false,message:"please enter command and word"}
        if(!["add","complete","use","find","help","exit"].include(args[0])){
            return {result: false, message:"please enter a valid command"}
        }

    }
}


