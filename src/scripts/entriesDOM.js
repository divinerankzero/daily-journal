// All DOM Manipulation Components Go Here
import FACTORY from './entryComponent.js'
import eventListeners from './eventHandlers.js'

const ENTRIES = {
    entryRenderer (entries) {
        const entriesContainer = document.querySelector(".entries__container");
        entriesContainer.innerHTML = ""
        entries.forEach(entry => {
            let entryHTML = FACTORY.makeJournalEntry(entry);
            entriesContainer.innerHTML += entryHTML
        });
    },
    formRender () {
        const formContainer = document.querySelector(".div__form")
        let formHTML = FACTORY.makeEntryForm();
        formContainer.innerHTML = formHTML;
        eventListeners.addSaveEventListener();
        eventListeners.addResetEventListener();
    },
    // TODO: Refactor this to merge all these form rendering together
    moodFormOptionsRender (moods) {
        const container = document.querySelector("#mood__container")
        let html = FACTORY.makeMoodOptions(moods);
        container.innerHTML = html;
    },
    makeInstructorOptionsRender (instructors) {
        const container = document.querySelector("#instructor__selectors")
        let html = FACTORY.makeInstructorOptions(instructors);
        container.innerHTML = html;
    },
    filterRender () {
        const filterContainer = document.getElementById("moodfilters__container");
        let filterHtml = FACTORY.makeMoodFilter();
        filterContainer.innerHTML = filterHtml
        eventListeners.addMoodFilterEventListener();
    }
}

export default ENTRIES;