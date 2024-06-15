// This is the main game of this project 
// bulk of the project is here
// Created by Jake Schouten
//created april 2024

$(startup);
$(buttonAdd);
//startup function
function startup() {
    const userName = localStorage.getItem("userName");
    $("#userName").html(userName);
    getPurse();
    getLeaderBoard();
}
//function to add event listeners to the button/s
function buttonAdd() {
    $('#home').click(function() {
        window.location.href = 'index.html';
      });
    $('#game').click(function() {
        window.location.href = 'game.html';
    });
    $('#bomb').click(function() {
        bombUser();
    });
    $('#getMoney').click(function() {
        addMoney();
        window.open('https://www.linkedin.com/in/jakeschouten');
    });
}
//this function adds money to their purse in the sql if the button is clicked
// 500 dollars will be added to this user account
function addMoney(){
    console.log("add money called");
    var userName = $("#userName").html();
    var purse = parseInt($("#userPurse").html(), 10);
    purse += 500;
    $("#userPurse").html(purse);
    let xhr = new XMLHttpRequest();
    xhr.addEventListener( "load", function() {
        console.log("updated purse");
        //update the new purse for the user
        getLeaderBoard();
        getPurse();
    });
    localStorage.setItem("userName", userName), purse;
    xhr.open( "GET", "http://augwebapps.com:3152/setPurse?username=" + userName + "&userpurse=" + purse);
    xhr.send();   
}
//this function gets the number of users -1 
// ie 7 users this will return 6
function getNumber(){
    let xhr = new XMLHttpRequest();
    xhr.addEventListener( "load", function() {
        const jsonString = this.response; // Assuming this.response contains "{MAX(id): 3}"
        const jsonArray = JSON.parse(jsonString);
        // Accessing the value associated with the key "MAX(id)"
        console.log(jsonArray);
        const number = jsonArray[0]['MAX(id)'];
        bombSent(number);
        console.log(number);    
    });
    //select MAX(id) from loginData
    xhr.open( "GET", "http://augwebapps.com:3152/getNumber");
    xhr.send();   
}
//this function updates the leaderboard
function getLeaderBoard(){
    console.log(" getLeaderBoard called");
    let xhr = new XMLHttpRequest();
    xhr.addEventListener( "load", function() {
        $('#richestUsers').empty();
        const jsonArray = JSON.parse(this.response);
        $.each(jsonArray, function(index, user) {
            $('#richestUsers').append('<li>' + user.user + ' - ' + user.purse + '</li>');
        });
    });
    xhr.open( "GET", "http://augwebapps.com:3152/leaderboard");
    xhr.send();   
}
//this function sends a bomb to a random user
function bombSent(number){
    //find a random number coorisplonding to a user to delete their purse value
    number2 = Math.floor(Math.random() * number);
    console.log("bombSent Called" + number2);
    let xhr = new XMLHttpRequest();
    xhr.addEventListener( "load", function() {
        console.log("bombs Away");
        getPurse();
        $("#test").html("Sent a bomb");
        getLeaderBoard();
    });
    //select MAX(id) from loginData
    xhr.open( "GET", "http://augwebapps.com:3152/sendBomb?number="+ number2);
    xhr.send();   
    $('#richestUsers').empty();
    getLeaderBoard();
}
//sets the purse value in the sql
function setPurse(){
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

//get user purse from SQL
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
//this function will bomb a user if the button is clicked and the user has atleast 2000 dollars
function bombUser(){
    console.log("called bomb user");
    var purse = parseInt($("#userPurse").html(), 10);
    if(purse < 2000){
        $("#test").html("No Money");
    }else{purse -= 2000;
        $("#userPurse").html(purse);
        setPurse();
        getNumber();
    }

}

