import FACTORY from './entryComponent.js';
import API from './data.js'
import ENTRIES from './entriesDOM.js';

const eventListeners = {
    addSaveEventListener() {
        const saveBtn = document.querySelector(".save-button");
        const entryId = document.querySelector("#entry-id").value
        saveBtn.addEventListener("click", () => {
            API.saveJournalEntry(FACTORY.makeEntryObject());
        })
    },
    addResetEventListener() {
        const resetBtn = document.querySelector(".reset-button");
        resetBtn.addEventListener("click", () => {
            API.clearFields();
        })
    },
    addMoodFilterEventListener() {
        const radioBtns = document.getElementsByName("moodfilter__button")
        radioBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const mood = e.target.value.toUpperCase()
                if (mood === "SHOW-ALL") {
                    API.getJournalEntries().then(ENTRIES.entryRenderer)
                } else {
                    API.getJournalEntries()
                        .then(response => response.filter(response => {
                            const responseMood = response.mood.toUpperCase()
                            return responseMood === mood
                        })).then(ENTRIES.entryRenderer)
                }
            })
        })
    },
    addEditEventListener() {
        const editBtns = document.querySelectorAll(".edit-button");
        editBtns.forEach(btn => {
            const btnId = btn.id.split("--")[1]
            btn.addEventListener("click", (e) => {
                const entryId = e.target.id.split("--")[1]
                API.getJournalEntry(entryId)
                    .then(API.editJournalEntry)                
            })
        })
    },
    addDeleteEventListener() {
        const deleteBtns = document.querySelectorAll(".delete-button");
        deleteBtns.forEach(btn => {
            const btnId = btn.id.split("--")[1]
            btn.addEventListener("click", () => {
                API.deleteJournalEntry(btnId);
            })
        })
    },
    addSearchEventListener(){
        const searchBar = document.getElementById("search");
        searchBar.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                // Utilizing RegExp so it can be case insensitive (the i flag)
                const search = new RegExp(`${searchBar.value}`, 'i');
                API.getJournalEntries()
                    .then(response => response.filter(response => {
                        let filter = false
                        for (const prop of Object.values(response)) {
                            // If a property is an array, we'll have to loop over it
                            // to test each item in the array
                            if (Array.isArray(prop)){
                                prop.forEach(item => {
                                    // Need to use test to test with a regexp
                                    if (search.test(item)) {
                                        filter = true
                                    }
                                })
                            } else if (typeof prop === "string") {
                                if (search.test(prop)) {
                                    filter = true
                                }
                            }
                        }
                        // This is only true (and thus filtered) 
                        // if any prop passes a regex test above
                        return filter
                    })).then(ENTRIES.entryRenderer)
            }
        })
    }
}

export default eventListeners;