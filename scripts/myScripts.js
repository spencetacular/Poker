
var numPlayers = 4;
var chipStartAmount = 2500;
var smallBlind = 5;
var players = [];
var pot = 0;


var playerToBet = 0;
var currentBet = 0;

console.log("***** pot: " + pot);
console.log("***** playerToBet: " + playerToBet);
console.log("***** currentBet: " + currentBet);




function makePlayers() {
	for (i=0; i<numPlayers; i++) {
		var p = {chipStack: chipStartAmount, folded: false, dealer: false, cards:[], bet: 0 };
		players.push(p);

		//set chip stack
		id = "#cs-" + i + " p";
		console.log(id);
		$(id).html(chipStartAmount);
	}
	players[0].dealer = true;
};

// makePlayers();
// console.log(players);



function bet(p, amount) {
	players[p].chipStack -= amount;
	players[p].bet +=amount;
	

	id = "#chip-stack" + p;
	idBet = "#bet-" +p;
	$(id).html(players[p].chipStack);
	$(idBet).html(players[p].bet);
	
}

function callAmount(player) {
	var currentHighBet = 0;
	for(i=0; i<numPlayers; i++) {
		if (players[i].bet > currentHighBet) {
			currentHighBet = players[i].bet;
		}
	}
	console.log("current High Bet: " +currentHighBet );

	var callAmount  = currentHighBet - players[player].bet;

	return callAmount;

	// console.log("call amount: " +callAmount);
}



function findWinner() {
	for(i=0; i<numPlayers; i++) {

		var hand = players[i].cards;
		
		//add community cards to hand
		for (j=0; j<communityCards.length; j++) {
			hand.push(communityCards[j]);
		}


		//!!!!!!!!!!!! run from the top down instead

		var rank = 0;

		//high card

		// var hightCard = 0;

		var numbers = [];
		var suites = [];

		for (k=0; k<hand.length; k++) {		
			numbers.push(hand[k].number);
			suites.push(hand[k].suit);
			
		}
		numbers = [11,8,6,7,5,4,12];
		//hack !!!! convert them earlier on
		suites = [0,1,0,0,2,0,0];


		numbers.sort(function(a, b){return b-a});
		suites.sort(function(a, b){return b-a});
		
		console.log("numbers: " + numbers);
		console.log("suites: " + suites);

		var numPairs = 0;
		var trips = false;


		flush(suites);
		straight(numbers); 

		// for(l=0; l<hand.length; l++) {
			

		// 	if (numbers[l] === numbers[l+1] && numbers[l] === numbers[l+2]  && numbers[l] === numbers[l+3]) {
		// 		if(rank<7) {rank = 7};

		// 		console.log ("Four of a kind !!!!!!!!!");

		// 		//break

		// 	}
		// 	if (numbers[l] === numbers[l+1] && numbers[l] === numbers[l+2]){
		// 		console.log ("Three of a kind !!!!!!!!!!");
		// 		trips = true;
		// 		if(rank<3) {rank = 3};
		// 		console.log("trips: " + trips);
		// 	} 

		// 	if (numbers[l] === numbers[l+1]) {
		// 		console.log ("Pair!!!!!!");
		// 		numPairs ++;

		// 		if(rank<1) {rank = 1};
		// 		console.log(" @@@@@@@@@@@ numPairs: " + numPairs);

		// 		if (trips === true) {
					
		// 			if(rank<6) {rank = 6};
		// 			console.log("Full boat!!!!!!!!");
		// 		}
		// 		if (numPairs >=2) {
		// 			if(rank<2) {rank = 2};
		// 			console.log("Two Pair *****************");
		// 		}
		// 	}
		// }

		console.log("Rank: " + rank);

	}
}


function flush (h) {
	for( i=0; i<h.length; i++) {
		if(h[i] === h[i+1] && h[i] === h[i+2] && h[i] === h[i+2] && h[i] === h[i+3] && h[i] === h[i+4] ) {
			console.log(" ^^^^^^^^^^^^^^^ Flush ^^^^^^^^^^^^^^^^");
		}
	}
}

function straight (h) {

	// console.log("%%%%%%%%%%%%%%%%%%");

	
	
	for( i=0; i<h.length; i++) {
		
		// console.log("h1 " + h[i]);
		// console.log("h2 -1 " + (h[i] -1));

		if((h[i] -1) === h[i+1]  
			&&  (h[i] -2 ) === h[i+2]
			&&  (h[i] -3 ) === h[i+3]
			&&  (h[i] -4 ) === h[i+4]
			) {
			console.log(" &&&&&&&&&&&& Stright &&&&&&&&&&&");
		}
	}
}




function playerTurn (player) {
	// if folded skip

	// get call amount
	var cAmount = callAmount(player);
	
	console.log("call amount: " +cAmount);
	// if call amount == 0 can check
	
	// check()


	// call ()
	bet(player, cAmount);

	// raise()

	// fold()

	// advance to next player


}


var deck = [];
function newDeck(){

	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;
	  
		while (0 !== currentIndex) {
		  randomIndex = Math.floor(Math.random() * currentIndex);
		  currentIndex -= 1;
		  temporaryValue = array[currentIndex];
		  array[currentIndex] = array[randomIndex];
		  array[randomIndex] = temporaryValue;
		}
	  
		return array;
	  }

	function fillSuit(suit) {

		for(i=2; i <=14; i++) {
			
			var c = {suit:"", number: "", image: ""};
			c.suit = suit;
			c.number = i;
			c.image = i + "yep.jpg";
			deck.push(c);

		}
	}

	function createDeck(){
		
		for(j=0; j<=3; j++) {
		
			var suit="hearts";
			if (j == 1) { suit="diamonds"}
			if (j == 2) { suit="clubs"}
			if (j == 3) { suit="spades"}
			fillSuit(suit);
	
		}

		deck = shuffle(deck);
	}

	createDeck();
}

// newDeck();

function betBlinds() {
	for(i=0; i<numPlayers; i++) {
		if (players[i].dealer == true) {
			// players[i+1].chipStack -= smallBlind;
			bet([i+1], smallBlind);
			if (players.length >2) {
				// players[i+2].chipStack -= smallBlind *2;
				bet([i+2], smallBlind * 2);
			}
			else {
				// players[i].chipStack -= smallBlind *2;
				bet(i, smallBlind) *2;
			}
			break
		}
	}
	// console.log(players);
}

var communityCards = [];


function dealFlop() {
	//deal community cards
	for(i=0; i<3; i++) {
		communityCards[i] = deck[0];
		deck.shift();

		var idBase = "#com-card-" + i;
		var idImg = idBase + " img";
		var imgName = "images/cards/" +communityCards[i].number + "-" + communityCards[i].suit + ".png";

		$(idBase).addClass("show-card");
		$(idImg).attr("src" , imgName);

	}
	//deal player cards
	for(i=0; i<numPlayers; i++) {
	
		players[i].cards[0] = deck[0];
		deck.shift();
		players[i].cards[1] = deck[0];
		deck.shift();

		var idBase1 = "#p" + i + "c1";
		var idImg1 = idBase1 + " img";
		var imgName1 = "images/cards/" + players[i].cards[0].number + "-" + players[i].cards[0].suit + ".png";
		$(idBase1).addClass("show-card");
		$(idImg1).attr("src" , imgName1);

		var idBase2 = "#p" + i + "c2";
		var idImg2 = idBase2 + " img";
		var imgName2 = "images/cards/" + players[i].cards[1].number + "-" + players[i].cards[1].suit + ".png";
		$(idBase2).addClass("show-card");
		$(idImg2).attr("src" , imgName2);

	}

}

function dealTurn() {
	
	communityCards[3] = deck[0];
	deck.shift();

}

function dealRiver() {
	
	communityCards[4] = deck[0];
	deck.shift();

}
