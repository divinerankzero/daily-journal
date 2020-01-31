import API from './data.js'
import ENTRIES from './entriesDOM.js'

const refreshEntries = () => {
    API.getJournalEntries()
        .then(ENTRIES.entryRenderer);
}

const eventListeners = {
    addSaveEventListener() {
        const saveBtn = document.querySelector(".save-button");
        saveBtn.addEventListener("click", () => {
            API.saveJournalEntry();
        })
    },
    addResetEventListener() {
        const resetBtn = document.querySelector(".reset-button");
        resetBtn.addEventListener("click", () => {
            API.clearFields();
        })
    }
}

refreshEntries();
eventListeners.addSaveEventListener();
eventListeners.addResetEventListener();

export default refreshEntries;