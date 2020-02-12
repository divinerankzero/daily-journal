import curseList from './curseList.js'

const formValidation = {
    saveForm: {
        allValidations (entryObject) {
            if (
                this.requiredFields(entryObject)
                && this.inputValidation(entryObject)
                && this.curseFree(entryObject)
                && this.underMaxCharacters(entryObject)) {
                    return true
            } else if (!this.requiredFields(entryObject)) {
                alert("Please fill in all required fields");
                return false;
            } else if (!this.inputValidation(entryObject)) {
                alert("Restricted characters used");
                return false;
            } else if (!this.curseFree(entryObject)) {
                alert("Restricted phrasing used");
                return false;
            } else if (!this.underMaxCharacters(entryObject)) {
                alert(`Concepts covered entry over max characters (${validation.maxChars})`);
                return false;
            }
        },
        maxChars: 100,
        requiredFields (entryObject) {
          if (entryObject.date && 
                entryObject.language && 
                entryObject.moodId && 
                entryObject.instructorId &&
                entryObject.conceptsCovered &&
                entryObject.content.length > 0 && 
                entryObject.exercises.length > 0) {
                    return true
            }
            else {return false}
        },
        inputValidation (entryObject) {
           // http://melteampot.blogspot.com/2016/08/check-if-string-contains-only-letters.html
           let acceptedChars = /^[A-Za-z0-9,\.{}:;\(\)!? ]+$/;

           // If a string passes the test, it's good
           // In the case of arrays, it passes the test if its length is the same
           // whether or not it is filtered by the accepted chars
            if (acceptedChars.test(entryObject.conceptsCovered) && 
                entryObject.content.filter(content => acceptedChars.test(content)).length === entryObject.content.length &&
                entryObject.exercises.filter(content => acceptedChars.test(content)).length === entryObject.exercises.length 
            ) {return true}
            else {return false}
        },
        curseFree (entryObject) {
            // If a string passes the test (contains a swear), we return false (it is not "curse free")
            // Or, if any string is filtered out of an array with a curse, then it is also false
            if (curseList.test(entryObject.conceptsCovered) || 
                entryObject.content.filter(content => curseList.test(content)).length > 0 ||
                entryObject.exercises.filter(content => curseList.test(content)).length > 0 
            ) {return false}
            else {return true}
        },
        underMaxCharacters (entryObject) {
            if (entryObject.conceptsCovered.length < this.maxChars) {
                return true
            } else {return false}
        }
    }
}

export default formValidation