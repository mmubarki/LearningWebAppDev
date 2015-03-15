var http=require("http");
var gameResult = {
        outcome: "Start",
        wins: 0,
        losses: 0,
        ties: 0
    };
function checkResult(playerChoice){
    var random = Math.floor(Math.random() * 5) ;
    var systemChoice = ["rock", "paper", "scissors", "lizard", "spock"][random];
    
    gameResult.outcome ="<p>player --> "+playerChoice +" vs system --> "+systemChoice+"\n";
        
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
	  res.writeHead(200, "OK", {'Content-Type': 'text/html'});
	  res.write('<html><head><title>play Rock, Paper, Scissors, Lizard, Spock</title></head>\n');
    res.write('<body >\n');
	  res.write('<h1>Welcome game</h1>\n');
	  res.write('<h2>play Rock, Paper, Scissors, Lizard, Spock</h2>\n');
	  res.write('<form id="gameForm" name="gameForm" method="post" action="/" >\n' );
    res.write('try: <select id="choice" name="choice">');
	  /*res.write('try: <select name="choice" onchange='+"'");
    res.write('(this.value!=""){this.form.action="/play/"+this.value;');
	  res.write('this.form.method="post";');
	  res.write('submit();}'+"'>");*/
	  res.write('<option id="0">select</option>\n');
	  res.write('<option id="rock">rock</option>\n');
	  res.write('<option id="paper"/>paper</option>\n');
	  res.write('<option id="scissors"/>scissors</option>\n');
	  res.write('<option id="lizard"/>lizard</option>\n');
	  res.write('<option id="spock"/>spock</option>\n');
	  res.write('<select/>\n');
	  res.write('</form>');
	  res.write('<div id="result" name="result">\n');
	  res.write('</div>\n');
	  res.write('<script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>\n');
	  res.write('<script>\n');
	  res.write('$(document).ready(function(){\n"use strict";\n');
    res.write('$("#choice").on("change",function(event){\n');
    res.write('if($("#choice option:selected").text()!="0"){\n');
    res.write('$("#gameForm").attr("action","/play/"+$("#choice option:selected").text());\n');
    res.write('$("#gameForm").submit();}});\n');
    res.write('setInterval(\n');
    res.write('function fetchGameResult(){\n');
    res.write('$.ajax({url:"/gameResult",error : function () {$("#result").empty();$("#result").text("ajax error");},\n');
    //res.write('data: content, ');
    res.write('dataType: "json",success: function (data) {\n ');
    res.write('$("#result").empty();\n');
    res.write('$("#result").append("<p>"+data.outcome+"</p><p>WINS:"+data.wins+"  LOSSES:"+data.losses+"  TIES:"+data.ties+"</p");\n');
    
    res.write('},type: "post"});');

    //close get function fetchGameResult
    res.write('}\n');
    res.write(',200);\n');
	  //close main function
    res.write('});\n');
    res.write('</script>\n');
	  res.write('</body></html>');
	  res.end();
	  return res;
}
http.createServer(function (req, res) {
  // set up routes
  switch(req.url) {
    case 'gameResult':
    case '/gameResult':
      res.end(JSON.stringify(gameResult));
  	break;
  	case '/':
  	   res=generateHtml(req,res); 
  	break;
    case '/play/rock':
        checkResult('rock');
        res=generateHtml(req,res);
      break;
    case '/play/paper':
        checkResult('paper');
        res=generateHtml(req,res);
      break;
    case '/play/scissors':
        checkResult('scissors');
        res=generateHtml(req,res);

      break;
    case '/play/lizard':
        checkResult('lizard');
        res=generateHtml(req,res);
      break;
    case '/play/spock':
        checkResult('spock');
        res=generateHtml(req,res);
      break;
    default:
      res.writeHead(404, "Not found", {'Content-Type': 'text/html'});
      res.end('<html><head><title>404 - Not found</title></head><body><h1>Not found.</h1></body></html>');
  };
  
}).listen(3000);
console.log("server listening on port 3000");
