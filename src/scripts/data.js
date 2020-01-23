// ALL API Related Components Go Here
const API = {
    getJournalEntries () {
        return fetch("http://localhost:3000/entries")
            .then(response => response.json())
    }
}

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