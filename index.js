


// display the image to the page
// create a new image div, append image to image div
//^ did this in rr, toy tale 
// apply a click event to each photo
// take the attribute info of each character and display it in the attribute box once photo is clicked0
// when photo is clicked, a larger image of photo appears next to attribute box
// add to squad 
//POSITIONING THINGS ON PAGE: HTML; CERTAIN WIDTH HEIGHT MARGIN COLOR: CSS

document.addEventListener('DOMContentLoaded', function() {
    const characterList = document.getElementById('character-list'); //reference to character list container
    const selectedTeam = document.getElementById('selected-team') //reference to the selected team container
    const characterDetails = document.getElementById('character-details')//reference to character details container
    const selectedThumbnail = document.getElementById('selected-thumbnail')//reference to selected thumbnail container
    let selectedCharacters= [];

    //adding a title to selected characters box (SQUAD)
    const selectedTeamTitle = document.createElement('div'); //creates a div element for chosen name
    selectedTeamTitle.textContent = 'YOUR SELECTED TEAM'; //set the text content of the title
    selectedTeamTitle.classList.add('selected-team-title'); //add a CSS class to the title element
    selectedTeam.appendChild(selectedTeamTitle) //append the title to the selected team container
    
//fetch data from db.json and process it
fetch('db.json')
    .then(response => response.json()) //convert the fetched response to json format
    .then(data => {
        data.characters.forEach(character => {
            const characterItem = document.createElement('div')//create a container for every character in the list
            characterItem.classList.add('character-item');//add a CSS class to the character container

            const characterThumbnail = document.creasteElement('img');//create an img element for the char thumbnail
            characterThumbnail.src = character.image; //set the image source
            characterThumbnail.alt = character.name; // set alt attribute
            characterThumbnail.classList.add('character-thumbnail'); //add a CSS class to the thumbnail image

            //add an Event Listener to the thumbnail image to display character details and thumbnail when clicked
            characterThumbnail.addEventListener('click', () => {
                displayCharacterDetails(character);
                displayThumbnail(character);
            });
            const addToTeamBtn = document.createElement('button');
            addtoTeamBtn = 'Add to Squad';// set button text content
            addToTeamBtn.addEventListener('click', () => addToTeam(character)); //add event listener to add the character to the team when clicked
            
            characterItem.appendChild(characterThumbnail); //append thumbnail image to character container
            characterItem.appendChild(addToTeamBtn); //append button to character container
            characterItem.appendChild(characterItem); // append the character container to the character list in HTML
        
        });
        .catch(error => {
            console.error('Error fetching data'; error)//log any errors that may occur during fetch proccess
        });
 function displayCharacterDetails (character) {//displays details of selected character
    characterDetails.innerHTML =   `
        <h2>${character.name}</h2>
        <div class="character-attributes">
        <div><strong>Status:</strong> ${character.status}</div>
        <div><strong>Species:</strong> ${character.species}</div>
        <div><strong>Type:</strong> ${character.type || 'N/A'}</div>
        <div><strong>Gender:</strong> ${character.gender}</div>
        <div<strong>Origin:</strong> ${character.origin}</div>
        <div><strong>Location:</strong> ${character.location.name}</div>
        </div>
        `;
 }
 function addToTeam(character) { //DOES CHARACTER NEED TO BE selectedCharacters???? ******************************
    if (selectedCharacters.length >= 5) { //check if team already has 5 characters
        alert('You can only select up to 5 characters for your squad.'); //display an alert if team is full
        return;
    }
const existsInTeam = selectedCharacters.some(character => character.id === character.id);
if (existsinTeam){
    alert('This character is already in your squad');//display alert if character is already in squad
}
const characterToAdd = { id: character.id, name: character.name, image: character.image };
selectedCharacters.push(characterToAdd);


 }

    })

})