var wordArray = [], ended = false, counter, riddle;

function addWord() {
    var currentWord = $('#word').val();
    if (currentWord != "") {
        var found = searchWord(currentWord.toUpperCase());
        if (!found) {
            wordArray.push(currentWord.toUpperCase());
            alert("Added");
        } else {
        alert("Word is in dictionary");
        }
    } else {
        alert("No word!");
    }
    
}

function searchWord(word) {
    var left = 0, right = wordArray.length - 1;
    var found = false;
    while(left != right) {
        let middle = (left + right) / 2;
        if (word > wordArray[middle]) {
            left = middle + 1;
        } else {
            right = middle;
        }
    }
    if (wordArray[left] == word) {
        found = true;
    } 
    return found;
}

function startGame() {
    var size = wordArray.length;
    if (size == 0) {
        alert("No words in dictionary")
    } else {
        $("#typed").text("");
        var position = Math.floor(Math.random() * size);
        riddle = wordArray[position];//get random word from dictionary
        var reg = /./g;
        var secret = riddle.replace(reg, "_");//replace all letters with "_"
        $("#hiddenWord").text(secret);
        document.getElementById("gameContent").hidden = false;
        ended = false;//is used to know the game has ended
        counter = 0;//counts the number of guesses
        $("#start").text("Restart Game");
    }
}

function checkLetter() {
    if (!ended) {
        let letter = $('#letter').val().toUpperCase();
        if (letter != "") {
            let positions = [];
            let size = riddle.length;
            for (let i = 0; i < size; i++) {
                if (riddle[i] == letter) {
                    positions.push(i);
                }
            }
            if (positions.length == 0) {//no guessed letters
                counter++;
            }
            $("#typed").append(" " + letter + ",");//add letter to typed letters list
            $('#letter').val("");
            var filled = fillInWord(letter, positions);
            $("#hiddenWord").text(filled);//update the word with the guessed letters
            if (filled == riddle) {
                ended = true;
                alert("You won!!!")
                return;
            } 
            if (counter == 10) {
                ended = true;
                alert("You failed! You are mine!!!"); 
            }
        } else {
            alert("Enter a letter!");
        }
    }
}

function fillInWord(letter, positions) {
    let filled = $("#hiddenWord").text();
    let chars = [];//used for separating the string into an array of char
    for (let i = 0; i < filled.length; i++) {
        let found = false;
        for (let j = 0; j < positions.length; j++) {
            if (i == positions[j]) {
                found = true;
                break;
            }
        }
        if (found) {
            chars.push(letter);
        } else {
            chars.push(filled[i]);
        }
    }
    filled = "";
    for (let i = 0; i < chars.length; i++) {
        filled += chars[i];//recompose the string from the chars
    }
    return filled;
}