// ALL API Related Components Go Here
const API = {
    getJournalEntries () {
        return fetch("http://localhost:8088/entries")
            .then(response => response.json())
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