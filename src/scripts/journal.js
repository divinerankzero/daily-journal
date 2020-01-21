const makeList = (ary) => {
    let list = `<ul>`;
    ary.forEach(entry => {
        list += `<li>${entry}</li>`;
    })
    list += `</ul>`;
    return list;
}

const makeJournalEntryComponent = (entry) => {
    return `
        <article>
            <h2>${entry.conceptsCovered}</h2>
            <div>
                <h3>Date: ${entry.date}</h3>
                <h3>Mood: ${entry.mood}</h3>
            </div>
            <aside>
                <h3>Content Covered:</h3>
                ${makeList(entry.content)}
            </aside>
        </article>
        `
}

const journalDiv = document.querySelector(".wrapper");
const journalURL = "http://localhost:3000/entries"

fetch(journalURL)
    .then(entries => entries.json())
    .then(parsedEntries => {
        parsedEntries.forEach(entry => {
            let entryHTML = makeJournalEntryComponent(entry);
            journalDiv.innerHTML += entryHTML;
        });
    })