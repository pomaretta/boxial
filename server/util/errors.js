import * as fs from 'fs/promises'

class Error {
    
    constructor(error){
        this.error = error
        this.log()
    }

    log(){

        try {

            let date = new Date()

        } catch (error){
            console.log(error)
        }

    }

}