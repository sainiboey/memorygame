const gameContainer = document.getElementById("game");

let globalCounter=0;
let firstCounterClassName;
let firstCounterCard;
let scoreCounter=0;
let cardsFlipped=0;
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
     newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  //if the class flipped is present then we donot take any actions
  if (event.target.classList.contains("flipped")) {
    console.log("returning beacuse contain class flipped");
    return;
  }
  if (noClicking) {
    console.log("returning because noClicking is true");
    
    return;
  }
  //local variable
  let currentClass;
  let currentCard;
  //score counter gives the nuber of attempts
  globalCounter++;
  scoreCounter++;
  //Global counter keep track of first or second element flipped
  // you can use event.target to see which element was clicked
  currentClass = event.target.style.backgroundColor = event.target.classList[0];
  console.log(currentClass);
  currentCard=event.target;
  if (globalCounter === 2)
  {
    noClicking = true;
    
    
    if (firstCounterClassName !== currentClass)
    {
      setTimeout(() => {
        firstCounterCard.style.backgroundColor ="white";
        currentCard.style.backgroundColor ="white";
        firstCounterCard.classList.remove("flipped");
        currentCard.classList.remove("flipped");
        globalCounter = 0;
        noClicking = false;
      }, 1000);
    }
    else
    {
      currentCard.removeEventListener("click",handleCardClick);
      firstCounterCard.removeEventListener("click",handleCardClick);
      
      cardsFlipped+=2;
      globalCounter = 0;
    noClicking = false;
    }
    

  }
  else{
     currentCard.classList.add("flipped");
    //event.target.style.backgroundColor = event.target.classList[0];
    firstCounterCard = currentCard;
    firstCounterClassName = currentClass;

  }
  if (cardsFlipped === COLORS.length)
  {
    alert("game ends");
  }
  
  console.log("first round card is ", firstCounterCard);
  console.log("the counter value is",globalCounter);
  console.log("first round class name is ",firstCounterClassName);
  console.log("current class is ",currentClass);
  console.log("current card is ",currentCard);
  //document.querySelector("#yourScore span").innerText=scoreCounter;
}

createDivsForColors(shuffledColors);


