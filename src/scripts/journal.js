import API from './data.js'
import ENTRIES from './entriesDOM.js'
API.getJournalEntries().then(ENTRIES.entryRenderer);

const eventListeners = {
    addSaveEventListener() {
        const saveBtn = document.querySelector(".save-button");
        console.log(saveBtn);
        saveBtn.addEventListener("click", () => {
            console.log(event)
        })
    },
    addResetEventListener() {
        const resetBtn = document.querySelector(".reset-button");
        resetBtn.addEventListener("click", (event) => {
            console.log(event)
        })
    }
}


eventListeners.addSaveEventListener();
eventListeners.addResetEventListener();