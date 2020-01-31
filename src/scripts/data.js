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
    saveJournalEntry () {
        let journalDate = document.querySelector("#journalDate").value
        let mood = document.querySelector("#mood").value
        let concepts = document.querySelector("#concepts").value

        // This next line is splitting the entries into an array
        // using carriage returns: https://stackoverflow.com/a/45709854
        let entries = document.querySelector("#entry").value.split(/\r?\n/)
        
        if (journalDate && concepts && entries) {
            const newJournalEntry = FACTORY.makeEntryObject(journalDate, concepts, entries)
            fetch(this.url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newJournalEntry)
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
        document.querySelector("#entry").value = ""
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