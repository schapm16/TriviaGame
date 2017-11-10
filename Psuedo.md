# TriviaGame Hard - Pseudo


### Timers

1. Timer for user play  `createTimeout`
    * Also controls display of out-of-time screen
    
2. Timer for how long different screens are displayed `createTimeout`
    *  Congratulations screen
    *  Out-of-time screen
    *  Incorrect answer screen

### Screens
##### No refresh allowed

1. User play screen
2. Congratulations screen
3. Incorrect answer screen
4. Out-of-time screen
5. Final screen
    * Shows score 
    * Option to restart game

(?) Use hidden HTML elements for different screens?
    

### Script

1. Store questions in objects
    * Question Property
    * Four properties, one for each possible answer
    * Property with correct answer.
2. Iterate over questions by having array of objects.  (Random selection?)
3. Use an object to store gameplay variables and functions
    * numRight
    * numWrong
    * optionSelected
4. Use JQuery to have a click listener on each answer.
    *JQuery click events will be outside game object and inside $('Document').ready()
5. Compare button press with correct answer
6. Result of comparison triggers:
    * Which screen to display
    * Selection of next question
7.  Track correct answers and incorrect answers


    





 
