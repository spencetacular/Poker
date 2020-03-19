$(document).ready(function(){ 

    makePlayers();

    newDeck();

    betBlinds();

    // console.log("Players " + JSON.stringify(players));

    dealFlop();

   //test winning hand function.
   findWinner();

    // getCallAmount(3);



   


    playerTurn(3);

});

