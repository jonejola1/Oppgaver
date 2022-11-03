let disabledBtn = false;
let characterHp;
let bowserHp = 300;
let selectedCharacter;
let charSelected = false;
let choosenChar = '';

function selectCharacter(char, element) {
    selectedCharacter = char;
    charSelected = true;
    choosenChar = `${event.target.src}`;

    console.log(selectedCharacter)
    console.log(charSelected)

    document.getElementById('selectedChar').src = choosenChar;
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
    let useToad = true;

    useToad == true ? setCharHealth() : '';
    setBattleHp()
    console.log(useToad)
}

function bwsHealth() {
    bowserHp = 300;
    setBattleHp()
}

function setBattleHp() {
    document.getElementById('bowserHealthPoints').innerHTML = bowserHp;
    document.getElementById('healthPoints').innerHTML = characterHp;

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
        disabledBtn = true;
    } else if (bowserHp <= 0) {
        document.getElementById('winner').innerHTML = `${selectedCharacter} Won`;
        disabledBtn = true;
    } else {
        document.getElementById('winner').innerHTML = ``;
    }
    changeBtn();
}

function changeBtn() {
    if (characterHp <= 0 && disabledBtn === true || bowserHp <= 0 && disabledBtn === true) {
        document.getElementById('atkPlayer').disabled = true
        document.getElementById('atkBowser').disabled = true
    } else {
        document.getElementById('atkPlayer').disabled = false
        document.getElementById('atkBowser').disabled = false
    }
    console.log(disabledBtn)
}