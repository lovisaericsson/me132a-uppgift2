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
            artists.splice(i, 1);
            return;
        }
    }
}

//Returns all artists based on their song
function getArtistsBySong(artists, song){
    let artistsBySong = [];
   
    for(let artist of artists){
        if(artist.song.toLowerCase() == song.toLowerCase()){
            artistsBySong.push(artist);
        }
    }
    return artistsBySong;
}

// Returns all artists based on their year
function getArtistsByYear(artists, year){
    let artistsByYear = [];

    for(let artist of artists){
        if(artist.year == year){
            artistsByYear.push(artist);
        }
    }
    return artistsByYear;
}

// Returns all artists based on winner
function getArtistsByWinner(artists, winner){
    let artistsByWinner = [];

    for(let artist of artists){
        if(artist.winner.toLowerCase() == winner.toLowerCase()){
            artistsByWinner.push(artist);
        }
    }
    return artistsByWinner;
}

// Renders a artist object into a HTML-element
function renderArtist(artist){
    let div = document.createElement("div");
    div.classList.add("melodifestivalen");
    div.id = artist.id;

    div.innerHTML = `
    <div>${artist.name}</div>
        <div>${artist.song}</div>
        <div>${artist.year}</div>
        <div>${artist.winner}</div>
        <button type="button">Remove</button>
    `;
    if(div.innerHTML == ""){
        return null;
    }
    return div;
}

//Renders an array of artist into HTML
function renderArtists(artists){
    let artistsElement = document.getElementById("melodifestivalen");
    artistsElement.innerHTML = "";


//Go through all artist and insert their HTML
    for (let artist of artists){
    let artistElement = renderArtist(artist);
    
    if(artistElement != null){
    artistsElement.appendChild(artistElement);
    }

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
    renderArtists(database);

    let form = document.getElementById("add-artist-form");
    form.reset();
}

// Add "click" event handler to < button id ="add">
function setAddArtistHandler(){
    let form = document.getElementById("add-artist-form");
    form.addEventListener("submit", onAddArtistSubmit);
}

// When a user clicks the remove-artist-button 

function onRemoveArtistClick(event){
    let button = event.target;
    let id = button.parentElement.id;
    //Uses the global variable `database``
    removeArtistById(database,id);
    //Re-render (without the newly deleted artist)
    renderArtists(database); 

}

//Add "click" event handler to all remove-buttons
function setRemoveArtistHandlers(){
    let buttons = document.querySelectorAll(".melodifestivalen button");

    for(let button of buttons){
        button.addEventListener("click", onRemoveArtistClick);
    }
}

//Filter artist by song 
function onFilterBySongSubmit(event){
    event.preventDefault();
    //What song?
    let song = document.getElementById("filter-song").value;
    // Get the artists by song 
    let artists = getArtistsBySong(database, song);
    //Re-render them 
    renderArtists(artists); 
}

//Filter artist by year 
function onFilterByYearSubmit(event){
    event.preventDefault();
    //What year?
    let year = document.getElementById("filter-year").value;
    // Get the artists by year 
    let artists = getArtistsByYear(database, year);
    //Re-render them 
    renderArtists(artists); 
}

//Filter artist by winner 
function onFilterByWinnerSubmit(event){
    event.preventDefault();
    //Has the artist won? Yes or no?
    let winner = document.getElementById("filter-winner").value;
    // Ge the artists by winner 
    let artists = getArtistsByWinner(database, winner);
    //Re-render them 
    renderArtists(artists); 
}


function onShowAllClick() {
    document.getElementById("filter-song").value = "";
    document.getElementById("filter-year").value = "";
    document.getElementById("filter-winner").value = "";
    renderArtists(database);
}

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
