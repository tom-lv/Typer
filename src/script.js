let wordCount = 50;

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
    let typingArea = document.querySelector(".typing-area p")
    typingArea.innerHTML = ""; //make area is sure empty
    for (let i = 0; i < wordCount; i++) {
        typingArea.innerHTML += data.words[i] + " ";
    }
}

function setWordCount(value) {
    wordCount = value;
    getText();
}

getText();