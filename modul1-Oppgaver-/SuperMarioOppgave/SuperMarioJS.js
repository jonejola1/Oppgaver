let choosenPicture = document.getElementById('selectedChar')
let disabledBtn = false;
let characterHp;
let bowserHp = 300;
let selectedCharacter;
let charSelected = false;
let choosenChar = '';
let toadUses = false;
let bwShroom = false;

function selectCharacter(char, element) {
    selectedCharacter = char;
    charSelected = true;
    choosenChar = `${event.target.src}`;

    console.log(selectedCharacter)
    console.log(charSelected)

    choosenPicture.src = choosenChar;
    setCharHealth();
    setBattleHp()
}

function setCharHealth() {
    if (selectedCharacter == 'mario') {
        characterHp = 200;
    }

    if (selectedCharacter == 'luigi') {
        characterHp = 140;
    }

    if (selectedCharacter == 'peach') {
        characterHp = 100;
    }

    if (selectedCharacter == 'yoshi') {
        characterHp = 80;
    }

    console.log(characterHp);
}

function toadHealth() {
    if (toadUses) { return }
    toadUses = !toadUses
    setCharHealth()
    setBattleHp()
}

function bwsHealth() {
    if (bwShroom) { return }
    bwShroom = !bwShroom;
    bowserHp = 300;
    setBattleHp()
}

function setBattleHp() {
    document.getElementById('healthPoints').innerHTML = characterHp;
    document.getElementById('bowserHealthPoints').innerHTML = bowserHp;

    showWinner()
}

function attackChar(attacker) {
    if (attacker == 'player') {
        if (charSelected != true) { return }
        if (bowserHp != 0) {
            bowserHp -= 25
        }
    } else if (attacker == 'bowser') {
        if (charSelected != true) { return }
        if (characterHp != 0) {
            characterHp -= 50
        }
    }
    setBattleHp()
}

function showWinner() {
    if (characterHp <= 0) {
        document.getElementById('winner').innerHTML = `${selectedCharacter} lost`;
    } else if (bowserHp <= 0) {
        document.getElementById('winner').innerHTML = `${selectedCharacter} Won`;
    } else {
        document.getElementById('winner').innerHTML = ``;
    }
    changeBtn()
}

function changeBtn() {
    if (characterHp <= 0 || bowserHp <= 0) {
        atkPlayer.disabled = true
        atkBowser.disabled = true
    } else {
        atkPlayer.disabled = false
        atkBowser.disabled = false
    }
}