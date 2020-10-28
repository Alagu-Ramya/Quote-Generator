const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show loading
function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

//Hide loading

function complete() {
	if (!loader.hidden) {
		quoteContainer.hidden = false;
		loader.hidden = true;
	}
}

//Get Quote from API
async function getQuote() {
	loading();

	const proxyURL = 'https://cors-anywhere.herokuapp.com/';

	const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

	try {
		const response = await fetch(proxyURL + apiURL);
		const data = await response.json();

		//If author is blank add Unknown

		if (data.quoteAuthor === '') {
			authorText.innerText = 'Unknown';
		} else {
			authorText.innerText = data.quoteAuthor;
		}

		console.log(data);

		//Reduce font size for long quote

		if (data.quoteText.length > 120) {
			quoteText.classList.add('long-quote');
		} else {
			quoteText.classList.remove('long-quote');
		}

		quoteText.innerText = data.quoteText;
		//Stop loader and Show quote
		complete();
	} catch (error) {
		getQuote();
		//console.log('whoopsie, no quote', error);
	}
}

//Tweet Quote

function tweetQuote() {
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
	window.open(twitterURL, '_blank');
}

//Event Listeners

twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuote();
