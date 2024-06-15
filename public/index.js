// This is the home pageof this project 
// Created by Jake Schouten
//created april 2024
$(startup);
$(buttonAdd);
//startup function
function startup() {

}
//function to add event listeners to the button/s
function buttonAdd() {
    $('#returnUser').click(function() {
        window.location.href = 'login.html';
      });
    $('#newUSer').click(function() {
        window.location.href = 'createAccount.html';
      });
      $('#data').click(function() {
        window.location.href = 'data.html';
      });
}

