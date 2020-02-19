
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

	$('#pot').html(pot);
	id = "#chip-stack" + p;
	$(id).html(players[p].chipStack);
	
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
