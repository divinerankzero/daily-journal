// All DOM Manipulation Components Go Here
import FACTORY from './entryComponent.js'
import eventListeners from './eventHandlers.js'

const ENTRIES = {
    entryRenderer (entries) {
        const entriesContainer = document.querySelector(".entries__container");
        entriesContainer.innerHTML = ""
        entries.forEach(entry => {
            let entryHTML = FACTORY.journalEntry.makeJournalEntry(entry);
            entriesContainer.innerHTML += entryHTML
        });
    },
    formRender () {
        const formContainer = document.querySelector(".div__form")
        let formHTML = FACTORY.form.makeEntryForm();
        formContainer.innerHTML = formHTML;
    },
    moodFormOptionsRender (moods) {
        const container = document.querySelector("#mood__container")
        let html = FACTORY.form.makeMoodOptions(moods);
        container.innerHTML = html;
        return moods // returning moods due to .then chaining
    },
    makeInstructorOptionsRender (instructors) {
        const container = document.querySelector("#instructor__selectors")
        let html = FACTORY.form.makeInstructorOptions(instructors);
        container.innerHTML = html;
    },
    filterRender (moods) {
        const filterContainer = document.getElementById("moodfilters__container");
        let filterHtml = FACTORY.makeMoodFilter(moods);
        filterContainer.innerHTML = filterHtml
        eventListeners.addMoodFilterEventListener();
        return moods // returning moods due to .then chaining
    }
}

export default ENTRIES;