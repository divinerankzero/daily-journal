import API from './data.js'
import ENTRIES from './entriesDOM.js'
import eventListeners from './eventHandlers.js';

const refreshEntries = () => {
    API.getJournalEntries()
        .then(ENTRIES.entryRenderer)
        .then(eventListeners.addDeleteEventListener);
}

refreshEntries();
eventListeners.addSaveEventListener();
eventListeners.addResetEventListener();
eventListeners.addMoodFilterEventListener();

export default refreshEntries;