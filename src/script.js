const typingArea = document.querySelector('.typing-area');

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
    // loop for each word and character
    data.forEach(word => {
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
    document.addEventListener('keypress', e => {
        console.log(e.key);
        console.log(typingArea.querySelector('.active').textContent);
        let activeChar = typingArea.querySelector('.active').textContent;
        if (e.key === activeChar) {
            document.querySelector('.active').classList.add('correct');
            document.querySelector('.active').classList.remove('active');
            charIndex++;
            console.log(charIndex);
        } else {
            document.querySelector('.active').classList.add('incorrect');
            document.querySelector('.active').classList.remove('active');
            charIndex++;
        }
        typingArea.querySelectorAll('.typing-area > span')[charIndex].classList.add('active');
    });
}

function setWordCount(value) {
    wordCount = value;
    // set color:black all button elements under .word-num-selector
    document.querySelectorAll('.word-num-selector > button').forEach(e => (e.style.color = 'black'));
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

function resetApplication() {
    setWordCount(wordCount);
    charIndex = 0;
}

// Initial state
setLanguage("en"); // default language
setWordCount(50); // default value
startApplication();
