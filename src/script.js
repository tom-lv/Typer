const typingArea = document.querySelector('.typing-area');

// initialise dynamic variables 
let wordCount; // num. of test words
let wordLanguage; // typing test language
let randomWordList = []; // store random list of words

let charIndex; // track typed chars
let wordIndex; // track num. of words displayed
let mistake = 0; // track num. of mistakes

let userTyping = false;
let timer;
let elapsedTime = 0;

// fetch json data
function getText() {
    fetch('./english.json')
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
        // include space after each word except last
        if (wordIndex !== wordCount) {
            let span = document.createElement('span');
            span.innerHTML = ' ';
            typingArea.appendChild(span);
        }
    });
    typingArea.querySelectorAll('.typing-area > span')[0].classList.add('active'); // set first span char as 'active'
}

function startApplication() {
    document.addEventListener('keydown', backspace);
    document.addEventListener('keypress', keyboard);
}

function resetApplication() {
    clearInterval(timer);
    userTyping = false;
    elapsedTime = 0;
    charIndex = 0;
    getText();
}


function keyboard(userInput) {
    // when charIndex > 0 (this is a good way to track when the test has started)
    let activeChar = typingArea.querySelector('.active').textContent;

    if (!userTyping) {
        timer = setInterval(initTimer, 1000);
        userTyping = true;
    }

    if (userInput.key === activeChar) {
        typingArea.querySelector('.active').classList.add('correct'); // if userInput matches activeChar, result = correct
        typingArea.querySelector('.active').classList.remove('active'); // then remove activeChar's active status
    } else {
        typingArea.querySelector('.active').classList.add('incorrect'); // otherwise (if userInput doesn't match activeChar), result = incorrect
        typingArea.querySelector('.active').classList.remove('active'); // then remove activeChar's active status
        mistake++; // increment when a mistake is made
    }
    charIndex++; // increment charIndex
    typingArea.querySelectorAll('.typing-area > span')[charIndex].classList.add('active'); //after correct/incorrect assignment, next char = active
    // need to calculate wpm, cpm and acc
    
}

function initTimer() {
    elapsedTime += 1;
    console.log(elapsedTime);
}

function backspace(userInput) {
    let previousCharValue = typingArea.querySelectorAll('.typing-area > span')[charIndex - 1].classList.value;
    if (userInput.key === 'Backspace' & userInput.key !== ' ' & charIndex !== 0) {
        if (previousCharValue == 'incorrect') {
            mistake--; // decrement when a mistake is corrected
        }
        typingArea.querySelectorAll('.typing-area > span')[charIndex].classList.remove('active');  // remove active status of currentChar
        typingArea.querySelectorAll('.typing-area > span')[charIndex - 1].classList.remove('correct', 'incorrect'); // remove correct/incorrect of formerChar
        typingArea.querySelectorAll('.typing-area > span')[charIndex - 1].classList.add('active'); // add active status to formerChar
        charIndex--; // decrement charIndex
   }
}

function setWordCount(num) {
    wordCount = num; // num = userinput from onClick event
    document.querySelectorAll('.word-num-selector > button').forEach(e => (e.style.color = 'black')); // set color:black to all button elements under .word-num-selector
    document.querySelector(`#wc-${num}`).style.color = '#9256ED'; // set active button color:purple
    resetApplication();
}

function setLanguage(language) {
    wordLanguage = language; // langauge = userinput from onClick event
    document.querySelectorAll('.language-selector > button').forEach(e => (e.style.color = 'black')); // set color:black to all button elements under .language-selector
    document.querySelector(`#l-${language}`).style.color = '#9256ED'; // set active button color:purple
    resetApplication();
}

// initial state
setLanguage("en"); // default language
setWordCount(50); // default value
startApplication(); // start App()