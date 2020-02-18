
var numPlayers = 5;
var smallBlind = 5;
var players = [];
var pot = 0;




function makePlayers() {
	for (i=0; i<numPlayers; i++) {
		var p = {chipStack: 2500, folded: false, dealer: false, cards:[] };
		players.push(p);
	}
	players[0].dealer = true;
};

makePlayers();
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
		console.log(deck);

	}

	createDeck();
}

newDeck();



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
}
betBlinds();
console.log(players);
console.log("plot " + pot);


var communityCards = [];

// for (i=0; i<numPlayers; i++) {
console.log(deck[1]);

function dealFlop() {
	for(i=0; i<3; i++) {
		communityCards[i] = deck[0];
		deck.shift();
	}
	for(i=0; i<=numPlayers; i++) {
		// players[i].cards = "test";
		// console.log("player cards " + players[i]);
		deck.shift();
		
	}
	
	
}
console.log("**********" + players);

dealFlop();

// console.log(deck[0]);
// console.log(communityCards[1]);
console.log(communityCards);
console.log(deck);
console.log(players);

console.log("Players " + players);

// console.log("player cards " + players[0].cards);
// for(i=0; i<3; i++) {

// 	console.log("Commpunity cards " + communityCards[i].suit);
// 	console.log("Commpunity cards " + communityCards[i].number);
// }