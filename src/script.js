let wordCount; // num. of words typing test words
let wordLanguage;

// fetch json data
function getText() {
    fetch('./english.json')
        .then(response => response.json())
        .then(json => {
            //pass json file to displayText()
            displayText(json);
        })
        .catch(err => console.error(err));
}

// displayed fetched text
function displayText(data) {
    const typingArea = document.querySelector('.typing-area p');
    typingArea.innerHTML = ""; //make sure area is empty
    for (let i = 0; i < wordCount; i++) {
        typingArea.innerHTML += data.words[i] + " ";
    }
}

function setWordCount(value) {
    wordCount = value;
    // set color:black all button elements under .word-count-selector
    document.querySelectorAll('.word-count-selector > button').forEach(e => (e.style.color = 'black'));
    // set active button color:purple
    document.querySelector(`#wc-${value}`).style.color = '#9256ED';
    getText(); // update text
}

function setLanguage(language) {
    wordLanguage = language;
    // set color:black all button elements under .language-selector
    document.querySelectorAll('.language-selector > button').forEach(e => (e.style.color = 'black'));
    // set active button color:purple
    document.querySelector(`#l-${language}`).style.color = '#9256ED';
    // change language
}

setLanguage("en");
setWordCount(50); // default value
getText(); // display text