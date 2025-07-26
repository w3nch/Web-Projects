const api_Url_Random = "https://api.quotable.io/random";
const api_Url_Search = "https://api.quotable.io/search/quotes?query=";

const quote_Text = document.querySelector("#quote");
const author_Text = document.querySelector("#author");
const btn = document.querySelector("#new-quote-btn");
const search_btn = document.querySelector("#search-btn");
const input = document.querySelector("#search-input");

// Fetch a random quote
function random_quotes() {
    fetch(api_Url_Random)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            quote_Text.textContent = `"${data.content}"`;
            author_Text.textContent = `— ${data.author}`;
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
            quote_Text.textContent = "Error fetching quote.";
            author_Text.textContent = "";
        });
}

// Search for a quote
function search_quotes() {
    const value = input.value.trim();
    if (!value) {
        quote_Text.textContent = "Please enter a search term.";
        author_Text.textContent = "";
        return;
    }

    console.log("Searching for:", value);

    fetch(api_Url_Search + encodeURIComponent(value))
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            if (data.results && data.results.length > 0) {
                const quoteContent = data.results[0].content;
                const authorName = data.results[0].author;

                quote_Text.textContent = `"${quoteContent}"`;
                author_Text.textContent = `— ${authorName}`;
            } else {
                random_quotes(); // Fallback to random quote if no results found
            }
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
            quote_Text.textContent = "Error fetching search results.";
            author_Text.textContent = "";
        });
}

// Run once on page load
random_quotes();

// Event listeners
btn.addEventListener("click", random_quotes);
search_btn.addEventListener("click", search_quotes);
