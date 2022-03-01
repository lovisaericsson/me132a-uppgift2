"use strict";
// Include the link to your Github Repository here:
// Link: https://github.com/lovisaericsson/me132a-uppgift2 

// Creates a new artist object and then returns it
function createNewartist(name, song, year, winner) {
    let artist = {
        name: name,
        song: song,
        year: year,
        winner: winner,
    };

    return artist;
}

// Adds a new artist to our database
function addArtistToDatabase(database, artist) {
    database.push(artist);
}

// Removes a artist based on its name from our database
function removeArtistById(artists, id) {
    for (let i = 0; i < artists.length;i++) {
        let artist = artists [i];
        if (artist.id == id) {
            artists.splice(i, 1);
            return;
        }
    }
}

// Returns all artists based on their song
function getArtistsBySong(artists, song) {
    let artistsBySong = [];
   
    for (let artist of artists) {
        if (artist.song.toLowerCase() == song.toLowerCase()) {
            artistsBySong.push(artist);
        }
    }

    return artistsBySong;
}

// Returns all artists based on their year
function getArtistsByYear(artists, year) {
    let artistsByYear = [];

    for (let artist of artists) {
        if (artist.year == year) {
            artistsByYear.push(artist);
        }
    }

    return artistsByYear;
}

// Returns all artists based on winner
function getArtistsByWinner(artists, winner) {
    let artistsByWinner = [];

    for (let artist of artists) {
        if (artist.winner.toLowerCase() == winner.toLowerCase()) {
            artistsByWinner.push(artist);
        }
    }

    return artistsByWinner;
}

// Renders a artist object into a HTML-element
function renderArtist(artist, row) {
    let div = document.createElement("div");
    div.classList.add("melodifestivalen");
    div.id = artist.id;

    div.innerHTML = `
        <div>${row}</div>
        <div>${artist.name}</div>
        <div>${artist.song}</div>
        <div>${artist.year}</div>
        <div>${artist.winner}</div>
        <button type="button">Remove</button>
    `;

    return div;
}

// Renders an array of artist into HTML
function renderArtists(artists) {
    let artistsElement = document.getElementById("melodifestivalen");
    artistsElement.innerHTML = "";


// Go through all artist and insert their HTML
    let row = 1;
    for (let artist of artists) {
       let artistElement = renderArtist(artist, row);
       artistsElement.appendChild(artistElement);
       row++;
    }

// Add remove-handlers for our artist
    setRemoveArtistHandlers();
}

// When <form id = "add-artist-form"> is submitted
function onAddArtistSubmit(event) {
    event.preventDefault();
    
    let name = document.getElementById("name").value;
    let song = document.getElementById("song").value;
    let year = document.getElementById("year").value;
    let winner = document.getElementById("winner").value;

// Check if any input is empty then the artist should not be added 
    if (name == "" || song == "" || year == "" || winner == "") {
       alert(`You must fill in all input fields`);
       return null;
    }

    let artist = createNewartist(name, song, year, winner);

// Calculate the newly created artists ID
    artist.id = database[database.length-1].id + 1;

    addArtistToDatabase(database, artist);
    renderArtists(database);

// Reset (empty) all form fields
    let form = document.getElementById("add-artist-form");
    form.reset();
}

// Add "click" event handler to < button id ="add">
function setAddArtistHandler() {
    let form = document.getElementById("add-artist-form");
    form.addEventListener("submit", onAddArtistSubmit);
}

// When a user clicks the remove-artist-button 
function onRemoveArtistClick(event) {
    let button = event.target;
    let id = button.parentElement.id;
    let name = getArtistFromId(database, id);
    let isSure = confirm(`Are you sure you want to remove this artist ${name}?`);

    if (!isSure) {
        return null; 
    } 
    
// To get the artist name from the id in the database 
function getArtistFromId(artists, id) {
    for (let i = 0; i < artists.length;i++) {
        let artist = artists [i];
        if (artist.id == id) {
          return artist.name; 
        }
    }
}

// Uses the global variable `database``
    removeArtistById(database,id);
// Re-render (without the newly deleted artist)
    renderArtists(database); 
}

// Add "click" event handler to all remove-buttons
function setRemoveArtistHandlers() {
    let buttons = document.querySelectorAll(".melodifestivalen button");

    for (let button of buttons) {
        button.addEventListener("click", onRemoveArtistClick);
    }
}

// Filter artist by song 
function onFilterBySongSubmit(event) {
    event.preventDefault();
// What song?
    let song = document.getElementById("filter-song").value;
// Get the artists by song 
    let artists = getArtistsBySong(database, song);
// Re-render them 
    renderArtists(artists); 
}

// Filter artist by year 
function onFilterByYearSubmit(event) {
    event.preventDefault();
// What year?
    let year = document.getElementById("filter-year").value;
// Get the artists by year 
    let artists = getArtistsByYear(database, year);
// Re-render them 
    renderArtists(artists); 
}

// Filter artist by winner 
function onFilterByWinnerSubmit(event) {
    event.preventDefault();
// Has the artist won? Yes or no?
    let winner = document.getElementById("filter-winner").value;
// Ge the artists by winner 
    let artists = getArtistsByWinner(database, winner);
 // Re-render them 
    renderArtists(artists); 
}

// Reset filter 
function onShowAllClick() {
    document.getElementById("filter-song").value = "";
    document.getElementById("filter-year").value = "";
    document.getElementById("filter-winner").value = "";
    renderArtists(database);
}

// Add addEventListner to filter buttons 
function setFilterArtistHandlers() {
    let songForm = document.getElementById("filter-by-song");
    let yearForm = document.getElementById("filter-by-year");
    let winnerForm = document.getElementById("filter-by-winner");
    let showAll = document.getElementById("show-all");

    songForm.addEventListener("submit", onFilterBySongSubmit);
    yearForm.addEventListener("submit", onFilterByYearSubmit);
    winnerForm.addEventListener("submit", onFilterByWinnerSubmit);
    showAll.addEventListener("click", onShowAllClick);
}

// Initialize the page
renderArtists(database);
setAddArtistHandler();
setFilterArtistHandlers();
