//////////////////////////
///Wiki API Integration///
//////////////////////////
var searchValue = null;
var endpoint = 'https://en.wikipedia.org/w/api.php';

var parameters = {
    origin: '*',
    format: 'json',
    action: 'query',
    prop: 'extracts',
    exintro: true,
    explaintext: true,
    generator: 'search',
    gsrlimit: 1,
};

var submitButton = document.querySelector('#search');
var input = document.querySelector('#searchText');
var wikiTextBox = document.querySelector('#wikiText');
var wikiTitleBox = document.querySelector('.wikiTitle');
var wikiLink = document.querySelector('.wikiLink');

const disableUi = () => {
    input.disabled = true;
    submitButton.disabled = true;
};

const enableUi = () => {
    input.disabled = false;
    submitButton.disabled = false;
};

const clearPreviousResults = () => {
    wikiTextBox.textContent = '';
    wikiTitleBox.textContent = '';
    wikiLink.setAttribute("href", '#');
};

const isInputEmpty = input => {
    if (!input || input === '') return true;
    return false;
};

const showError = (error) => {
    alert(error);
};

const enterKeyPress = (e) => {
    if (e.key === 'Enter') {
        searchArticle();
    }
};

const wikiResult = results => {
    console.log(results);
    wikiTextBox.textContent = results[0].extract;
    wikiTitleBox.textContent = results[0].articleTitle;
    wikiLink.setAttribute("href", `https://en.wikipedia.org/?curid=${results[0].link}`);
};


const getExtract = pages => {
    var results = Object.values(pages).map(page => ({
        extract: page.extract,
        articleTitle: page.title,
        link: page.pageid,
    }));

    wikiResult(results);
};

const searchArticle = async () => {
    var searchValue = input.value;
    if (isInputEmpty(searchValue)) return;
    parameters.gsrsearch = searchValue;
    clearPreviousResults();
    disableUi();
    try {
        const { data } = await axios.get(endpoint,{ params:parameters });
        if (data.error) throw new Error(data.error.info);
        getExtract(data.query.pages);
        enableUi();
    } catch (error) {
        showError(error);
        enableUi();
    }
};

const searchEventHandler = () => {
    input.addEventListener('keydown', enterKeyPress);
    submitButton.addEventListener('click', searchArticle);
};

searchEventHandler();

////////////////////////
///HTML functionality///
////////////////////////

var instance = M.Carousel.init({
  fullWidth: true,
});

/////////////////////////////
///YouTube API Integration///
/////////////////////////////

// *NOTE FOR GABE* \\
// I already set the search text grab up, it's in line 74 and the variable is called searchValue. I believe you can reference it, 
// we can also work tonight to build your fetch into my event listener.

// Devin's youtube API key: AIzaSyApu7PF3orxR1Krl_fgkehmLRmr5jhWPp0
// Gabes youtube API key: AIzaSyBGcs-zAc9WhKvOuKcSsyF8KXUopPe7d6U

fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${"dogs"}&key=AIzaSyBGcs-zAc9WhKvOuKcSsyF8KXUopPe7d6U`)
.then(function(response) {
  return response.json()
})
.then(function(data) {
  console.log(data)
})
