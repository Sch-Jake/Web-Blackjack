// This is the login page of this project 
// Created by Jake Schouten
//created april 2024
$(startup);
$(buttonAdd);
//startup function incase I want to add anything later
function startup() {

}
//function to add event listeners to the button/s
function buttonAdd() {
    $('#home').click(function() {
        window.location.href = 'index.html';
      });
    $('#login').click(checkLogin);
}

//check the login with the sql server
//if it is it will allows the user to progress or will make them reenter their information.
function checkLogin(){
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
            console.log("not True response");
            incorrectInfo;
        }
    }
    );
    localStorage.setItem("userName", userName);
    xhr.open( "GET", "http://augwebapps.com:3152/checkLogin?username=" + userName + "&password=" + password);
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
//will clear the input of the input fields 
function clearInput(){
    
}