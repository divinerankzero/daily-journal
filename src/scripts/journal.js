import API from './data.js'
import ENTRIES from './entriesDOM.js'
import FACTORY from './entryComponent.js';

const refreshEntries = () => {
    API.getJournalEntries()
        .then(ENTRIES.entryRenderer);
}

const eventListeners = {
    addSaveEventListener() {
        const saveBtn = document.querySelector(".save-button");
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
                const mood = e.target.value
                API.getJournalEntries()
                    .then(response => response.filter(response => {
                        return response.mood.toLowerCase() === mood
                    }))
                    .then(ENTRIES.entryRenderer);
            })
        })
    }
}

refreshEntries();
eventListeners.addSaveEventListener();
eventListeners.addResetEventListener();
eventListeners.addMoodFilterEventListener();

export default refreshEntries;