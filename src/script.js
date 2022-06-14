const typingArea = document.querySelector('.typing-area');

let wordNum; // num. of words typing test words
let wordLanguage; // typing test language
let randomWordList = []; // store random list of words
let iteration; // keep track of loop iterations

// fetch json data
function getText() {
    fetch('./english.json')
        .then(response => response.json())
        .then(json => {
            randomiseWords(json);
        })
        .catch(err => console.error(err));
}

// displayed fetched text
function displayText(data) {
    iteration = 0; // reset iteration
    typingArea.innerHTML = ""; // make sure typing area is empty
    // loop for each word and character
    data.forEach(word => {
        word.split('').forEach(char => {
            let span = document.createElement('span');
            span.innerHTML = char;
            typingArea.appendChild(span);
        });
        iteration++;
        // include space after each word expect last
        if (iteration != wordNum) {
            let span = document.createElement('span');
            span.innerHTML = ' ';
            typingArea.appendChild(span);
        }
    });
}

// randomise fetched words
function randomiseWords(data) {
    randomWordList = []; // make sure array is empty
    for (let i = 0; i < wordNum; i++) {
        let randomIndex = Math.floor(Math.random() * data.words.length);
        randomWordList.push(data.words[randomIndex]);
    }
    displayText(randomWordList);
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

function resetApplication() {
    setWordNum(wordNum);
}

// Initial state
setLanguage("en"); // default language
setWordNum(100); // default value
