// All DOM Manipulation Components Go Here
const ENTRIES = {
    entryRenderer (entries) {
        const journalDiv = document.querySelector(".wrapper");
        entries.forEach(entry => {
            let entryHTML = FACTORY.makeJournalEntry(entry);
            journalDiv.innerHTML += entryHTML
        });
    }
}