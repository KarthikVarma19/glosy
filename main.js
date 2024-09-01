function localStorageClear() {
  localStorage.removeItem('recentWords');
  document.getElementById("recentContainers").innerHTML = "";
}

let searchElement = document.getElementById("searchInput");
searchElement.addEventListener("keyup", () => {
  let searchWordTextElement = document.getElementById("searchWordText");
  let searchElement = document.getElementById("searchInput");
  let word = searchElement.value.trim();
  if (word === "") {
    searchWordTextElement.textContent = "Your Word Will Appear Here";
  }
  searchWordTextElement.textContent = word;
});

let recentWords = [];

let addInRecentTabs = (recentWord, recentDefinition) => {
  let url = "https://www.google.com/search?q=" + recentWord;
  let box = `<div class='m-2 col-12 col-md-5 col-lg-3 recent-box'> 
                <h5 class='headingInRecentTab'> Word: 
                    <a target='_blank' id='wordId' class='hover: underline' href= ${url}>${recentWord} </a>
                </h5>
                <hr/>
                <p >Meaning: 
                    <span id = 'meaningId' class='meaningInRecentTab'>${recentDefinition}</span>
                </p>
            </div>`;

  let recentContainers = document.getElementById("recentContainers");
  recentContainers.innerHTML = box + recentContainers.innerHTML;
};

if (localStorage.getItem("recentWords") !== null) {
  recentWords = JSON.parse(localStorage.getItem("recentWords"));

  for (let eachRecentObject of recentWords) {
    let recentWord = eachRecentObject["word"];
    let recentDefinition = eachRecentObject["definiton"];
    addInRecentTabs(recentWord, recentDefinition);
  }
} else {
  localStorage.setItem("recentWords", JSON.stringify(recentWords));
}

let showResponse = (response) => {
  if (response["valid"] === true) {
    const searchWordText = document.getElementById("searchWordText");
    const definition = document.getElementById("definition");
    searchWordText.innerHTML = response.word;
    let definitionText = response.definition
      .replace("2.", "<br/> 2.")
      .replace("3.", "<br/> 3.")
      .replace("4.", "<br/> 4.")
      .replace("5.", "<br/> 5.")
      .replace("6.", "<br/> 6.");
    definition.innerHTML = definitionText.substring(0, 300) + "...";
    let wordObject = {
      word: response.word,
      definiton: definitionText.substring(0, 300) + "...",
    };
    addInRecentTabs(response.word, definitionText.substring(0, 300) + "...");
    recentWords.push(wordObject);
    localStorage.setItem("recentWords", JSON.stringify(recentWords));
  } else {
    alert("Definition Not Found!!");
    searchWordText.innerHTML = "Your Word Will Appear Here";
    return;
  }
};
const dictionary = (word) => {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "db8cce82f3msha6f7003ffbc0ab3p17ac2ajsn10bd971af319",
      "x-rapidapi-host": "dictionary-by-api-ninjas.p.rapidapi.com",
    },
  };

  fetch(
    "https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=" +
      word,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      console.log("Fetched Succesfully");
      showResponse(response); // Function to handle the API response
    })
    .catch((err) => {
      console.error(err); // Handle errors from the fetch call
    });
};

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  let searchElement = document.getElementById("searchInput");
  let wordToBeSearched = searchElement.value.trim();
  searchElement.value = "";
  if (wordToBeSearched === "") {
    //show warning message
    alert("Invalid Input");
  } else {
    //if word is present in recent history or local storage return it
    let presentFlag = false;
    let objWordFound;
    for (let eachWordObject of recentWords) {
      if (eachWordObject["word"] == wordToBeSearched) {
        objWordFound = eachWordObject;
        console.log("present");
        presentFlag = true;
      }
    }
    if (presentFlag === true) {
      //do show it
      const searchWordText = document.getElementById("searchWordText");
      const definitionEle = document.getElementById("definition");
      searchWordText.innerHTML = objWordFound["word"];
      definitionEle.innerHTML = objWordFound["definiton"];
    } else {
      //call the api
      dictionary(wordToBeSearched);
    }
  }
});

let footerYearElement = document.getElementById("footerYear");
footerYearElement.textContent = "© " + new Date().getFullYear() + " Glosy";


let wordsInWordOfTheDay = [
    {
        word: 'love',
        definition: `1. A feeling of strong attachment induced by that which delights or commands admiration; preëminent kindness or devotion to another; affection; tenderness; as, the love of brothers and sisters. Of all the dearest bonds we prove Thou countest sons' and mothers' love Most sacred, most Thine own. Keble...`
    },
    {
        word: 'serendipity',
        definition: `1. The occurrence of events by chance in a happy or beneficial way. Example: Discovering the quaint little café on our road trip was a delightful moment of serendipity.`
    },
    {
        word: 'ephemeral',
        definition: `1. Lasting for a very short time. Example: The beauty of the sunset was ephemeral, fading as quickly as it arrived.`
    },
    {
        word: 'quintessential',
        definition: `1. Representing the most perfect or typical example of a quality or class. Example: She is the quintessential modern woman, balancing career and family effortlessly.`
    },
    {
        word: 'melancholy',
        definition: `1. A deep, persistent sadness or depression; a thoughtful or reflective sadness. Example: There was a note of melancholy in his voice as he spoke of the past.`
    },
    {
        word: 'euphoria',
        definition: `1. A feeling or state of intense excitement and happiness. Example: Winning the championship filled the team with euphoria.`
    },
    {
        word: 'zenith',
        definition: `1. The time at which something is most powerful or successful. Example: The company reached its zenith during the tech boom of the 2000s.`
    },
    {
        word: 'cogent',
        definition: `1. Clear, logical, and convincing. Example: Her argument was cogent and well-supported by evidence.`
    },
    {
        word: 'benevolent',
        definition: `1. Well-meaning and kindly. Example: The benevolent donor funded the new library in the small town.`
    },
    {
        word: 'elucidate',
        definition: `1. To make something clear; to explain. Example: The professor elucidated the complex theory with simple examples.`
    }
];

// Check if there's already a random word stored in localStorage
if (localStorage.getItem('random') !== null) {
    // Retrieve the stored word and definition from localStorage
    let storedWord = JSON.parse(localStorage.getItem('random'));
    let TextInWordOfTheDay = document.getElementById("TextInWordOfTheDay");
    TextInWordOfTheDay.textContent = storedWord.word;
    let definitionInWordOfTheDay = document.getElementById("definitionInWordOfTheDay");
    definitionInWordOfTheDay.textContent = storedWord.definition;
} else {
    // Select a random word from the array
    let randomWord = wordsInWordOfTheDay[Math.floor(Math.random() * wordsInWordOfTheDay.length)];

    // Display the random word and definition
    let TextInWordOfTheDay = document.getElementById("TextInWordOfTheDay");
    TextInWordOfTheDay.textContent = randomWord.word;
    let definitionInWordOfTheDay = document.getElementById("definitionInWordOfTheDay");
    definitionInWordOfTheDay.textContent = randomWord.definition;

    // Store the random word and its definition in localStorage
    localStorage.setItem('random', JSON.stringify(randomWord));
}
