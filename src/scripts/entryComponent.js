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
    makeEntryForm () {
        return `
        <article id="article__form">
            <h2>New Journal Entry</h2>
            <form action="">
                <div class="row-forms">
                    <fieldset>
                        <label for="journalDate">Date of Entry</label>
                        <input type="date" id="journalDate" name="journalDate" id="today">
                    </fieldset>
                    <fieldset>
                        <label for="mood">Mood for the Day</label>
                        <select name="mood" id="mood">
                            <option value="fine">Fine</option>
                            <option value="happy">Happy</option>
                            <option value="sad">Sad</option>
                        </select> 
                    </fieldset>
                    <fieldset>
                        <label for="language">Language</label>
                        <select name="language" id="language">
                            <option value="JavaScript">JavaScript</option>
                            <option value="Python">Python</option>
                            <option value="HTML">HTML</option>
                            <option value="CSS">CSS</option>
                        </select> 
                    </fieldset>
                </div>
                <div class="column-forms">
                    <fieldset>
                        <label for="concepts">Concepts Covered</label>
                        <input type="text" name="concepts" id="concepts" placeholder="Enter concepts here...">
                    </fieldset>
                    <fieldset>
                        <label for="Content">Content</label>
                        <textarea name="content" class="content" id="content" placeholder="Write content here..."></textarea>
                    </fieldset>
                    <fieldset>
                        <label for="exercises">Exercises</label>
                        <textarea name="exercises" class="exercises" id="exercises" placeholder="Write exercises here..."></textarea>
                    </fieldset>
                </div>
            </form>
            <div class="buttons">       
                <button class="save-button">Save</button>
                <button class="reset-button">Reset</button>
            </div>
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