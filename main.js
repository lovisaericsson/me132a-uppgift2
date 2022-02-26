"use strict";

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

// Creates a new artist object from prompts
function createNewartistFromPrompt() {
    let name = prompt("Enter the name of the artist");
    let song = prompt("Enter the song of the artist");
    let year = prompt("Enter the year when the artist song this truck");
    let winner = prompt("Enter if the artist won");
    // Now when we have the properties of our artist we can simply re-use our
    // previous function, and at the same time convert `age` to a number, since
    // we receive strings from `prompt`
    let newArtist = createNewartist(name, song, year, winner);
    return newArtist;
}

// Adds a new artist to our database
function addArtistToDatabase(database, artist) {
    database.push(artist);
}

// Removes a artist based on its name from our database
function removeArtistById(artists, id){
    for(let i = 0; i < artists.length;i++){
        let artist = artists [i];
        if(artist.id == id){
            artist.splice(i, 1);
            return;
        }
    }
}

//Returns all artist based on their song

function getArtistsByBreed(artists, song){
    let artistsBySong = [];

    for(let artist of artists){
        if(artist.song.toLowerCase() == song.toLowerCase()){
            artistsBySong.push(artist);
        }
    }
}
// Returns all artist based on their year

function getArtistsByYear(artists, year){
    let artistsByYear = [];

    for(let artist of artists){
        if(artist.year.toLowerCase() == year.toLowerCase()){
            artistsByYear.push(artist);
        }
    }
}

function getArtistsByWinner(artists, winner){
    let artistsByWinner = [];

    for(let artist of artists){
        if(artist.winner.toLowerCase() == winner.toLowerCase()){
            artistsByWinner.push(artist);
        }
    }
}

// Renders a artist object into a HTML-element
function renderArtist(artist){
    let div = document.createElement("div");
    div.classList.add("artist");
    div.id = artist.id;

    div.innerHTML = `
    <div>${artist.name}</div>
        <div>${artist.song}</div>
        <div>${artist.year}</div>
        <div>${artist.winner}</div>
        <button type="button">Remove</button>
    `;
    return div;
}

//Renders an array of artist into HTML
function renderArtists(artists){
    let artistsElement = document.getElementById("melodifestivalen");
    artistsElement.innerHTML = "";


//Go through all artist and insert their HTML
for (let artist of artists){
    let artistsElement = renderArtist(artist);
    artistsElement.appendChild(artistsElement);
  }

// Add remove-handlers for our artist
setRemoveArtistHandlers();
}

//When <form id = "add-artist-form"> is submitted
function onAddArtistSubmit(event){
    event.preventDefault();

    let name = document.getElementById("name").value;
    let song = document.getElementById("song").value;
    let year = document.getElementById("year").value;
    let winner = document.getElementById("winner").value;

    let artist = createNewartist(name, song, year, winner);
    
    artist.id = database[database.length-1].id + 1;

    addArtistToDatabase(database, artist);
    renderArtist(database);

    let form = document.getElementById("add-artist-form");
    form.reset();
}

// Add "click" event handler to < button id ="add">
function setAddArtistHandler(){
    let form = document.getElementById("add-artist-form");
    form.addEventListener("submit", onAddArtistSubmit);
}

//When a user clicks the remove-dog-buttons
function setRemoveArtistHandlers(){
    let buttons =document.querySelectorAll(".melodifestivalen button");

    for(let button of buttons){
        button.addEventListener("click", onRemoveArtistClick);
    }
}

function onShowAllClick() {
    document.getElementById("filter-breed").value = "";
    document.getElementById("filter-age").value = "";
    renderArtists(database);
}

function setFilterDogHandlers() {
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
renderArtist(database);
setAddArtistsHandler();
setFilterArtistHandlers();
