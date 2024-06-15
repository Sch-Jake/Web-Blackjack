// This is the main game of this project 
// bulk of the project is here
// Created by Jake Schouten
//created april 2024


// Registers the startup function to be called when
// the DOM is finished loading.
$(startup);
$(buttonAdd);
//startup function
function startup() {
    const userName = localStorage.getItem("userName");
    $("#userName").html(userName);
    getPurse();
    getLeaderBoard()
}
//update after each hand
function update(){
    getPurse();
}
//this function takes in the bet that the user took and removes it from the banks purse total
//makes a call and updates the data in the sql
function bankLose(number){
    let xhr = new XMLHttpRequest();
    xhr.addEventListener( "load", function() {
        console.log("updated purse");
        //update the new purse for the user
        getPurse();
    });
    xhr.open( "GET", "http://augwebapps.com:3152/bankWin?number=" + number);
    xhr.send();   
}
//this function takes in the bet that the user took and adds it from the banks purse total
//makes a call and updates the data in the sql
function bankWin(number){
    let xhr = new XMLHttpRequest();
    xhr.addEventListener( "load", function() {
        console.log("updated purse");
        //update the new purse for the user
        getPurse();
    });
    xhr.open( "GET", "http://augwebapps.com:3152/bankLose?number=" + number);
    xhr.send();   
}
//this function calls the hardBookData or softBookData bases on weither or not it contains an A
// it updates the dealer text to tell the user what move the book says it should make
function getHandData(handID){
    var $existingHand = $('#userHand').html();
    console.log($existingHand);
    console.log("getHandData called" + handID);
    console.log(handID);
    let xhr = new XMLHttpRequest();
    xhr.addEventListener( "load", function() {
        console.log(this.response.length);
        const jsonArray = JSON.parse(this.response);
        if (this.response.length > 2){
            const bookData = jsonArray[0].idealMove;
            $('#dealerTalk').html("The Book says to " + bookData + " in this situation");
        }else { }

    });
    if ( $existingHand.includes("A")){
        console.log("softData");
        xhr.open( "GET", "http://augwebapps.com:3152/getAHandData?handID=" + handID);
    }else { 
        console.log("hardData");
        xhr.open( "GET", "http://augwebapps.com:3152/getHandData?handID=" + handID); }
    xhr.send();   
}
//set the purse in SQL depending on what happened after a gand
function setPurse(){
    console.log("setPurse called");
    var userName = $("#userName").html();
    var purse = parseInt($("#userPurse").html(), 10);
    let xhr = new XMLHttpRequest();
    xhr.addEventListener( "load", function() {
        console.log("updated purse");
        //update the new purse for the user
        getPurse();
    });
    localStorage.setItem("userName", userName), purse;
    xhr.open( "GET", "http://augwebapps.com:3152/setPurse?username=" + userName + "&userpurse=" + purse);
    xhr.send();   
}

//get top users so that people can see where they are on the leadererboard
function getLeaderBoard(){
    console.log(" getLeaderBoard called");
    let xhr = new XMLHttpRequest();
    xhr.addEventListener( "load", function() {
        //clears the list so it doesnt duplicate
        $('#richestUsers').empty();
        const jsonArray = JSON.parse(this.response);
        $.each(jsonArray, function(index, user) {
            $('#richestUsers').append('<li>' + user.user + ' - ' + user.purse + '</li>');
        });
    });
    xhr.open( "GET", "http://augwebapps.com:3152/leaderboard");
    xhr.send();   
}
//get user purse from SQL and displays to the user what the new purse value is
function getPurse(){
    var userName = $("#userName").html();
    let xhr = new XMLHttpRequest();
    xhr.addEventListener( "load", function() {
        console.log("Response is " + this.response);
        const jsonArray = JSON.parse(this.response);
        const purseValue = jsonArray[0].purse;
        $('#userPurse').html(purseValue);
        purse = $('#userPurse').html();
        console.log(purse);
        
        }
    );
    localStorage.setItem("userName", userName);
    xhr.open( "GET", "http://augwebapps.com:3152/getPurse?username=" + userName );
    xhr.send();   
}

//values of the cards
// these are variables that are accessed from multiple function
var betAmount;
var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
//function to add event listeners to the buttons
function buttonAdd() {
    $('#home').click(function() {
        window.location.href = 'index.html';
      });
    $('#rules').click(function() {
        window.open("rules.html");
    });
    $('#shop').click(function() {
        window.open("shop.html");
    });
    //if deal is clicked and the user wants to bet more than he has the dealer will deny the user the hand
    $('#deal').click(function() {
        console.log("deal clicked!")
        purse = parseInt($("#userPurse").html(), 10);
        console.log($("#betAmount").val());
        if(purse >=  $("#betAmount").val() &&  $("#betAmount").val() > 0){
            betAmount = $("#betAmount").val();
            console.log(betAmount);
            deal();

        }
        else {
            $('#dealerTalk').html("You are poor");
        }


    });


}
// this is the main driver function for the game itself
//it clears the board and shuffles the deck 
//it also doesnty allow the user to click the deal button
function deal() {
    console.log("called deal")
    $('#deal').addClass('disableButton');
    clearBoard();
    let deck = createDeck();
    let shuffledDeck = shuffleDeck(deck);
    startHand(shuffledDeck);

}
//this function clears the board
function clearBoard(){
    $('#userHand').empty();
    $('#userHand2').empty();
    $('#dealerHand').empty();
}
//this function plays the game of blackJack

function startHand(deck){
    //updates leaderboard
    getLeaderBoard();
    //disables playAgain button
    $('#playAgain').addClass("disableButton");
    //dealer speaks
    $('#dealerTalk').html("Welcome to BlackJack!");
    //hidden card is kept to later reveal it aafter the player is done playing
    let hiddenCard = 0;
    //start the dealing by giving out cards
    for(i =0; i <4;i++){
        if( i %2 == 0 ){
            var $existingHand = $('#userHand').html()
            $existingHand += deck.shift().Value + " ";
            $('#userHand').html($existingHand);

        }
        else if( i == 3 ){
            hiddenCard = deck.shift().Value;
        }
        else{
            var $existingHand = $('#dealerHand').html()
            $existingHand += deck.shift().Value;
            $('#dealerHand').html($existingHand);

        }
    }

    var dealerHand = checkDealerBust();
    var playerHand = checkBust();
    if (playerHand < 10 ){
        playerHand = "0" + playerHand;
    } 
    if(playerHand == 21){
        $('#dealerTalk').html("21 You Won!");
        wonGame();
        $('#playAgain').off('click');
        $('#playAgain').click(function() {
        playAgain(deck);
    });
    }
    var handID = dealerHand+ ""+ playerHand;
    console.log(handID);
    getHandData(handID);
    //at this point the hands are dealt and it is now up to the player to make a decision
    playerDecision(deck, hiddenCard);

}
//this checks weither user hand 1 is bust
// these can be combined
function checkBust(){
    var $existingHand = $('#userHand').html();
    

    var cards = $existingHand.split(' ');
        
        // Convert each card value to its numeric equivalent
    var numbers = cards.map(convertToNumber);
        
        // Calculate the sum of numbers
        var sum = numbers.reduce(function(acc, curr) {
            if (!isNaN(curr)) {
                return acc + curr;
            } else {
                return acc;
            }
        }, 0);
        
        if(sum >21 && $existingHand.includes("A")){console.log("contains an A"); sum -=10;}
    if(sum >21){
       lostGame();
    }
    else if(sum == 21){ wonGame();}
        //return the sum
    console.log(sum);
    return sum;

}
//this checks weither user hand 2 is bust
// these can be combined
function checkBust2(){
    var $existingHand = $('#userHand2').html();
    

    var cards = $existingHand.split(' ');
        
        // Convert each card value to its numeric equivalent
    var numbers = cards.map(convertToNumber);
        
        // Calculate the sum of numbers
        var sum = numbers.reduce(function(acc, curr) {
            if (!isNaN(curr)) {
                return acc + curr;
            } else {
                return acc;
            }
        }, 0);
        
        // Check if the sum is greater than 21
    if(sum >21 && $existingHand.includes("A")){console.log("contains an A"); sum -=10;}
    if(sum >21){
        lostGame();
     }
    if(sum == 0 ){
        console.log("empty hand 2");
        return -1;
    }
    return sum;

}
//this checks weither dealer is bust
// these can be combined
function checkDealerBust(){
    var $existingHand = $('#dealerHand').html();
    

    var cards = $existingHand.split(' ');
        
        // Convert each card value to its numeric equivalent
    var numbers = cards.map(convertToNumber);
    
        
        // Calculate the sum of numbers
    var sum = numbers.reduce(function(acc, curr) {
        if (!isNaN(curr)) {
            return acc + curr;
        } else {
            return acc;
        }
        }, 0);
    if(sum >21 && $existingHand.includes("A")){console.log("contains an A"); sum -=10;}
    if(sum >21){

    }
        // Check if the sum is greater than 21
    console.log(sum);
    return sum;


}
//updates all the information like the purse value and calls setPurse to update in the sql
function wonGame(){
    console.log( "called wonGame ");
    var purse = parseInt($("#userPurse").html(), 10);
    bankLose(betAmount);
    purse -= betAmount;
    purse += 2 * betAmount;
    $("#userPurse").html(purse);
    setPurse();
}
//updates all the information like the purse value and calls setPurse to update in the sql
function lostGame(){
    console.log("called lostGame");
    purse = $("#userPurse").html();
    purse -= betAmount;
    console.log("you lost" + betAmount)
    $("#userPurse").html(purse);
    bankWin(betAmount);
    setPurse();
}
//this function converts all the face cards and the A to their number value 
//returns the value of the card
function convertToNumber(card){
    if (card === "J" || card === "Q" || card === "K") {
        return 10;
    } else if (card === "A") {
        return 11; // Aces can be 1 or 11, here we consider it as 11
    } else {
        return parseInt(card); // Convert other cards to their numeric value
    }
}
//this function allows for the user to play the game
function playerDecision(deck, hiddenCard){
    //We need to enable the buttons when the user gets to this point
    //stand hit split double down are the options\
    console.log("called player decision");
    $('#stand').removeClass("disableButton");
    $('#hit').removeClass("disableButton");
    checkSplit();
    // $('#split').removeClass("disableButton");
    $('#double').removeClass("disableButton");
    //turn off previous click functions
    $('#hit').off('click');
    //add a function to click
    $('#hit').click(function() {
        //takes the existing hand and adds a card from the deck
        var $existingHand = $('#userHand').html()
        $existingHand += deck.shift().Value + " ";
        console.log("calling handData");
        $('#userHand').html($existingHand);
        //check weither any of the hands have busted
        var dealerHand = checkDealerBust();
        var playerHand = checkBust();
        console.log(playerHand);
        //adds a 0 because the sql requires 2 digits to find the primary key
        if (playerHand < 10 ){
            playerHand = "0" + playerHand;
        }
        if($existingHand.includes("A")){
            playerHand -= 10;
            console.log("include A");
        }
        var handID = dealerHand+ ""+ playerHand;
        console.log(handID);
        getHandData(handID);
        // if check bust returns higher than 21 call play again to reset the game
        if(checkBust() > 21){
            hideButtons();
            console.log("you bust");
            $('#dealerTalk').html("Over 21 you lost");
            $('#playAgain').off('click');
            $('#playAgain').click(function() {
                playAgain(deck);
            });
        
        }
    });
    //turn off previous click functions
    $('#double').off('click');
    //add a click function to double
    $('#double').click(function() {
        //doubles the bet amount 
        betAmount = betAmount *2;
        console.log(betAmount);
        var $existingHand = $('#userHand').html()
        $existingHand += deck.shift().Value + " ";
        $('#userHand').html($existingHand);
        // if check bust returns higher than 21 call play again to reset the game
        if(checkBust() > 21){
            hideButtons();
            clearBoard();
            
        }else{dealerMove(deck, hiddenCard);}
    });
    //turn off previous click functions     
    $('#split').off('click');
    //add a click function to double
    //split splits the hand in two and calls a new function to play the hand
    $('#split').click(function() {
        var $existingHand = $('#userHand').html()
        $('#userHand').html($existingHand);
        // Check if the numbers are equal
        var num1 = convertToNumber($existingHand[0]);
        var num2 = convertToNumber($existingHand[2]);
        num1 += " ";
        num2 += " ";
        $('#userHand').html(num1);
        $('#userHand2').html(num2);
        splitHandPlay(deck,hiddenCard);

    });
    //if stand is called it will move to the dealers turn
    $('#stand').off('click');
    $('#stand').click(function() {
        dealerMove(deck, hiddenCard);
     });



}
//dealer play
function dealerMove(deck, hiddenCard, playerHand){
    hideButtons();

    hiddenCard = convertToNumber(hiddenCard);
    var $existingHand = $('#dealerHand').html();
    existingHand = convertToNumber($existingHand)
    $('#dealerHand').html(existingHand + " " + hiddenCard);
    //this will make the dealer hit until he reaches a total over 16
    while (existingHand + hiddenCard < 17){
        var $existingHand = $('#dealerHand').html();
        var newCard = deck.shift().Value;
        newCard = convertToNumber(newCard);
        $existingHand += " " + newCard + " ";
        existingHand = existingHand + newCard;
        $('#dealerHand').html($existingHand);
        if(checkDealerBust() > 21){
            hideButtons();

            $('#dealerTalk').html("Bust");
        }

    }
    //now we must compare the the dealers hand verses the players hand 
    let userHand = checkBust();
    let userHand2 = checkBust2();
    let dealerHand = checkDealerBust();
    // if dealer hand is higher than user hand and less than 21 it will return win for the dealer
    if(userHand < dealerHand && dealerHand <= 21){
        console.log("you lost");
        $('#dealerTalk').html("You Lost");
        lostGame();
    }
    //tie if they are equal
    else if (dealerHand == userHand) {$('#dealerTalk').html("Tie"); }
    // otherwise the user wins
    else { $('#dealerTalk').html("You won"); wonGame();}
    //this checks if user hand is less than one meaning the second hand was a non factor
    if( userHand2 <0){
        console.log("noHand");
    }
    // if they dealerhand is equal to hand2  they tie
    else if (dealerHand == userHand2) { console.log("tie"); }
     // if dealer hand is higher than user hand and less than 21 it will return win for the dealer
    else if ( userHand2 < dealerHand && dealerHand <= 21) { $('#dealerTalk').html("You Lost"); lostGame(); }
    //else the user won
    else { console.log("you won hand two!"); wonGame() }
    //call play again by removing the previous click handler and making a new won
    $('#playAgain').off('click');
    $('#playAgain').click(function() {
        playAgain(deck);
    });


}
//split hand play allows for the user to play with two hands
function splitHandPlay(deck, hiddenCard){
    //disable split no more splittin
    $('#split').addClass("disableButton");
    console.log("split hand play called")
    //delete previous click function and adds a new one
    $('#hit').off('click');
    //hit function that allows the user to hit until he hits over 21
    $('#hit').click(function() {
        console.log("split hand play hit");
        var $existingHand = $('#userHand').html()
        $existingHand += deck.shift().Value + " ";
        $('#userHand').html($existingHand);
        if(checkBust() > 21){
            playHandTwo(deck, hiddenCard);
            $('#userHandOut').html("Bust");
        }
        //check weather the hands bust
        var dealerHand = checkDealerBust();
        var playerHand = checkBust();
        if (playerHand < 10 ){
            playerHand = "0" + playerHand;
        }
        var handID = dealerHand+ ""+ playerHand;
        console.log(handID);
        getHandData(handID);
    });
    // allow the user to double by turning off previous click functions and adding a new one
    $('#double').off('click');
    $('#double').click(function() {
        var $existingHand = $('#userHand').html()
        $existingHand += deck.shift().Value + " ";
        $('#userHand').html($existingHand);
        if(checkBust() > 21){
            playHandTwo(deck, hiddenCard);
            $('#userHandOut').html("Bust");
            betAmount = betAmount *2;
            console.log(betAmount);
            
        }//move to hand two if the user bust
        else{playHandTwo(deck, hiddenCard);}
    });
    //move to the second hand
    $('#stand').off('click');
    $('#stand').click(function() {
        playHandTwo(deck, hiddenCard);
    });
}
//this function plays the second hand
function playHandTwo(deck, hiddenCard){
    console.log("switched to hand two");
    //hit function that allows the user to hit until he hits over 21
    $('#hit').off('click');
    $('#hit').click(function() {
        console.log("split hand2 play hit");
        var $existingHand = $('#userHand2').html()
        $existingHand += deck.shift().Value + " ";
        $('#userHand2').html($existingHand);
        if(checkBust2() > 21){
            hideButtons();

            $('#userHand2Out').html("Bust");
        }
        var dealerHand = checkDealerBust();
        var playerHand = checkBust2();
        if (playerHand < 10 ){
            playerHand = "0" + playerHand;
        }
        var handID = dealerHand+ ""+ playerHand;
        console.log(handID);
        getHandData(handID);
    });
    // allow the user to double by turning off previous click functions and adding a new one
    $('#double').off('click');
    $('#double').click(function() {
        var $existingHand = $('#userHand2').html()
        $existingHand += deck.shift().Value + " ";
        $('#userHand2').html($existingHand);
        if(checkBust2() > 21){
            hideButtons();

            $('#userHand2Out').html("Bust");
        }else{dealerMove(deck, hiddenCard);}
    });
    //if stand mvoe to the dealers move
    $('#stand').off('click');
    $('#stand').click(function() {
       dealerMove(deck, hiddenCard);
    });
}
//clear the first hand for the user
//this function allows the user to play again
function playAgain(deck){
    getLeaderBoard();
    console.log("new game");
    clearBoard();
    console.log(purse);
    //start new hand if the bet is less than the value of your purse
    if(purse >=  $("#betAmount").val() &&  $("#betAmount").val() > 0){
        betAmount = $("#betAmount").val();
        startHand(deck);
    }
    else {//user doesnt have enough money
        console.log("you are poor");
        $('#dealerTalk').html("You are poor");
    }
    
}
//checks to see if the user has the ability to split
function checkSplit(){
    var $existingHand = $('#userHand').html();
    console.log($existingHand);
    // Check if the numbers are equal
    var num1 = convertToNumber($existingHand[0]);
    var num2 = convertToNumber($existingHand[2]);
    if(num1 === num2){
        $('#split').removeClass("disableButton");
    }
}
//this hides the button so they can't do something out of turn
function hideButtons(){
    $('#playAgain').removeClass("disableButton");
    $('#stand').addClass("disableButton");
    $('#hit').addClass("disableButton");
    $('#split').addClass("disableButton");
    $('#double').addClass("disableButton");
}
//this creates the blackjack deck containing eight decks and each of the four suits
//0(1) 
//Because the length is constant and the number of suites is constant.
function createDeck(){
    //values of the cards
    var suits = ["spades", "diamonds", "clubs", "hearts"];
    var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let deck = new Array();
    //iterate thrrough each suit to get each value of each suit
	for(let i = 0; i < suits.length; i++)
	{   
        // iterate through each value eight times at each suit
        let y = 0;
        while (y < 8){
            //iterate through values array to get every value at the suit
		    for(let x = 0; x < values.length; x++)
		    {
			    let card = {Value: values[x], Suit: suits[i]};
			    deck.push(card);
		    }
            y++;
        }
	}
    //the deck is now filled with every card we need to play blackjack
    console.log("created the deck");
	return deck;
}
//this shuffles the deck by finding a random number in range of 0 to i. 
//i iterate through the array and end to start and puts the card in the deck
//it swaps the location of the card at the spot i and the random number in the deck
//effectivly shuffing it.
//0(n) n being the length of the deck
function shuffleDeck(deck){
    console.log(deck.length);
    for(i = deck.length -1; i >0; i--){
        //get the location of a random card in the deck
        let grabLocation = Math.floor(Math.random() * i);
        //set temp equal to that card and then set that location to the card 
        //swap the values in the array at grabLocation and i
        let temp = deck[grabLocation];
        deck[grabLocation] = deck[i];
        deck[i] = temp;

    }
    return deck;
}
