// ALL API Related Components Go Here
// I added this import beyond the exercises requirements to allow
// this app to refreshEntries once it has saved a new entry
import refreshEntries from './journal.js'
import FACTORY from './entryComponent.js'
const API = {
    url: 'http://localhost:8088/entries',
    getJournalEntries () {
        return fetch(this.url)
            .then(response => response.json())
    },
    saveJournalEntry (entryObject) {
        if (entryObject.date && entryObject.language 
            && entryObject.conceptsCovered && entryObject.mood 
            && entryObject.content.length > 0 
            && entryObject.exercises.length > 0) {
                fetch(this.url, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(entryObject)
                }).then(refreshEntries)
                this.clearFields()
        } else {
            alert("Please fill in all required fields")
        }
    },
    clearFields () {
        document.querySelector("#journalDate").value = ""
        document.querySelector("#mood").value = ""
        document.querySelector("#concepts").value = ""
        document.querySelector("#language").value = ""
        document.querySelector("#content").value = ""
        document.querySelector("#exercises").value = ""
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