import API from './data.js'
import ENTRIES from './entriesDOM.js'
import eventListeners from './eventHandlers.js';

// const refreshFormAndFilters = (moods, instructors) => {
//     console.log(moods, instructors)
//     ENTRIES.formRender(moods, instructors);
//     ENTRIES.filterRender(moods);
// }
const refresh = {
    entries() {
        API.getJournalEntries()
            .then(ENTRIES.entryRenderer)
            .then(eventListeners.addDeleteEventListener)
            .then(eventListeners.addEditEventListener)
            .then(eventListeners.addSearchEventListener);
    },
    form() {
        ENTRIES.formRender();
        API.getMoods()
            .then(ENTRIES.moodFormOptionsRender);
        API.getInstructors()
            .then(ENTRIES.makeInstructorOptionsRender)
    }

}

refresh.entries();
refresh.form();
eventListeners.addMoodFilterEventListener();

export default refresh;