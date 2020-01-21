const journalEntryBlank = {
    entryNum: 0,
    date: "",
    conceptsCovered: "",
    content: "",
    mood: ""
    }

const makeList = (...args) => {
    let list = `<ul>`
    for (let i = 0; i < args.length; i++) {
        list += `<li>${args[i]}</li>`;
    }
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
                ${entry.content}
            </aside>
        </article>

  
        `
}

const journalDiv = document.querySelector(".wrapper");

for (let i = 0; i < journalEntries.length; i++) {
    journalDiv.innerHTML += makeJournalEntryComponent(journalEntries[i]);
}
