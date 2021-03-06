// document elements
const typingArea = document.querySelector('.typing-area');
const wpmTag = document.querySelector('#wpm');
const accTag = document.querySelector('#acc');

// initialise text variables 
let wordCount; // num. of test words
let wordLanguage; // typing test language
let randomWordList = []; // store random list of words
let wordIndex; // track num. of words displayed

// initialise test variables
let userTyping = false; 
let finished = false; 
let charIndex; // track typed chars
let mistakes = 0; 
let timer;
let elapsedTime = 0; // starts when user types

// fetch json data
function getText() {
    fetch(`./languages/${wordLanguage}.json`)
        .then(response => response.json())
        .then(json => {
            randomiseWords(json);
        })
        .catch(err => console.error(err));
}

// randomise fetched words
function randomiseWords(wordList) {
    randomWordList = []; // make sure array is empty
    for (let i = 0; i < wordCount; i++) {
        let randomIndex = Math.floor(Math.random() * wordList.words.length);
        randomWordList.push(wordList.words[randomIndex]);
    }
    displayText(randomWordList);
}

// display fetched text
function displayText(randomWordList) {
    wordIndex = 0; // reset wordIndex
    typingArea.innerHTML = ""; // make sure typing area is empty
    // for each word
    randomWordList.forEach(word => {
        // for each character
        word.split('').forEach(char => {
            let span = document.createElement('span');
            span.innerHTML = char;
            typingArea.appendChild(span);
        });
        wordIndex++; 
            let span = document.createElement('span');
            span.innerHTML = ' ';
            typingArea.appendChild(span);
    });
    let typingAreaSpan = typingArea.querySelectorAll('.typing-area > span');
    typingAreaSpan[0].classList.add('active');
    typingAreaSpan[typingAreaSpan.length - 1].classList.add('finish');
}

function startApplication() {
    document.addEventListener('keydown', backspace);
    document.addEventListener('keypress', keyboard);
}

function resetApplication() {
    clearInterval(timer);
    userTyping = false;
    finished = false;
    elapsedTime = 0;
    wpmTag.innerHTML = 0;
    accTag.innerHTML = 0 + '%';
    charIndex = 0;
    mistakes = 0;
    getText();
    document.getElementById('focus').focus();
}

function keyboard(userInput) {
    let activeChar = typingArea.querySelector('.active').textContent;
    let nextSpan = typingArea.querySelector('.active').nextSibling.classList.value;
    let span = typingArea.querySelectorAll('.typing-area > span');

    if (!userTyping) {
        timer = setInterval(initTimer, 1000);
        userTyping = true;
    }
    if (userInput.key === activeChar) {
        nextSpan === 'finish' ? finished = true : finished = false;
        typingArea.querySelector('.active').classList.add('correct'); // if userInput matches activeChar, result = correct
        typingArea.querySelector('.active').classList.remove('active'); // then remove activeChar's active status
    } else {
        nextSpan === 'finish' ? finished = true : finished = false;
        typingArea.querySelector('.active').classList.add('incorrect'); // otherwise (if userInput doesn't match activeChar), result = incorrect
        typingArea.querySelector('.active').classList.remove('active'); // then remove activeChar's active status
        mistakes++; // increment when a mistake is made
    }
    charIndex++; // increment charIndex
    if (finished !== true) {
        span[charIndex].classList.add('active'); //after correct/incorrect assignment, next char = active
    }

    // calculate & display wpm
    let wpm = Math.floor(((charIndex - mistakes) / 5) / elapsedTime * 60);
    wpm = wpm === Infinity || wpm < 0 || !wpm ? wpm = 0 : wpm;
    wpmTag.innerHTML = wpm;
    // calculate & display acc
    acc = Math.floor(((charIndex - mistakes) / charIndex) * 100);
    accTag.innerHTML = acc + '%';
}

function backspace(userInput) {
    let previousCharValue = typingArea.querySelectorAll('.typing-area > span')[charIndex - 1].classList.value; // store the previous char in variable
    if (userInput.key === 'Backspace' & userInput.key !== ' ' & charIndex !== 0 & finished !== true) {
        if (previousCharValue == 'incorrect') {
            mistakes--; // decrement when a mistake is corrected
        }
        typingArea.querySelectorAll('.typing-area > span')[charIndex].classList.remove('active');  // remove active status of currentChar
        typingArea.querySelectorAll('.typing-area > span')[charIndex - 1].classList.remove('correct', 'incorrect'); // remove correct/incorrect of formerChar
        typingArea.querySelectorAll('.typing-area > span')[charIndex - 1].classList.add('active'); // add active status to formerChar
        charIndex--; // decrement charIndex
   }
}

function initTimer() {
    if (finished !== true) {
        elapsedTime += 1; // every second add 1
        let wpm = Math.floor(((charIndex - mistakes) / 5) / elapsedTime * 60); // calculate wpm
        wpmTag.innerHTML = wpm; // display wpm
    } else {
        clearInterval(timer); 
    }
}

function setWordCount(num) {
    wordCount = num; // num = userinput from onClick event
    document.querySelectorAll('.word-num-selector > button').forEach(e => (e.style.color = 'rgba(0, 0, 0, 0.55)')); // set color:black to all button elements under .word-num-selector
    document.querySelector(`#wc-${num}`).style.color = '#A970FF'; // set active button color:purple
    resetApplication();
}

function setLanguage(language) {
    wordLanguage = language; // langauge = userinput from onClick event
    document.querySelectorAll('.language-selector > button').forEach(e => (e.style.color = 'rgba(0, 0, 0, 0.55)')); // set color:black to all button elements under .language-selector
    document.querySelector(`#l-${language}`).style.color = '#A970FF'; // set active button color:purple
    resetApplication();
}

// initial state
setLanguage('english'); // default language
setWordCount(50); // default value
startApplication(); // start App()