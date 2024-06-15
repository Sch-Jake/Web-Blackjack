// This file is meant to get the total purse value from the server
// Created by Jake Schouten
$(buttonAdd);
//function to add event listeners to the button/s
function buttonAdd() {
    $('#home').click(function() {
        window.location.href = 'index.html';
      });
      $('#check').click(function() {
        checkData();
      });
}
//function to get the total purse data
function checkData(){
  console.log("check Data called");

    let xhr = new XMLHttpRequest();
    xhr.addEventListener( "load", function() {
        console.log("called");
        $('#totalValue').html(this.response);
      }
    );
    xhr.open( "GET", "http://augwebapps.com:3152/getTotal");
    xhr.send();    
}