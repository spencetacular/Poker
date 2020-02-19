
var numPlayers = 4;
var chipStartAmount = 2500;
var smallBlind = 5;
var players = [];
var pot = 0;




function makePlayers() {
	for (i=0; i<numPlayers; i++) {
		var p = {chipStack: chipStartAmount, folded: false, dealer: false, cards:[] };
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
	pot += amount;

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
			if (j == 3) { suit="spaids"}
			fillSuit(suit);
	
		}

		deck = shuffle(deck);
		// console.log(deck);

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
// betBlinds();
// console.log("plot " + pot);


var communityCards = [];

// for (i=0; i<numPlayers; i++) {
// console.log(deck[1]);



function dealFlop() {
	//deal community cards
	for(i=0; i<3; i++) {
		communityCards[i] = deck[0];
		deck.shift();

		var idBase = "#com-card-" + i;
		var idp = idBase + " p";
		var idh = idBase + " h4";

		$(idp).html(communityCards[i].suit);
		$(idh).html(communityCards[i].number);
		$(idBase).addClass("show-card");

		if (communityCards[i].suit === "diamonds" || communityCards[i].suit === "hearts"){
			$(idBase).addClass("red-card");
			
		}

		

	}
	//deal player cards
	for(i=0; i<numPlayers; i++) {
	
		players[i].cards[0] = deck[0];
		deck.shift();
		players[i].cards[1] = deck[0];
		deck.shift();

		var idBase1 = "#p" + i + "c1";
		var idp1 = idBase1 + " p";
		var idh1 = idBase1 + " h4";
		$(idp1).html(players[i].cards[0].suit);
		$(idh1).html(players[i].cards[0].number);
		$(idBase1).addClass("show-card");

		var idBase2 = "#p" + i + "c2";
		var idp2 = idBase2 + " p";
		var idh2 = idBase2 + " h4";
		$(idp2).html(players[i].cards[1].suit);
		$(idh2).html(players[i].cards[1].number);	
		$(idBase2).addClass("show-card");

		if (players[i].cards[0].suit === "diamonds" || players[i].cards[0].suit === "hearts"){
			$(idBase1).addClass("red-card");
		}

		if (players[i].cards[1].suit === "diamonds" || players[i].cards[1].suit === "hearts"){
			$(idBase2).addClass("red-card");
		}
		


		console.log(idBase1);
		console.log(idBase2);
		// var idp = idBase + " p";
		// var idh = idBase + " h4";
		

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


// console.log("**********" + players);

// dealFlop();

// console.log(deck[0]);
// console.log(communityCards[1]);
// console.log(communityCards);
// console.log(deck);
// console.log(players);

// console.log("Players " + players);

// console.log("player cards " + players[0].cards);
// for(i=0; i<3; i++) {

// 	console.log("Commpunity cards " + communityCards[i].suit);
// 	console.log("Commpunity cards " + communityCards[i].number);
// }