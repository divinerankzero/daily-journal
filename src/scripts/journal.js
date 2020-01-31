import API from './data.js'
import ENTRIES from './entriesDOM.js'
API.getJournalEntries().then(ENTRIES.entryRenderer);