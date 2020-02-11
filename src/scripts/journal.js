import API from './data.js'
import ENTRIES from './entriesDOM.js'
import eventListeners from './eventHandlers.js';

const refreshFormAndFilters = () => {
    API.getMoods()
        .then(ENTRIES.formRender)
        .then(ENTRIES.filterRender)
}

const refreshEntries = () => {
    API.getJournalEntries()
        .then(ENTRIES.entryRenderer)
        .then(eventListeners.addDeleteEventListener)
        .then(eventListeners.addEditEventListener)
        .then(eventListeners.addSearchEventListener);
}

refreshEntries();
refreshFormAndFilters();
eventListeners.addMoodFilterEventListener();

export default refreshEntries;