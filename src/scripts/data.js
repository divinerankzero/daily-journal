// ALL API Related Components Go Here
// I added this import beyond the exercises requirements to allow
// this app to refreshEntries once it has saved a new entry
import refreshEntries from './journal.js'
import FACTORY from './entryComponent.js'
import curseList from './curseList.js'

const API = {
    url: 'http://localhost:8088/entries',
    getJournalEntries () {
        return fetch(this.url)
            .then(response => response.json())
    },
    saveJournalEntry (entryObject) {
        let validation = formValidation.saveForm
        if (validation.requiredFields(entryObject) &&
            validation.inputValidation(entryObject) &&
            validation.curseFree(entryObject) &&
            validation.underMaxCharacters(entryObject)) {
                fetch(this.url, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(entryObject)
                }).then(this.clearFields()).then(refreshEntries)
        } else if (!validation.requiredFields(entryObject)) {
            alert("Please fill in all required fields")
        } else if (!validation.inputValidation(entryObject)) {
            alert("Restricted characters used")
        } else if (!validation.curseFree(entryObject)) {
            alert("Restricted phrasing used")
        } else if (!validation.underMaxCharacters(entryObject)) {
            alert(`Concepts covered entry over max characters (${validation.maxChars})`)
        }
    },
    clearFields () {
        document.querySelector("#journalDate").value = ""
        document.querySelector("#mood").value = ""
        document.querySelector("#concepts").value = ""
        document.querySelector("#language").value = ""
        document.querySelector("#content").value = ""
        document.querySelector("#exercises").value = ""
    }, 
    deleteJournalEntry (id) {
        return fetch(`${this.url}/${id}`, {method: "DELETE"})
            .then(response => response.json())
            .then(refreshEntries)
    },
}

const formValidation = {
    saveForm: {
        maxChars: 100,
        requiredFields (entryObject) {
          if (entryObject.date && 
                entryObject.language && 
                entryObject.mood && 
                entryObject.conceptsCovered &&
                entryObject.content.length > 0 && 
                entryObject.exercises.length > 0
            ) {return true}
            else {return false}
        },
        inputValidation (entryObject) {
           // http://melteampot.blogspot.com/2016/08/check-if-string-contains-only-letters.html
           let acceptedChars = /^[A-Za-z0-9,\.{}:;\(\)! ]+$/;

           // If a string passes the test, it's good
           // In the case of arrays, it passes the test if its length is the same
           // whether or not it is filtered by the accepted chars
            if (acceptedChars.test(entryObject.conceptsCovered) && 
                entryObject.content.filter(content => acceptedChars.test(content)).length === entryObject.content.length &&
                entryObject.exercises.filter(content => acceptedChars.test(content)).length === entryObject.exercises.length 
            ) {return true}
            else {return false}
        },
        curseFree (entryObject) {
            // If a string passes the test (contains a swear), we return false (it is not "curse free")
            // Or, if any string is filtered out of an array with a curse, then it is also false
            if (curseList.test(entryObject.conceptsCovered) || 
                entryObject.content.filter(content => curseList.test(content)).length > 0 ||
                entryObject.exercises.filter(content => curseList.test(content)).length > 0 
            ) {return false}
            else {return true}
        },
        underMaxCharacters (entryObject) {
            if (entryObject.conceptsCovered.length < this.maxChars) {
                return true
            } else {return false}
        }
    }
}

export default API;

// JSON ENTRY OBJECT TEMPLATE
// {
//     "id": 0,
//     "date": "",
//     "language": "",
//     "conceptsCovered": "",
//     "content": [
//         "",
//         ""
//     ],
//     "Exercises": [
//         "",
//         "",
//         "",
//     ],
//     "mood": ""
// }, 