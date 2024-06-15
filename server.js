/* server.js
 * This is our express server app running on the web server.
 * Created - April 2024 
 */
var express = require("express");
var app = express();
var mysql = require("mysql2");
// Serve static files from the directory named public
app.use(express.static("public"));

//creates an end point to check login with the login details as parameters
app.get("/checkLogin", checkLogin);
function checkLogin(req, res){
    console.log("checklogin called");
    var conn = mysql.createConnection( {
        host: "127.0.0.1",
        user: "schoutej",
        password: "$311ja100",
        database: "Schouten_BlackJack"
    });
    conn.connect( function( err) {
        if( err) {
            console.log( "Error connecting to database: " + err)
        }
        else {
            console.log( "Connection established")
        }
    })

    let userName = req.query.username;
    let userPass = req.query.password;
    console.log("got username data " + req.query.username);
    console.log("got userpass data " + req.query.password);
    let sql = "select * from loginData where user = '" + userName + "'and pass = '" + userPass + "';"
    console.log(sql);
    conn.query( sql, function (err,rows) {
        if( err) {  
            // send back an error code in result
        }
        else if ( JSON.stringify( rows).length < 3) {
            console.log("no data");
            // Send back the rows (an array of row objects) as a JSON string
            res.send(false);
        }    
        else {
            response = JSON.stringify( rows);
            res.send(true);
        }  
    }
    );
    conn.end();
}

// this function creates an account for the user and checks weither the user exists
app.get("/createAccount", createAccount);
function createAccount(req, res){
    console.log("checklogin called");
    var conn = mysql.createConnection( {
        host: "127.0.0.1",
        user: "schoutej",
        password: "$311ja100",
        database: "Schouten_BlackJack"
    });
    conn.connect( function( err) {
        if( err) {
            console.log( "Error connecting to database: " + err)
        }
        else {
            console.log( "Connection established")
        }
    })

    let userName = req.query.username;
    let userPass = req.query.password;
    console.log("got username data " + req.query.username);
    console.log("got userpass data " + req.query.password);
    let sql2 = "SELECT * FROM loginData WHERE user = '"+ userName+"'"
    console.log(sql2);
    conn.query( sql2, function (err,rows) {
        console.log(rows);
        if( err) {  
            // send back an error code in result
        }  
        else if (JSON.stringify( rows).length < 3 ) {
            var startPurse =500;
            let sql = "insert into loginData ( user, pass, purse) values ( '"+ userName +"', '"+userPass+"' , '"+startPurse+"'); "
            console.log(sql);
            conn.query( sql, function (err,rows) {
        
                if( err) {  
                    // send back an error code in result
                }  
                else {
                    res.send(true);
                }  
            }
            );
        }  
        else{//this will return if the user already exists
            console.log("already exists");
            res.send(false);
        }
    conn.end();
    }
    );
}
//get the purse value of the user that is logged in
app.get("/getPurse", getPurse);
function getPurse(req, res){
    console.log("getPurse called");
    var conn = mysql.createConnection( {
        host: "127.0.0.1",
        user: "schoutej",
        password: "$311ja100",
        database: "Schouten_BlackJack"
    });
    conn.connect( function( err) {
        if( err) {
            console.log( "Error connecting to database: " + err)
        }
        else {
            console.log( "Connection established")
        }
    })
    let userName = req.query.username;
    console.log("got username data " + req.query.username);
    let sql2 = "select purse from loginData where user = '"+ userName+"'"
    console.log(sql2);
    conn.query( sql2, function (err,rows) {
        if( err) {  
            // send back an error code in result
        }  
        else {
            res.send(rows);
        }  
    conn.end();
    }
    );
}
// this will update the purse in the sql with the given userName
app.get("/setPurse", setPurse);
function setPurse(req, res){
    console.log("setPurse called");
    var conn = mysql.createConnection( {
        host: "127.0.0.1",
        user: "schoutej",
        password: "$311ja100",
        database: "Schouten_BlackJack"
    });
    conn.connect( function( err) {
        if( err) {
            console.log( "Error connecting to database: " + err)
        }
        else {
            console.log( "Connection established")
        }
    })
    let userName = req.query.username;
    let userPurse = req.query.userpurse;
    console.log(userPurse);
    console.log(userName);
    let sql2 = "update loginData set purse = " + userPurse + " where user = '"+ userName+"'";
    console.log(sql2);
    conn.query( sql2, function (err,rows) {
        if( err) {  
            // send back an error code in result
        }  
        else {

            console.log("update user purse");
        }  
    conn.end();
    }
    );
}
// this will get the ideal move from the database
// when the hand doesn't contain an ace
app.get("/getHandData", getHandData);
function getHandData(req, res){
    console.log("getHandDaata called");
    var conn = mysql.createConnection( {
        host: "127.0.0.1",
        user: "schoutej",
        password: "$311ja100",
        database: "Schouten_BlackJack"
    });
    conn.connect( function( err) {
        if( err) {
            console.log( "Error connecting to database: " + err)
        }
        else {
            console.log( "Connection established")
        }
    })
    let handID = req.query.handID;
    console.log("got id data " + req.query.handID );
    let sql2 = "select idealMove from hardBookData where id = " + handID + "";
    console.log(sql2);
    conn.query( sql2, function (err,rows) {
        if( err) {  
            // send back an error code in result
        }  
        else {
            res.send(rows);
        }  
    conn.end();
    }
    );
}
//ge the hand data from the database if the hand contains an ace
app.get("/getAHandData", getAHandData);
function getAHandData(req, res){
    console.log("getAHandData called");
    var conn = mysql.createConnection( {
        host: "127.0.0.1",
        user: "schoutej",
        password: "$311ja100",
        database: "Schouten_BlackJack"
    });
    conn.connect( function( err) {
        if( err) {
            console.log( "Error connecting to database: " + err)
        }
        else {
            console.log( "Connection established")
        }
    })
    let handID = req.query.handID;
    console.log("got id data " + req.query.handID );
    let sql2 = "select idealMove from softBookData where id = " + handID + "";
    console.log(sql2);
    conn.query( sql2, function (err,rows) {
        if( err) {  
            // send back an error code in result
        }  
        else {
            res.send(rows);
        }  
    conn.end();
    }
    );
}
//this will pull the top five users with the highest bank
app.get("/leaderboard",leaderboard);
function leaderboard(req, res){
    console.log("getAHandData called");
    var conn = mysql.createConnection( {
        host: "127.0.0.1",
        user: "schoutej",
        password: "$311ja100",
        database: "Schouten_BlackJack"
    });
    conn.connect( function( err) {
        if( err) {
            console.log( "Error connecting to database: " + err)
        }
        else {
            console.log( "Connection established")
        }
    })
    console.log("update leaderboard" );
    let sql2 = "select user, purse from loginData order by purse desc limit 5;";
    console.log(sql2);
    conn.query( sql2, function (err,rows) {
        if( err) {  
            // send back an error code in result
        }  
        else {
            res.send(rows);
        }  
    conn.end();
    }
    );
}
//gets the total number of users -1 from the sql database
app.get("/getNumber",getNumber);
function getNumber(req, res){
    console.log("getAHandData called");
    var conn = mysql.createConnection( {
        host: "127.0.0.1",
        user: "schoutej",
        password: "$311ja100",
        database: "Schouten_BlackJack"
    });
    conn.connect( function( err) {
        if( err) {
            console.log( "Error connecting to database: " + err)
        }
        else {
            console.log( "Connection established")
        }
    })
    console.log("update leaderboard" );
    let sql2 = "select MAX(id) from loginData";
    console.log(sql2);
    conn.query( sql2, function (err,rows) {
        if( err) {  
            // send back an error code in result
        }  
        else {
            res.send(rows);
        }  
    conn.end();
    }
    );
}
//deletes the purse of a user given the id of the user
app.get("/sendBomb",sendBomb);
function sendBomb(req, res){
    console.log("sendBomb called");
    var conn = mysql.createConnection( {
        host: "127.0.0.1",
        user: "schoutej",
        password: "$311ja100",
        database: "Schouten_BlackJack"
    });
    conn.connect( function( err) {
        if( err) {
            console.log( "Error connecting to database: " + err)
        }
        else {
            console.log( "Connection established")
        }
    })
    let number = req.query.number;
    let sql2 = "update loginData set purse = 0 where id = " + number + ";";
    console.log(sql2);
    conn.query( sql2, function (err,rows) {
        if( err) {  
            // send back an error code in result
        }  
        else {
            res.send(rows);
        }  
    conn.end();
    }
    );
}
//if the bank wins it will add the sent number into the banks purse in the banks data server
app.get("/bankWin",bankWin);
function bankWin(req, res){
    console.log("bankWin called");
    var conn = mysql.createConnection( {
        host: "127.0.0.1",
        user: "schoutej",
        password: "$311ja100",
        database: "Schouten_BlackJack"
    });
    conn.connect( function( err) {
        if( err) {
            console.log( "Error connecting to database: " + err)
        }
        else {
            console.log( "Connection established")
        }
    })
    let number = req.query.number;
    let sql2 = "update bankData set purse = purse +" + number + ";";
    console.log(sql2);
    conn.query( sql2, function (err,rows) {
        if( err) {  
            // send back an error code in result
        }  
        else {
            res.send(rows);
        }  
    conn.end();
    }
    );
}
//if the bank loses it will add the sent number into the banks purse in the banks data server

app.get("/bankLose",bankLose);
function bankLose(req, res){
    console.log("bankLose called");
    var conn = mysql.createConnection( {
        host: "127.0.0.1",
        user: "schoutej",
        password: "$311ja100",
        database: "Schouten_BlackJack"
    });
    conn.connect( function( err) {
        if( err) {
            console.log( "Error connecting to database: " + err)
        }
        else {
            console.log( "Connection established")
        }
    })
    let number = req.query.number;
    let sql2 = "update bankData set purse = purse -" + number + ";";
    console.log(sql2);
    conn.query( sql2, function (err,rows) {
        if( err) {  
            // send back an error code in result
        }  
        else {
            res.send(rows);
        }  
    conn.end();
    }
    );
}
//gets the total amount of purse value in existence
//ran into an error on this one and was not able to find the solution for it
app.get("/getTotal",getTotal);
function getTotal(req, res){
    console.log(" called");
    var conn = mysql.createConnection( {
        host: "127.0.0.1",
        user: "schoutej",
        password: "$311ja100",
        database: "Schouten_BlackJack"
    });
    conn.connect( function( err) {
        if( err) {
            console.log( "Error connecting to database: " + err)
        }
        else {
            console.log( "Connection established")
        }
    })
    let sql2 = "SELECT (SELECT SUM(purse) FROM loginData) + (SELECT SUM(purse) FROM bankData) AS total_purse_sum;";
    console.log(sql2);
    conn.query( sql2, function (err,rows) {
        if( err) {  
            // send back an error code in result
        }  
        else {
            res.send(rows);
        }  
    conn.end();
    }
    );
}

// Now that the server is set up, it is started on the
// specified port number, in this case on port 3002
app.listen(3152);

