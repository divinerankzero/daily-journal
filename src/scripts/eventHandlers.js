import FACTORY from './entryComponent.js';
import API from './data.js'
import ENTRIES from './entriesDOM.js';
import refresh from './journal.js'
import formValidation from './formValidation.js'

const eventListeners = {
    addSaveEventListener() {
        const saveBtn = document.querySelector(".save-button");
        saveBtn.addEventListener("click", () => {
            const entryObject = FACTORY.journalEntry.makeEntryObject()
            if (formValidation.saveForm.allValidations(entryObject)) {
                API.saveJournalEntry(entryObject)
                .then(refresh.entries())
                .then(API.clearFields());
            }
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
                const moodId = parseInt(e.target.value)
                if (moodId === 0) { // 0 is the "show-all" option
                    API.getJournalEntries().then(ENTRIES.entryRenderer)
                } else {
                    API.getJournalEntries()
                        .then(response => response.filter(response => {
                            return moodId === response.moodId
                        })).then(ENTRIES.entryRenderer)
                }
            })
        })
    },
    addEditEventListener() {
        const editBtns = document.querySelectorAll(".edit-button");
        editBtns.forEach(btn => {
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