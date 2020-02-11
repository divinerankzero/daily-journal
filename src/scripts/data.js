// ALL API Related Components Go Here
// I added this import beyond the exercises requirements to allow
// this app to refreshEntries once it has saved a new entry
import refresh from './journal.js'
import formValidation from './formValidation.js'

const API = {
    url: 'http://localhost:8088',
    moodExpand: '?_expand=mood',
    getJournalEntries () {
        return fetch(`${this.url}/entries${this.moodExpand}`)
            .then(response => response.json())
    },
    getJournalEntry (entryId) {
        return fetch(`${this.url}/entries/${entryId}${this.moodExpand}`)
            .then(response => response.json())
    },
    editJournalEntry (entry) {
        document.querySelector("#journalDate").value = entry.date
        document.querySelector("#entry-id").value = entry.id
        document.querySelector("#mood").value = entry.mood.id
        document.querySelector("#concepts").value = entry.conceptsCovered
        document.querySelector("#language").value = entry.language

        // Since these are arrays created by carriage returns,
        // They need to be split apart again
        document.querySelector("#content").value = entry.content.join('\n');
        document.querySelector("#exercises").value = entry.exercises.join('\n');
    },
    saveJournalEntry (entryObject) {
        let validation = formValidation.saveForm
        if (validation.requiredFields(entryObject) &&
            validation.inputValidation(entryObject) &&
            validation.curseFree(entryObject) &&
            validation.underMaxCharacters(entryObject)) {
                // If there is an id, the user is editing an existing entry
                if (entryObject.id) {
                    fetch(`${this.url}/entries/${entryObject.id}`, {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(entryObject)
                    }).then(this.clearFields()).then(refresh.entries)
                // If there is no id, the user is saving a new entry
                } else {
                    fetch(`${this.url}/entries/`, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(entryObject)
                    }).then(this.clearFields()).then(refresh.entries)
                }
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
        // TODO: Make clearfields set things to default values...
        document.querySelector("#entry-id").value = ""
        document.querySelector("#journalDate").value = ""
        document.querySelector("#mood").value = ""
        document.querySelector("#concepts").value = ""
        document.querySelector("#language").value = ""
        document.querySelector("#content").value = ""
        document.querySelector("#exercises").value = ""
    }, 
    deleteJournalEntry (id) {
        return fetch(`${this.url}/entries/${id}`, {method: "DELETE"})
            .then(response => response.json())
            .then(refresh.entries)
    },
    getMoods () {
        return fetch(`${this.url}/moods`)
            .then(response => response.json())
    },
    getInstructors () {
        return fetch(`${this.url}/instructors`)
            .then(response => response.json())
    }
}

export default API;