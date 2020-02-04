// All HTML Building Components Go Here
const FACTORY = {
    makeJournalEntry (entry) {
        return `
            <article>
                <h2>${entry.conceptsCovered}</h2>
                <div>
                    <h3>Date: ${entry.date}</h3>
                    <h3>Mood: ${entry.mood}</h3>
                    <h3>Language: ${entry.language}</h3>
                </div>
                <aside>
                    <h3>Content Covered:</h3>
                    ${this.makeUL(entry.content)}
                    <h3>Exercises:</h3>
                    ${this.makeUL(entry.exercises)}
                </aside>
                <button class="delete-button" id="delete-button--${entry.id}">DELETE</button>
            </article>
            `
    },
    makeUL (ary) {
        let list = `<ul>`;
        ary.forEach(entry => {
            list += `<li>${entry}</li>`;
        })
        list += `</ul>`;
        return list;
    },
    makeEntryObject () {
        let journalDate = document.querySelector("#journalDate").value
        let mood = document.querySelector("#mood").value
        let concepts = document.querySelector("#concepts").value
        let language = document.querySelector("#language").value
        // This next line is splitting the entries into an array
        // using carriage returns: https://stackoverflow.com/a/45709854
        let content = document.querySelector("#content").value.split(/\r?\n/)
        let exercises = document.querySelector("#exercises").value.split(/\r?\n/)
        
        return {
            "date": journalDate,
            "language": language,
            "conceptsCovered": concepts, 
            "content": content,
            "exercises": exercises,
            "mood": mood,
        }
    }
}

export default FACTORY;