// ALL API Related Components Go Here
const API = {
    url: 'http://localhost:8088/entries',
    getJournalEntries () {
        return fetch(this.url)
            .then(response => response.json())
    },
    saveJournalEntry () {
        const newJournalEntry = {
            
        }
        fetch(this.url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newJournalEntry)
        })
    }
}

export default API;

// JSON ENTRY OBJECT TEMPLATE
// {
//     "id": 0,
//     "date": "",
//     "language": "",
//     "conceptsCovered": "",
//     "content": [
//         "",
//         ""
//     ],
//     "Exercises": [
//         "",
//         "",
//         "",
//     ],
//     "mood": ""
// }, 