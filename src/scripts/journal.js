import API from './data.js'
import ENTRIES from './entriesDOM.js'
import eventListeners from './eventHandlers.js';
import FACTORY from './entryComponent.js';

const refreshEntries = () => {
    API.getJournalEntries()
        .then(ENTRIES.entryRenderer)
        .then(eventListeners.addDeleteEventListener)
        .then(eventListeners.addEditEventListener)
        .then(eventListeners.addSearchEventListener);
}

ENTRIES.formRender();
API.getMoods().then(ENTRIES.filterRender);
refreshEntries();
eventListeners.addMoodFilterEventListener();

export default refreshEntries;