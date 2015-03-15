var express = require("express"),
    http = require("http"),
    app = express();

var gameResult = {
        outcome: "Start",
        wins: 0,
        losses: 0,
        ties: 0
    };
function checkResult(playerChoice){
    var random = Math.floor(Math.random() * 5) ;
    var systemChoice = ["rock", "paper", "scissors", "lizard", "spock"][random];
    
    gameResult.outcome ="<p>player --> "+playerChoice +" VS system --> "+systemChoice+"\n";
        
    if(systemChoice===playerChoice){
        gameResult.ties= gameResult.ties+1;
        gameResult.outcome ="TIE "+gameResult.outcome;
    }
    else{
        switch(playerChoice){
          case "rock":
            switch(systemChoice){
              case"scissors":
              case "lizard":
                gameResult.wins = gameResult.wins +1;
                gameResult.outcome ="WIN "+gameResult.outcome;
              break;
              case "paper":
              case "spock":
                gameResult.losses = gameResult.losses +1;
                gameResult.outcome ="LOSS "+gameResult.outcome;
                break;
            }
            break;
          case "paper": 
            switch(systemChoice){
              case "rock":
              case "spock":
                gameResult.wins = gameResult.wins +1;
                gameResult.outcome ="WIN "+gameResult.outcome;
                break; 
              case"scissors":
              case "lizard":
                gameResult.losses = gameResult.losses +1;
                gameResult.outcome ="LOSS "+gameResult.outcome;
                break;
            }
            break; 
          case"scissors":
            switch(systemChoice){
              case"paper":
              case "lizard":
                gameResult.wins = gameResult.wins +1;
                gameResult.outcome ="WIN "+gameResult.outcome;
                break; 
              case "rock":
              case "spock":
                gameResult.losses = gameResult.losses +1;
                gameResult.outcome ="LOSS "+gameResult.outcome;
                break;
            }
            break; 
          case "lizard":
            switch(systemChoice){
              case "paper":
              case "spock":
                gameResult.wins = gameResult.wins +1;
                gameResult.outcome ="WIN "+gameResult.outcome;
                break; 
              case"scissors":
              case "rock":
                gameResult.losses = gameResult.losses +1;
                gameResult.outcome ="LOSS "+gameResult.outcome;
                break;
            }
            break; 
          case "spock":
            switch(systemChoice){
              case "rock":
              case "scissors":
                gameResult.wins = gameResult.wins +1;
                gameResult.outcome ="WIN "+gameResult.outcome;
                break; 
              case"paper":
              case "lizard":
                gameResult.losses = gameResult.losses +1;
                gameResult.outcome ="LOSS "+gameResult.outcome;
                break;
            }
        }
    }
}
function generateHtml(req, res){
    //app.use(express.static(__dirname + "/client"));
    app.use('/client',  express.static(__dirname + '/client'));
	  res.sendFile('client/index.html', {root: __dirname });
	  return res;
}


// create HTTP server/
http.createServer(app).listen(3000);

// set up our routes
app.get("/", function (req, res) {
    res=generateHtml(req,res);
});
app.post("/gameResult", function (req, res) {
  res.send(JSON.stringify(gameResult));
});

app.post("/play/rock", function (req, res) {
    checkResult('rock');
    res=generateHtml(req,res);
});
app.post("/play/paper", function (req, res) {
    checkResult('paper');
    res=generateHtml(req,res);
});
app.post("/play/scissors", function (req, res) {
    checkResult('scissors');
    res=generateHtml(req,res);
});
app.post("/play/lizard", function (req, res) {
    checkResult('lizard');
    res=generateHtml(req,res);
});
app.post("/play/spock", function (req, res) {
    checkResult('spock');
    res=generateHtml(req,res);
});

console.log("server listening on port 3000");
