// ALL API Related Components Go Here
// I added this import beyond the exercises requirements to allow
// this app to refreshEntries once it has saved a new entry
import refreshEntries from './journal.js'
import FACTORY from './entryComponent.js'
import formValidation from './formValidation.js'

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