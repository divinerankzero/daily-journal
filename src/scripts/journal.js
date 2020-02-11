import API from './data.js'
import ENTRIES from './entriesDOM.js'
import eventListeners from './eventHandlers.js';

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
            .then(ENTRIES.moodFormOptionsRender)
            .then(ENTRIES.filterRender);
        API.getInstructors()
            .then(ENTRIES.makeInstructorOptionsRender)
    }

}

refresh.entries();
refresh.form();
eventListeners.addMoodFilterEventListener();

export default refresh;