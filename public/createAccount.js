// create account js that checks weither an account under a name already exists
// Created by Jake Schouten

$(startup);
$(buttonAdd);
//startup function incase I want to add something to this page in the future
function startup() {

}
//function to add event listeners to the button/s
function buttonAdd() {
    $('#home').click(function() {
        window.location.href = 'index.html';
      });
    $('#createAccount').click(createAccount);
}

//check the login with the sql server
function createAccount(){
    var userName = $("#userInput").val();
    let password = $("#password").val();
    console.log(userName + password);
    let xhr = new XMLHttpRequest();
    xhr.addEventListener( "load", function() {
        console.log("Select callback");
        console.log("Response is " + this.response);
        if(this.response == "true"){
            console.log("True response");
            correctInfo();
        }
        else{
            console.log("already exists");
            incorrectInfo;
        }
    }
    );
    localStorage.setItem("userName", userName);
    xhr.open( "GET", "http://augwebapps.com:3152/createAccount?username=" + userName + "&password=" + password);
    xhr.send();   
}
//if the user input the correct information we will send them on in to the game
function correctInfo(){
    console.log("called correct info");
    window.location.href = "game.html";
}
//if the user input incorrect login info we will prompt them again.
function incorrectInfo(){
    console.log("called incorrect info");
}