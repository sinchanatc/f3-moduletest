function getCurrentImageOfTheDay() {
    const apiKey = "OJ0yodINdYyttpaOevLl3p21Rl4OM27FtfuGCcgp";
    const currentDate = new Date().toISOString().slice(0, 10);

    fetch(`https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const currentImageContainer = document.getElementById("current-image-container");
            currentImageContainer.innerHTML = `
            <h1>NASA Picture of the Day</h1>
            <img src="${data.url}" alt="${data.title}">
            <h3>${data.title}</h3>
            <p>${data.explanation}</p>
        `;
        })
        .catch(error => console.log(error));
}


function getImageOfTheDay(selectedDate) {
    const apiKey = "OJ0yodINdYyttpaOevLl3p21Rl4OM27FtfuGCcgp";

    fetch(`https://api.nasa.gov/planetary/apod?date=${selectedDate}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const currentImageContainer = document.getElementById("current-image-container");
            currentImageContainer.innerHTML = `
            <h1>Picture On ${data.date}</h1>
            <img src="${data.url}" alt="${data.title}">
            <h3>${data.title}</h3>
            <p>${data.explanation}</p>
        `;

            saveSearch(selectedDate);
            addSearchToHistory(selectedDate);
        })
        .catch(error => console.log(error));
}

function saveSearch(date) {
    const searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
}

function addSearchToHistory(date) {
    const searchHistory = document.getElementById("search-history");
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = "javascript:void(0)";
    link.textContent = date;
    link.addEventListener("click", function() {
        getImageOfTheDay(date);
    });
    li.appendChild(link);
    searchHistory.appendChild(li);
}


document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const selectedDate = document.getElementById("search-input").value;
    const currentDate = new Date().toISOString().split("T")[0];

    if (selectedDate > currentDate) {
        alert("Invalid date selection. Please select a date the current date.");
        return;
    }
    getImageOfTheDay(selectedDate);
});

getCurrentImageOfTheDay();
