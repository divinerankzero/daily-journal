import API from './data.js'
import ENTRIES from './entriesDOM.js'
import eventListeners from './eventHandlers.js';

const refreshEntries = () => {
    API.getJournalEntries()
        .then(ENTRIES.entryRenderer)
        .then(eventListeners.addDeleteEventListener)
        .then(eventListeners.addEditEventListener);
}

ENTRIES.formRender();
refreshEntries();
eventListeners.addMoodFilterEventListener();

export default refreshEntries;