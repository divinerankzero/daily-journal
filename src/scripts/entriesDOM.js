// All DOM Manipulation Components Go Here
import FACTORY from './entryComponent.js'

const ENTRIES = {
    entryRenderer (entries) {
        const entriesContainer = document.querySelector(".entries__container");
        entriesContainer.innerHTML = ""
        entries.forEach(entry => {
            let entryHTML = FACTORY.makeJournalEntry(entry);
            entriesContainer.innerHTML += entryHTML
        });
    }
}

export default ENTRIES;