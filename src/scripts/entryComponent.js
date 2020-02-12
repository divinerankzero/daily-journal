// All HTML Building Components Go Here
const FACTORY = {
    makeEntryObject () {
        let id = document.querySelector("#entry-id").value
        let journalDate = document.querySelector("#journalDate").value
        let moodId = document.querySelector("#mood").value
        let instructorId = document.querySelector("#instructor").value
        let concepts = document.querySelector("#concepts").value
        let language = document.querySelector("#language").value
        // This next line is splitting the entries into an array
        // using carriage returns: https://stackoverflow.com/a/45709854
        let content = document.querySelector("#content").value.split(/\r?\n/)
        let exercises = document.querySelector("#exercises").value.split(/\r?\n/)
        
        return {
            "id": id,
            "date": journalDate,
            "language": language,
            "conceptsCovered": concepts, 
            "content": content,
            "exercises": exercises,
            "moodId": moodId,
            "instructorId": instructorId
        }
    },
    makeJournalEntry (entry) {
        const instructor = `${entry.instructor.fname} ${entry.instructor.lname}`
        return `
            <article>                
                <h2>${entry.conceptsCovered}</h2>
                <div>
                    <h3>Date: ${entry.date}</h3>
                    <h3>Mood: ${entry.mood.label}</h3>
                    <h3>Language: ${entry.language}</h3> 
                    <h3>Instructor: ${instructor}</h3>
                </div>
                <aside>
                    <h3>Content Covered:</h3>
                    ${this.makeUL(entry.content)}
                    <h3>Exercises:</h3>
                    ${this.makeUL(entry.exercises)}
                </aside>
                <button class="delete-button" id="delete-button--${entry.id}">DELETE</button>
                <button class="edit-button" id="edit-button--${entry.id}">EDIT</button>
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
    form: {
        makeMoodOptions (moods) {
            // Dynamically creating the options for the mood dropdown
            let moodOptionsHtml = "";
            moods.forEach(mood => {
                moodOptionsHtml += `<option value="${mood.id}">${mood.label}</option>`
            })
            return `
                <fieldset>
                    <label for="mood">Mood</label>
                    <select name="mood" id="mood">
                        ${moodOptionsHtml}
                    </select> 
                </fieldset>
            `
        },
        makeInstructorOptions (instructors) {
            let instructorsOptionsHtml = ""; 
            instructors.forEach(instructor => {
                instructorsOptionsHtml += `<option value="${instructor.id}">${instructor.fname} ${instructor.lname}</option>`
            })
            return `
                <fieldset>
                    <label for="instructor">Instructors</label>
                    <select name="instructor" id="instructor">
                        ${instructorsOptionsHtml}
                    </select> 
                </fieldset>
            `
        },
        makeEntryForm () {
            // Getting and formatting today's date for the default
            const today = new Date()
            const yyyy = today.getFullYear()
            const MM = today.getMonth().toString().padStart(2, '0')
            const dd = today.getDate().toString().padStart(2, '0')
    
            const todayFormatted = `${yyyy}-${MM}-${dd}`
    
            return `
            <article id="article__form">
                <input type="hidden" id="entry-id" value="">
                <h2>New Journal Entry</h2>
                <form action="">
                    <div class="row-flex">
                        <fieldset>
                            <label for="journalDate">Date of Entry</label>
                            <input type="date" id="journalDate" name="journalDate" id="journalDate" value="${todayFormatted}">
                        </fieldset>
                        <div id="mood__container"></div>
                        <fieldset>
                            <label for="language">Language</label>
                            <select name="language" id="language">
                                <option value="JavaScript">JavaScript</option>
                                <option value="Python">Python</option>
                                <option value="HTML">HTML</option>
                                <option value="CSS">CSS</option>
                            </select> 
                        </fieldset>
                        <fieldset id="instructor__selectors">
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
        }
    },
    makeMoodFilter(moods) {
        let moodsHtml = `
            <fieldset>
                <label for="show-all">All</label>
                <input type="radio" name="moodfilter__button" id="show-all" value="0">
            </fieldset>`

        moods.forEach(mood => {
            moodsHtml += `
            <fieldset>
                <label for="mood__${mood.id}">${mood.label}</label>
                <input type="radio" name="moodfilter__button" id="${mood.label}" value="${mood.id}">
            </fieldset>
            `
        })
        return `
        <h2 id="moodfilters__header">Filter by Mood</h2>
        <div id="moodfilters">
            ${moodsHtml}
        </div>
        `
    }
}

export default FACTORY;