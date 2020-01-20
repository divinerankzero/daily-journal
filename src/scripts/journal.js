/*
    Define the keys and value for a JavaScript object that
    represents a journal entry about what you learned today
*/

const journalEntryBlank = {
    entryNum: 0,
    date: "",
    conceptsCovered: "",
    content: "",
    mood: ""
    }

const journalEntries = [
    {
        entryNum: 0,
        date: "1/17/2020",
        conceptsCovered: "JavaScript: Functions",
        content: `
        JavaScript functions topics:
        * what functions are and are not
        * difference between Pure and Impure functions. 
        * when to use functions
        * DRY programming
        * Arrow functions
        Practice Exercises:
        * ChickenMonkey: a FizzBang-like test function
        * Battle of the Bands: writing a function that assigns a number to each band name)
        * Cookout: writing a function that "cooks" an array of ingredients, and places them in a cooked array) 
        * Overly Excited: writing a function that outputs a row of words, adding one word per row. Future additions to the exercise added punctuation (repeated x times) of the user's choice every y words. 
        `,
        mood: "Good"
    },
    {
        entryNum: 1,
        date: "1/17/2020",
        conceptsCovered: "JavaScript: Objects",
        content: `
        JavaScript Objects topics:
        * what objects are and are not
        * how they differ from arrays
        * where they can be used (objects inside objects, arrays inside objects, etc.)
        * Object States, This (introduction), "Now", and changing Object states
        * Object Methods
        Practice Exercises:
        * Pet Practice: creating a pet object with several key:value pairs, behavior methods
        * Fast Food Ordering: creating a restaurant object with methods that take, receive and display order objects
        * Political Campaign (optional Challenge): creating a large, complex object representing a political campaign candidate's information (including nested volunteer info) 
        `,
        mood: "Good"
    },
    {
        entryNum: 2,
        date: "1/16/2020",
        conceptsCovered: "JavaScript: DOM",
        content: 
        `
        JavaScript DOM topics:
        * querySelector() to select single elements
        * querySelectorAll() and iterating over query results to make changes to multiple elements at once
        Exercises: 
        * Selecting elements by class and changing textContent
        * adding classes
        * removing classes  
        `,
        mood: ""
    }
];

console.table(journalEntries);

/*
    Purpose: To create, and return, a string template that
    represents a single journal entry object as HTML

    Arguments: journalEntry (object)
*/
const makeJournalEntryComponent = (entry) => {
    return `
        <article>
            <h2>${entry.conceptsCovered}</h2>
            <div class="row-forms">
                <h3>Date: ${entry.date}</h3>
                <h3>Mood: ${entry.mood}</h3>
            </div>
            <aside>
                ${entry.content}
            </aside>
        </article>

  
        `
}

const journalDiv = document.querySelector(".div__entries");

for (let i = 0; i < journalEntries.length; i++) {
    journalDiv.innerHTML += makeJournalEntryComponent(journalEntries[i]);
}
