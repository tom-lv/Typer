const typingArea = document.querySelector('.typing-area');

// Initialise dynamic variables
let wordCount; // num. of words typing test words
let wordLanguage; // typing test language
let randomWordList = []; // store random list of words
let iteration; // keep track of loop iterations
let charIndex = 0; // keep track of chars

// fetch json data
function getText() {
    fetch('./english.json')
        .then(response => response.json())
        .then(json => {
            randomiseWords(json);
        })
        .catch(err => console.error(err));
}

// display fetched text
function displayText(data) {
    iteration = 0; // reset iteration
    typingArea.innerHTML = ""; // make sure typing area is empty
    // for each word
    data.forEach(word => {
        // for each character
        word.split('').forEach(char => {
            let span = document.createElement('span');
            span.innerHTML = char;
            typingArea.appendChild(span);
        });
        iteration++;
        // include space after each word expect last
        if (iteration != wordCount) {
            let span = document.createElement('span');
            span.innerHTML = ' ';
            typingArea.appendChild(span);
        }
    });
    // set first span char as 'active'
    typingArea.querySelectorAll('.typing-area > span')[0].classList.add('active');
}

// randomise fetched words
function randomiseWords(data) {
    randomWordList = []; // make sure array is empty
    for (let i = 0; i < wordCount; i++) {
        let randomIndex = Math.floor(Math.random() * data.words.length);
        randomWordList.push(data.words[randomIndex]);
    }
    displayText(randomWordList);
}

function startApplication() {
    document.addEventListener('keydown', backspace);
    document.addEventListener('keypress', keyboard);
}

function setWordCount(value) {
    wordCount = value;
    // set color:black to all button elements under .word-num-selector
    document.querySelectorAll('.word-num-selector > button').forEach(e => (e.style.color = 'black'));
    // set active button color:purple
    document.querySelector(`#wc-${value}`).style.color = '#9256ED';
    charIndex = 0; // reset charIndex
    getText(); // update text
}

function setLanguage(language) {
    wordLanguage = language;
    // set color:black to all button elements under .language-selector
    document.querySelectorAll('.language-selector > button').forEach(e => (e.style.color = 'black'));
    // set active button color:purple
    document.querySelector(`#l-${language}`).style.color = '#9256ED';
    // change language
}

function resetApplication() {
    setWordCount(wordCount);
    charIndex = 0; // reset charIndex
}

function keyboard(input) {
    let activeChar = typingArea.querySelector('.active').textContent;
    if (input.key === activeChar) {
        typingArea.querySelector('.active').classList.add('correct'); // if input key matches activeChar, result = correct
        typingArea.querySelector('.active').classList.remove('active'); // then remove activeChar's active status
    } else {
        typingArea.querySelector('.active').classList.add('incorrect'); // otherwise (if input key doesn't match activeChar), result = incorrect
        typingArea.querySelector('.active').classList.remove('active'); // then remove activeChar's active status
    }
    charIndex++; // increment charIndex
    typingArea.querySelectorAll('.typing-area > span')[charIndex].classList.add('active'); //after correct/incorrect assignment, next char = active
}

function backspace(input) {
    if (input.key === 'Backspace' & input.key !== ' ' & charIndex !== 0) {
        typingArea.querySelectorAll('.typing-area > span')[charIndex].classList.remove('active');  // remove active status of currentChar
        typingArea.querySelectorAll('.typing-area > span')[charIndex - 1].classList.remove('correct', 'incorrect'); // remove correct/incorrect of formerChar
        typingArea.querySelectorAll('.typing-area > span')[charIndex - 1].classList.add('active'); // add active status to formerChar
        charIndex--; // decrement charIndex
   }
}

// Initial state
setLanguage("en"); // default language
setWordCount(50); // default value
startApplication(); // start App()