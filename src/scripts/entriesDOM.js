// All DOM Manipulation Components Go Here
const journalDiv = document.querySelector(".wrapper");

// Renderer
const entryRenderer = (entries) => {
    entries.forEach(entry => {
        let entryHTML = makeJournalEntryComponent(entry);
        journalDiv.innerHTML += entryHTML
    });
}