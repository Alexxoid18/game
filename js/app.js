/*
 * Set the global variables
 */
const deck = document.querySelector('.deck');
const restart = document.querySelector('.restart');
let listOfOpenedCards = [];
let matches = 0;
const winnerDiv = document.querySelector('.winnerDiv');
const winnerText = document.querySelector('.winnerText');
const playAgain = document.querySelector('.playAgain');
const stars = document.querySelectorAll('.fa-star');
let starsNumber;
/*
 * Variables for timer's functional
 */
let timer = document.querySelector('.timer');
let interval;
let sec = 0;
let min = 0;
let timeStart = false;

/*
 * Initialize movecounter
 */
const moveCounter = document.querySelector('span.moves');
moveCounter.textContent = '0';
let count = 0;

/*
 * Refreshing the page after clicking "refresh" button
 */
restart.onclick = refreshPage;

/*
 * All timer's code collected in one function
 */
function timerStart() {
/*
 * Timer's style and text content 
 */
timer.style.display = "none";
timer.textContent = min + " minutes " + sec + " seconds";   
 
 /*
 * Reset timer
 */
function resetTimer() {
	clearInterval(interval);
	sec = 0;
	min = 0;
}

 /*
 * Start timer
 */
function startTimer() {
	interval = setInterval(function() {
		timer.textContent = min + " minutes " + sec + " seconds ";
		sec++;
		if (sec === 60) {
			min++;
			sec = 0;
		}
	}, 1000)
}

 /*
 * Show timer's block on the page
 */
if (!timeStart) {
		startTimer();
		timeStart = true;
		timer.style.display = "inline-block";
	}
}	

timerStart();

/*
 * Create a list that holds all of your cards
 */
function createList() {
  const listOfCards = document.getElementsByClassName('card');
 	return listOfCards;
}
 
 /*
  * Display the cards on the page
  */
function showCards(createdList) {
  for (let i = 0; i < createdList().length; i++) {
    let cardElement = createdList()[i]; 
  }
}

/*
 * Create an array from the HTMLcollection
 */
function listToArray(createdList) {
	const array = Array.from(createdList());
  return array; 
}
 
 /*
 *   - shuffle the list of cards using the provided "shuffle" method below
 */
 // Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
	    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

showCards(createList);
const initialDeckArray = listToArray(createList);
const array = listToArray(createList);
const shuffledArray = shuffle(array);

/*
 *  Create new deck from shuffled cards
 */
function newDeck() {
  var liOfDeck ='';
  for (let i = 0; i < shuffledArray.length; i++) {
   liOfDeck += shuffledArray[i].outerHTML; 
  }
  deck.innerHTML = liOfDeck;
  return deck;
}

const shuffledDeck = newDeck();

/*Refresh the page*/
function refreshPage() {
  window.location.reload();
} 
 
/*Add classes to flip cards*/
function flipCard(card) {
  card.classList.add('open', 'show');
}
   
/*Add .match and .disabled classes for matching cards*/
function сardsMatch() {
  listOfOpenedCards[0].classList.remove('open', 'show');
  listOfOpenedCards[0].classList.add('match', 'disabled');
  listOfOpenedCards[1].classList.remove('open', 'show');
  listOfOpenedCards[1].classList.add('match', 'disabled');
  listOfOpenedCards = [];
  matches++;
}

/*Remove classes for unmatching cards*/
function cardsNoMatch() {
  setTimeout(function() {
    listOfOpenedCards[0].classList.remove('open', 'show');
    listOfOpenedCards[1].classList.remove('open', 'show');
    listOfOpenedCards = [];
  }, 500)
}

/*Remove stars depending on number of moves*/
function changeStars() {
	if (count === 15) {
		for (let i = 0; i < stars.length - 2; i++) {
			stars[i].parentElement.removeChild(stars[i]);	
		}
		console.log(stars);
	}	
	if (count === 20) {
		for (let i = 1; i < stars.length - 1; i++) {
			stars[i].parentElement.removeChild(stars[i]);	
		}
	}
}

/*Starts counter for clicking cards without .match class*/
function addCount(card) {
  if (!card.classList.contains('match')) {
    count++;
    moveCounter.textContent = count;
  }
  if (count <= 20 && count !== 0) {
        changeStars();
  }
  let numberOfStars = starsRating();
  return numberOfStars;
  }

 /*Return number of stars depending on number of moves*/
function starsRating() {
	if (count < 15) {
		starsNumber = 3;
	}
	else if ((count >= 15) && (count < 20)) {
		starsNumber = 2;
	}
	else starsNumber = 1;
	//console.log(starsNumber);
	return starsNumber;
}	

 
/*Create a list of opened cards*/
shuffledDeck.addEventListener('click', function(event) {
  let card = event.target;

  if (!card.classList.contains('open')) {
    if (listOfOpenedCards.length < 2) {
      flipCard(card);
      listOfOpenedCards.push(card);
    }
    if (listOfOpenedCards.length === 2) {
      addCount(card);
      if (listOfOpenedCards[0].innerHTML === listOfOpenedCards[1].innerHTML) {
        сardsMatch();
      } 
      else {
        cardsNoMatch();
      }
    }
  }
  gameOver();
});
 
/*Congratulation's window appear when all cards are matched*/  
function gameOver(){
  if (matches === 8){
    winnerDiv.style.display ='block';
    winnerText.textContent = 'Congratulations! You are the winner! You completed the game with '+ count + ' moves.\nElapsed time: ' + min + ' minutes and ' + sec + ' seconds! You got ' + starsNumber + ' star(s).';
    playAgain.onclick = refreshPage;
  }
}; 



  
