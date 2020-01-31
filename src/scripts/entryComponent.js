// All HTML Building Components Go Here
const FACTORY = {
    makeJournalEntry (entry) {
        return `
            <article>
                <h2>${entry.conceptsCovered}</h2>
                <div>
                    <h3>Date: ${entry.date}</h3>
                    <h3>Mood: ${entry.mood}</h3>
                </div>
                <aside>
                    <h3>Content Covered:</h3>
                    ${this.makeList(entry.content)}
                </aside>
            </article>
            `
    },
    makeList (ary) {
        let list = `<ul>`;
        ary.forEach(entry => {
            list += `<li>${entry}</li>`;
        })
        list += `</ul>`;
        return list;
    }
}

export default FACTORY;