var Player = {
  Name : "Your Name",
  Mark : "No Mark Chosen",
  Boxes: [],
  wins : 0,
  addWin : function(){
    Player.wins+= 1;
  },
  setName : function(val){
    Player.Name = val;
  },
  setMark : function(val){
    Player.Mark = val;
  },
  addPlace: function(val){
    Player.Boxes.push(val);
  },
  resetPlayer: function(){
    Player.Boxes = [];
  }
};

var Computer = {
  Name : "TicTacBot",
  Mark : "No Mark Chosen",
  Boxes: [],
  wins : 0,
  addWin : function(){
    Computer.wins+=1;
  },
  setMark : function(val){
    Computer.Mark = val;
  },
  addPlace: function(val){
    Computer.Boxes.push(val);
  },
  resetComputer: function(){
    Computer.Boxes = [];
  }
};

var Board = {
    boxPlace : [],
    turns : 0,
    addPlace : function(val){
      Board.boxPlace.push(val);
    },
    addSquare : function(){
      Board.turns+= 1;
    },
    resetBoard : function(){
      Board.turns = 0;
      Board.boxPlace = [];
    }
  };

//Winning Combinations
var Combos = [[1,2,3],[1,4,7],[1,5,9],[2,5,8],[3,6,9],[3,5,7],[4,5,6],[7,8,9]];

//Winner Array
var Winners = [];

//Turn Array
var whoPlays = [];

//Computers turn
function compPlay(){
  if(Board.turns >= 9 || whoPlays[whoPlays.length -1] == 'Computer' || whoPlays[whoPlays.length -1] == undefined){
    return false;
  }

  if(Board.turns <= 1){
    var starters = [1,3,5,7,9];
    var place =starters[Math.abs(Math.floor(Math.random()*10)-5)];
    while (Board.boxPlace.indexOf(place) > -1 || place == 0){
      place = starters[Math.abs(Math.floor(Math.random()*10)-5)];
    }
    $('#'+place).html('<span class="holder">'+Computer.Mark+'</span>');
    Board.addPlace(place);
    Computer.addPlace(place);
    Board.addSquare();
    whoPlays.push('Computer');
    return true;
  }

  var chooser = Math.abs(Math.floor(Math.random()*11)-1);
  while(Board.boxPlace.indexOf(chooser) > -1 || chooser == 0){
    chooser = Math.abs(Math.floor(Math.random()*11)-1);
  }
  $('#'+chooser).html('<span class="holder">'+Computer.Mark+'</span>');
  Board.addPlace(chooser);
  Computer.addPlace(chooser);
  Board.addSquare();
  whoPlays.push('Computer');
  return true;
};

//Check for a Winner
function checkWinner(val){
  checker = val.sort();
  for(var x in Combos){
    var score = 0;
    for(var y in Combos[x]){
      if(checker.indexOf(Combos[x][y]) > -1){
        score++;
        if(score == 3){
          return true;
        }
      }
    }
  }
  return false;
};


//Player's Move
function playerPlay(val){
  var move = val;
  if(whoPlays[whoPlays.length -1] == 'Player'){
    return false
  }
  if(Board.boxPlace.indexOf(parseInt(move)) < 0){
        Player.addPlace(parseInt(move));
        Board.addPlace(parseInt(move));
        draw = '#' + move;
        Board.addSquare();
        whoPlays.push('Player');
        $(draw).html('<span class="holder">'+Player.Mark+'</span>');
      }
  return true
}

// Reset the Game
function resetGame(){
  Computer.resetComputer();
  Player.resetPlayer();
  Board.resetBoard();
  $('li').html(' ');
}

//To run Computer wins
function checkComputer(){
  if(Computer.Boxes.length > 2 && checkWinner(Computer.Boxes)){
          Winners.push('Computer');
          Computer.addWin();
          $('#compInfo').html(Computer.Name+': '+Computer.Mark+' | Wins:'+Computer.wins);
          alert('TicTacBot Wins!');
          resetGame();
          return playGame()
        }
  if(Board.turns == 9){
            Winners.push('Draw');
            alert('Draw!');
            resetGame();
            return playGame();
          }
  return false
}

//Where the game is played
function playGame(){

  for(var i = 0; i < 8; i++){
      $('li').click(function(event){
        var yourMove = event.target.id;
        playerPlay(yourMove);
        if(Player.Boxes.length > 2 && checkWinner(Player.Boxes)){
          Winners.push('Player');
          Player.addWin();
          $('#yourInfo').html(Player.Name+': '+Player.Mark+' | Wins:'+Player.wins);
          alert('You Win!');
          resetGame();
          return playGame();
        }
        if(Board.turns == 9){
            Winners.push('Draw');
            alert('Draw!');
            resetGame();
            return playGame();
          }
        setTimeout(compPlay,1000);
        setTimeout(checkComputer,1000);
      });
      
  }
  return true;
};

$(function(){
  ready = false;

  $('#yourInfo').html(Player.Name+': '+Player.Mark+' | Wins:'+Player.wins);
  $('#compInfo').html(Computer.Name+': '+Computer.Mark+' | Wins:'+Computer.wins);
  
  //Choose Your Player Name
  $('#nameBar').keypress(function(event){
    if(event.which == 13){
      Player.setName($('#nameBar').val());
      $('#yourInfo').html(Player.Name+': '+Player.Mark+'| Wins:'+Player.wins);
      $('#nameInput,#playerName').toggleClass('pageGone', 500, 'easeOutSine');
    }
  });
  
  //Choose Player Mark
  $('button').click(function(){
    if($(this).val() == 'X'){
      Player.setMark('X');
      Computer.setMark('O');
      $('#yourInfo').html(Player.Name+': '+Player.Mark+' | Wins:'+Player.wins);
      $('#compInfo').html(Computer.Name+': '+Computer.Mark+' | Wins:'+Computer.wins);
      $('#playerMark').toggleClass('pageGone', 500, 'easeOutSine');
      ready = true;
      if(ready == true){
        playGame();
      }
    }
    else{
      Player.setMark('O');
      Computer.setMark('X');
      $('#yourInfo').html(Player.Name+': '+Player.Mark+' | Wins:'+Player.wins);
      $('#compInfo').html(Computer.Name+': '+Computer.Mark+' | Wins:'+Computer.wins);
      $('#playerMark').toggleClass('pageGone', 500, 'easeOutSine');
      ready = true;
      if(ready == true){
        playGame();
      }
    }
  });

});