let wordNum; // num. of words typing test words
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
    for (let i = 0; i < wordNum; i++) {
        typingArea.innerHTML += data.words[i] + " ";
    }
}

function setWordNum(value) {
    wordNum = value;
    // set color:black all button elements under .word-num-selector
    document.querySelectorAll('.word-num-selector > button').forEach(e => (e.style.color = 'black'));
    // set active button color:purple
    document.querySelector(`#wn-${value}`).style.color = '#9256ED';
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
setWordNum(50); // default value
getText(); // display text