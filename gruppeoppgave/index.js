// før Objects er det let
let player = {
    name: "Kid named finger",
    chips: 400
    // sayHello: function () { // er en Method altså funksjon, i likhet med document.getElementById() for eksempel
    //     console.log("Heisann!")
    // }
}


// player.sayHello() for invoking the function inside the Object
const container = document.getElementById("container")

//Variables
let player_name = player.name + ": $" + player.chips // HUSK + " $" før player.chips 
let messageEl = "Want to play a round?";

let loses = []
let cards = [] // Array - ordered list to store items
let dealerCards = []

let hasBlackJack = false
let isAlive = true
let stand = false

let dealerHasBlackJack = false
let dealerIsAlive = true
let dealerStands = false


let sum;
let dealerSum;
let message = "";
let sumEl = "";
let cardsEl = ""; 
let dealerCardsEl = "";
let dealerSumEl = "";

let round;
let dealerRound;
let counter = 1
let dealerInterval;

let moneybet = "";
let betValue = "";
let bet = ""
let refund = 0
let placedBet = false;
let gameBegun = false;

let Gus = false;
let borrowed = false
let borrowedMoney;
let borrowTime;
let interestRate = 1.5

let Mike = false;
let MikeDialogue = "Hey, you're out of time, if you can't pay well... then i'm sorry it had to come to this. Its nothing personal"
let MikeAnswer = "Wait.. no.. please..."
let gameOver = false

let Saul = false
let cLoopHole = false
let lostOnce = false
let SaulDialogue = "Hey, i'm Saul Goodman. Did you know that you have rights?" 
let SaulHasEquity = false
let lastResort = false
let SmoothedOver = false

let Desc = ""
let ExploitDesc = "Exploit loopholes in the casino's private policy so the next bust will count as a win for you."
let SueDesc = "Sue the casino for alleged misconduct and return a random loss you have suffered at the casino."
let CharmDesc = "Saul will buy you a few more rounds to pay off the loan and talk them down that ridiculous interest rate from between 10% to 40%."
let DealDesc = "Saul will take 25% of all your future winnings until you repay him 1000$"
let PayBackDesc = "Saul will no longer take 25% of your winnings."






//§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§






show()
function show(){
    let html = ""
    let GusDialogue1 = /*HTML*/`
    <p>Good day. Have you come to repay your debt?</p>
    <button onclick="showGus(false)">Ill have it soon</button>
    <button onclick="payBackMoney()">Repay money ${Math.floor(borrowedMoney * interestRate)}$</button>
    `

    let GusDialogue2 = `
    <p>Good day. Are you in need of my services? The interest rate is 50%</p>
    <div class="loan_options">
        <button onclick="showGus(false)">Goodbye</button>
        <button onclick="borrowMoney(100)">borrow 100$</button>
        <button onclick="borrowMoney(500)">borrow 500$</button>
        <button onclick="borrowMoney(1000)">borrow 1000$</button>
    </div>`

    html = /*HTML*/`
    <h1>Blackjack</h1>
    <p>${messageEl}</p>
    <p>Dealer's cards: ${dealerCardsEl}</p>
    <p>${dealerSumEl}</p>
    <p>Your Cards: ${cardsEl}</p>
    <p>${sumEl}</p>
    <button ${placedBet == false ? "disabled style='opacity: 50%;'" : ""} onclick="startGame()">New Game</button>
    <button ${gameBegun == false ? "disabled style='display: none;'" : ""} onclick="newCard()">Hit Me</button>
    <button ${gameBegun == false ? "disabled style='display: none;'" : ""} onclick="Stand()">Stand</button>
    <p>${player_name}</p>
    <p>${bet}</p>
    <button ${gameBegun == true ? "disabled style='display: none;'" : ""} onclick="addBet()">Bet</button>
    <input ${gameBegun == true ? "disabled style='display: none;'" : ""} oninput="betValue = this.value" type="number" name="betValue"> 
    <button ${gameBegun == true ? "disabled style='display: none;'" : ""} onclick="showGus(true)">Loan Shark</button>
    <button ${gameBegun == true ? "disabled style='display: none;'" : ""} onclick="Saul = true; show()">Call Saul</button>
    <div ${Gus == true ? "" : 'style="display: none;"'} class="loanShark">
        <img src="./images/GusFringe.jpg" alt="">
        ${borrowed == true? GusDialogue1 : GusDialogue2}
    </div>
    <div ${Mike == true ? "" : 'style="display: none;"'} class="Mike">
        <img src="./images/Mike.jpg" alt="">
        <p>${MikeDialogue}</p>
        <button onclick="gameOver = true; show()">Wait.. no.. please</button>
        <button ${player.chips - Math.floor(borrowedMoney * interestRate) < 0? "disabled style='opacity: 50%;'" : ""} onclick="payBackMoney()">Wait.. i..i have the money</button>
        <button ${lastResort == false? "disabled style='opacity: 50%;'" : ""} onclick="Saul = true; show()">Call Saul</button>
    </div>
    <div ${Saul == true ? "" : 'style="display: none;"'} class="Saul">
        <img class="Saul-img" src="./images/Saul.jpg" alt="">
        <p class="SaulDialogue">${SaulDialogue}</p>
        <p style="font-size: medium;">${Desc}</p>
        <button ${lastResort == true?  "disabled style='display: none;'" : ""} onclick="Saul = false; show()">Goodbye</button>
        <button ${lastResort == true?  "disabled style='display: none;'" : ""} ${cLoopHole == true? "disabled style='opacity: 50%;'" : ""} onclick="callSaul('loophole', 150)">
        Exploit casino policy loopholes: 150$ <div class="desc">${ExploitDesc}</div></button>
        <button  ${lastResort == true?  "disabled style='display: none;'" : ""} ${lostOnce == false? "disabled style='opacity: 50%;'" : ""} onclick="callSaul('sue', 300)">
        Sue the casino: 300$ <div class="desc">${SueDesc}</div></button>
        <button  ${lastResort == true?  "disabled style='display: none;'" : ""} ${borrowed == false || SmoothedOver == true? "disabled style='opacity: 50%;'" : ""} onclick="callSaul('extend', 200)">
        Smooth talking charmer: 200$ <div class="desc">${CharmDesc}</div></button>
        <button  ${SaulHasEquity == false? "style='display: none;'" : ""} ${lastResort == true?  "disabled style='display: none;'" : ""} onclick="callSaul('pay-back', 1000)">
        Pay Saul back: 1000$ <div class="desc">${PayBackDesc}</div></button>
        <button  ${lastResort == false?  "disabled style='display: none;'" : ""} onclick="Saul = false; lastResort = false; show()">Refuse Deal</button>
        <button ${SaulHasEquity == true?  "disabled style='display: none;'" : ""} ${lastResort == false?  "disabled style='display: none;'" : ""} onclick="callSaul('bailout', 0)">Take Deal <div class="desc">${DealDesc}</div></button>
    </div>
    ${gameOver == true? '<div class="game_over">Your body was never found</div>' : ""}
    
    ${borrowed == true ? '<p class="loan_timer">rounds to repay loan: ' + borrowTime + ' </p>' : ""}
    `            

    container.innerHTML = html
}






//§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§






//Functions
function callSaul(service, payment){

    if(player.chips - payment < 0){return}
    
    if(service == "loophole"){cLoopHole = true}
    if(service == "sue"){
        console.log(loses.length)
        let num = randomNum(0, loses.length -1) 
        player.chips += loses[num]
        loses.splice(num, 1)
    }
    if(service == "extend"){
        borrowTime += 3
        let num = randomNum(1, 4)
        let StrInterestRate = "1." + num
        interestRate = StrInterestRate
        SmoothedOver = true}
    if(service == "bailout"){
        SaulDialogue = "Hey, i'm Saul Goodman. Did you know that you have rights?" 
        SaulHasEquity = true
        Mike = false
        borrowed = false
        lastResort = false
    }
    if (service == "pay-back"){
        SaulHasEquity = false
        player.chips -= payment
    }

    player.chips -= payment
    player_name = player.name + ": $" + player.chips
    Saul = false
    show()

    

}

function payBackMoney(){
    if(player.chips - Math.floor(borrowedMoney * interestRate) < 0){
        console.log("cant afford")
        return
    }

    player.chips -= Math.floor(borrowedMoney * interestRate)
    player_name = player.name + ": $" + player.chips
    borrowed = false
    Gus = false
    Mike = false
    Saul = false
    lastResort = false
    SmoothedOver = false
    show()
}

function showGus(bool){
    Gus = bool
    show()
}

function borrowMoney(value){
    player.chips += value
    player_name = player.name + ": $" + player.chips
    borrowedMoney = value
    borrowed = true
    borrowTime = 5
    Gus = false
    show()
}


function checkWinner(){
    console.log("checkWinner started")
    
    if((dealerIsAlive) && (!isAlive || sum < dealerSum || !hasBlackJack && dealerHasBlackJack)){
        messageEl = "Dealer Won"
        loses.push(refund)
        lostOnce = true
        }

    else if ((isAlive) && (!dealerIsAlive || sum > dealerSum || hasBlackJack && !dealerHasBlackJack)){
        messageEl = player.name + " Won"
        
        if(hasBlackJack){
            console.log("player got blackjack")
            if(SaulHasEquity){
                player.chips += Math.floor((refund * 2.5) - (refund * 0.3125))
                messageEl = "BlackJack!"}
            else{
                player.chips += Math.floor(refund * 2.5)
                messageEl = "BlackJack!"
            }}

        else {
            console.log("player won")
            if(SaulHasEquity){player.chips += Math.floor((refund * 2) - (refund * 0.25))}
            else{player.chips += refund * 2}}
            
        
    }

    else{
        if(cLoopHole){
            if(SaulHasEquity){player.chips += Math.floor((refund * 2) - (refund * 0.25))}
            else {player.chips += refund * 2}
            
            messageEl = player.name + " Won (with loophole)"
            player.chips += refund * 2
            cLoopHole = false

            }

        else{messageEl = "Push"
            
            player.chips += refund
            }}

    
    console.log("gamebegun true")
    gameBegun = false
    console.log("gamebegun " + gameBegun)
    
    bet = ""
    refund = 0
    
    player_name = player.name + ": $" + player.chips
    borrowTime--

    if(borrowTime == 0 && borrowed == true){
        SaulDialogue = `Hey, seems you've found yourself in quite the pickle. But dont worry, your old buddy Saul has got your back.
                         I can buy equity in your let's say "money making procedures" to pay off that debt. Call it an investment on my part and you get to walk, sounds like a win win to me.`
        lastResort = true
        Mike = true}

    else if(player.chips == 0 && borrowed == true){
        MikeDialogue = "Hey, seems you couldnt make due on your debt, sorry it had to come to this. Its nothing personal"
        Mike = true}

    show()
}


function startGame() {
    gameBegun = true
    placedBet = false
    hasBlackJack = false
    isAlive = true
    stand = false
    
    dealerHasBlackJack = false
    dealerIsAlive = true
    dealerStands = false

    dealerSumEl = ""
    dealerRound = 1
    round = 1
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    let firstDealerCard = getRandomCard()
    let secondDealerCard = getRandomCard()
    cards = [firstCard, secondCard]
    dealerCards = [firstDealerCard, secondDealerCard]
    sum = firstCard + secondCard
    dealerSum = firstDealerCard + secondDealerCard
    isAlive = true
    hasBlackJack = false
    stand = false
    renderGame()
}

function renderGame() {
    // render out cards
    
    

    playerTurn()
    dealerTurn()

    messageEl = message
    sumEl = "Your Sum: " + sum
    
    round++
    show()
}

function playerTurn(){
    //       START       FINISH       STEP SIZE
    if(stand == true){return}

    cardsEl = ""

    for (i = 0; i < cards.length; i++) {
        if(cards[i] == 1 && sum <= 11){
            cards[i] = 11
            sum += 10
            cardsEl += cards[i] + " "}
        else if(cards[i] == 11 && sum > 11){
            cards[i] = 1
            sum -= 10
            cardsEl += cards[i] + " "}

        else{cardsEl += cards[i] + " "}}
    
    if (sum <= 20) {
        message = "What will you do?"
    } 
    
    else if (sum === 21) {
        if(round == 1) {
            message = "Blackjack!"
            hasBlackJack = true
            stand = true
            }
        else {
            message = "Dealers turn"
            stand = true
        }
    } 
    
    else { 
        message = "Bust"
        
        isAlive = false
        checkWinner()
    }
}

function dealerTurn(){
    dealerCardsEl = ""
    if (stand==false){
        if(dealerCards[1] == 1){dealerCardsEl = "? " + "A"
        return
    }
    else{dealerCardsEl = "? " + dealerCards[1]
        return}}
    message = "Dealer's turn"
    for (i = 0; i < dealerCards.length; i++) {
        if(dealerCards[i] == 1 && dealerSum <= 11){

            dealerCards[i] = 11
            dealerSum += 10
            dealerCardsEl += dealerCards[i] + " "}

        else if(dealerCards[i] == 11 && dealerSum > 11){
            dealerCards[i] = 1
            dealerSum -= 10
            dealerCardsEl += dealerCards[i] + " "}

        else{dealerCardsEl += dealerCards[i] + " "}}
   
    if (dealerSum <= 20) {
        if(dealerSum >= 17){dealerStands = true}
        
    } 
    else if (dealerSum === 21) {// if sum is exactly 21 output below
        if(dealerRound == 1) {
            message = "Blackjack"
            dealerHasBlackJack = true}
        else {
            dealerStands = true
        }
    } else { // if none above hits, output below
        message = "Dealer Busts"
        dealerIsAlive = false
    }
    dealerSumEl = "Dealer Sum: " + dealerSum
    if(dealerRound == 1) {
        dealerInterval = setInterval(dealerNewCard, 1000)}
    dealerRound++
}


// legg inn content av function inn i if setningen
function newCard() {
    if (isAlive === true && hasBlackJack === false && stand == false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        console.log(card)
        renderGame()
    }}

function dealerNewCard(){
    if (dealerIsAlive == true && dealerHasBlackJack === false && dealerStands == false) {
        let card2 = getRandomCard()
        if(card2 == 1 && dealerSum<11){card2 = 11}
        dealerSum += card2
        dealerCards.push(card2)
        console.log("Iteration: " + counter + " " + card2)
        counter++
        renderGame()
        }
    else{
        clearInterval(dealerInterval)
        checkWinner()
    }}
    
function Stand() {
    if (isAlive === true && hasBlackJack === false) {
        stand = true
        renderGame()
        console.log("stands")
    }
}

function addBet() {
    if ((player.chips + refund) - betValue < 0){
        bet = "You cant afford that"
        show()
        return}
    if (betValue < 1){
        bet = "You must bet at least 1$"
        show()
        return
    }
    
    player.chips += refund
    refund = parseInt(betValue)

    player.chips -= betValue
    player_name = player.name + ": $" + player.chips
    console.log(player.chips)
    bet = "bet: " + betValue + "$"
    placedBet = true
    show()
}

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    // } else if (randomNumber === 1 && sum <= 10) {
    //     return 11
    // } else if (randomNumber === 1 && sum > 10) {
    //     return 1
    }else {
        return randomNumber
    }
}

var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
msg.voice = voices[1]; 
msg.volume = 1; // From 0 to 1
msg.rate = 1; // From 0.1 to 10
msg.pitch = 0.5; // From 0 to 2
msg.text = "";
msg.lang = 'en';
speechSynthesis.speak(msg);
speechSynthesis.getVoices().forEach(function(voice) {
    console.log(voice.name, voice.default ? voice.default :'');
  });
  var msg = new SpeechSynthesisUtterance();
    msg.text = "";
    window.speechSynthesis.speak(msg);

    function randomNum(min, max) {
        return (Math.floor(Math.random() * (max - min + 1)) + min);}