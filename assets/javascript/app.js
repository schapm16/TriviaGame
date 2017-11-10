/*global $, question1, question2, question3, question4, 
            question5, question6, question7, question8,
            question9, question10*/

//Questions are located in questions.js
var questionArray = [
                    question1, question2, question3, 
                    question4, question5, question6, 
                    question7, question8, question9, 
                    question10
                    ];

// Utility
var timerClear;
var clickBlock = false;



var game = {
    numRight: 0,
    numWrong: 0,
    currentQuestionIndex: 0,
    countDown: 20,
    
    currentQuestion: function() {
      return questionArray[game.currentQuestionIndex];
    },
    
    currentOptions: function(option) {
      return questionArray[game.currentQuestionIndex][option];
    },
    
    setUp: function() {
      
      game.countDown = 20;
        
      $("#question").text(game.currentQuestion().question);
      $("#answerOptions div:nth-child(1)").text(game.currentOptions('option1'));
      $("#answerOptions div:nth-child(2)").text(game.currentOptions('option2'));
      $("#answerOptions div:nth-child(3)").text(game.currentOptions('option3'));
      $("#answerOptions div:nth-child(4)").text(game.currentOptions('option4'));
      
      $("#gameClock").text("00:" + game.countDown);
      
      timerClear = setInterval(game.gameClock, 1000); 
      
    },
    
    decision: function(userSelection, timeEnd) {
      
      if (userSelection === game.currentQuestion().answer) {
        game.numRight++;
        game.messageHandler("win");
        
      } else if (userSelection !== game.currentQuestion().answer && 
                  userSelection !== null) {
                    
        game.messageHandler("loss");
        game.numWrong++;
        
      } else if (timeEnd === true) {
        clearInterval(timerClear);
        game.messageHandler("time");
        game.numWrong++;
        console.log(timeEnd);
        timeEnd = false;
      }
      
      setTimeout(game.nextQuestion, 2000);
    },
    
    gameClock: function() { 
      game.countDown--;
      
      if (game.countDown >= 10) {
          $("#gameClock").text("00:" + game.countDown);
      } else if (game.countDown > 0) {
          $("#gameClock").text("00:0" + game.countDown);
      } else if (game.countDown === 0) {
          $("#gameClock").text("00:00");
          game.decision(null, true);
      }
    
    },
    
    messageHandler: function(message) {
      
      switch (message) {
        
        case "win": 
          $("#message").css("color", "green");
          $("#message").html("Correct!");
          break;
      
      
        case "loss":        
          $("#message").css("color", "red");
          $("#message").html("Incorrect!<br>Answer: " + 
          game.currentQuestion()["option" + game.currentQuestion().answer]);
          break;
      
      
        case "time":
          $("#message").css("color", "red");
          $("#message").html("Time Is Up!<br>Answer: " + 
          game.currentQuestion()["option" + game.currentQuestion().answer]);
          break;
        
        case "clear":
          $("#message").css("background-color", "white");
          $("#message").text("");
          break;
        
        case "start":
          $("#gameBoard").css("display","block");
          $("#startScreen").css("display","none");
          $("#endScreen").css("display","none");
          break;
        
        case "end":
          $("#gameBoard").css("display","none");
          $("#endScreen").css("display", "block");
          
          $("#numRight").html("You got <span style = 'color:green'>" + game.numRight + "</span> correct.");
          $("#numWrong").html("You got <span style = 'color:red'>" + game.numWrong + "</span> wrong.");
        
          break;
      }
    },
    
    nextQuestion: function() {
      game.currentQuestionIndex++;
      
      if (game.currentQuestionIndex < questionArray.length) {
        game.setUp();
        game.messageHandler("clear");
        
        clickBlock = false;
        
      } else {
          game.messageHandler("end");
      }
    }
};


 
$(document).ready(function() {
    
    $("#start").click(function() {
      game.messageHandler("start");
      game.setUp();
      
    });
    
    $("#answerOptions div").click(function() {
      
      if (clickBlock === false) {
        game.decision($(this).data("option"), false);
        clearInterval(timerClear);
        clickBlock = true;
      }
      
    });
    
    $("#reset").click(function() {
      game.numWrong = 0;
      game.numRight = 0;
      game.currentQuestionIndex = 0;
      game.messageHandler("clear");
      clickBlock = false;
      game.setUp();
      game.messageHandler("start");
      
      
    });
    
    
});