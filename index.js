// This event listener ensures that the code inside it runs only after the HTML document has been fully loaded.selectedTeamTitle
document.addEventListener('DOMContentLoaded', function() {
  // These variables store references to specific elements in the HTML document using their IDs.
  const characterList = document.getElementById('character-list'); // Reference to the character list container
  const selectedTeam = document.getElementById('selected-team'); // Reference to the selected team container
  const characterDetails = document.getElementById('character-details'); // Reference to the character details container
  const selectedThumbnail = document.getElementById('selected-thumbnail'); // Reference to the selected thumbnail container
  let selectedCharacters = []; // Array to store selected characters
  const charactersPerPage = 20; // Number of characters to display per page
    let currentPage = 1; // Current page number

  // adding a title to selected character box
const selectedTeamTitle = document.createElement('div');
selectedTeamTitle.style.position = 'absolute';
selectedTeamTitle.style.zIndex = '10';
selectedTeamTitle.innerHTML = 'NAME YOUR SQUAD!';
selectedTeamTitle.classList.add('selected-team-title');
selectedTeam.appendChild(selectedTeamTitle);
 
// Function to submit team name
 const submitButton = document.getElementById('submit-team-name')
 submitButton.classList.add('submit-team-name'); // Add a CSS class to the submit button

 submitButton.addEventListener('click', function(event) {
     event.preventDefault();
     submitTeamName()
 })
function submitTeamName() {
  const teamNameInput = document.getElementById('team-name-input');
  const newTeamName = teamNameInput.value
  if (newTeamName !== '') {
      selectedTeamTitle.textContent = newTeamName;
  } else {
      alert('Please enter a valid squad name.');
  }
}
// Reference to the search box
const searchBox = document.getElementById('searchBox');

// Add event listener for input in the search box
searchBox.addEventListener('input', function() {
    const searchTerm = searchBox.value.toLowerCase(); // Get the search term and convert to lowercase for case-insensitive search
    const filteredCharacters = window.characterData.chars.filter(character => character.name.toLowerCase().includes(searchTerm)); // Filter characters based on search term
    renderCharacterList(filteredCharacters); // Render the filtered character list
});

function fetchCharacters() {
  const startIndex = (currentPage - 1) * charactersPerPage;
  const endIndex = startIndex + charactersPerPage;
  fetch('db.json')
      .then(response => response.json())
      .then(data => {
          const charactersToDisplay = data.chars.slice(startIndex, endIndex);
          renderCharacterList(charactersToDisplay);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}

function renderCharacterList(characters) {
  characterList.innerHTML = '';
  characters.forEach(character => {
      const characterItem = document.createElement('div');
      characterItem.classList.add('character-item');

      const characterThumbnail = document.createElement('img');
      characterThumbnail.src = character.image;
      characterThumbnail.alt = character.name;
      characterThumbnail.classList.add('character-thumbnail');

      characterThumbnail.addEventListener('click', () => {
          displayCharacterDetails(character);
          displayThumbnail(character);
      });

      characterThumbnail.addEventListener('mouseover', () => {
          characterThumbnail.title = character.name;
      });
      

        const addToTeamBtn = document.createElement('button'); // Create a button to add the character to the user's team
        addToTeamBtn.textContent = 'Add to Team'; // Set the button text content
        // Add an event listener to the button to add the character to the team when clicked
        addToTeamBtn.addEventListener('click', () => addToTeam(character));

        // Append the thumbnail image and 'Add to Team' button to the character container
        characterItem.appendChild(characterThumbnail);
        characterItem.appendChild(addToTeamBtn);
        // Append the character container to the character list in the HTML document
        characterList.appendChild(characterItem);
      });
    }
  
  // This function displays the details of a selected character.
  function displayCharacterDetails(character) {
   //update the content of the table with character information
   document.getElementById('insertName').textContent = character.name;
   document.getElementById('insertStatus').textContent = character.status;
   document.getElementById('insertSpecies').textContent = character.species;
   document.getElementById('insertType').textContent = character.type || 'N/A';
   document.getElementById('insertGender').textContent = character.gender;
   document.getElementById('insertOrigin').textContent = character.origin.name;
   document.getElementById('insertLocation').textContent = character.location.name;
   document.getElementById('character-details-table').style.display = 'block';
  }

  // This function adds a character to the user's team.
  function addToTeam(character) {
    if (selectedCharacters.length >= 5) { // Check if the team already has 5 characters
      alert('You can only select up to 5 characters for your team.'); // Display an alert if the team is full
      return; // Exit the function
    }

    const existsInTeam = selectedCharacters.some(char => char.id === character.id); // Check if the selected character is already in the team
    if (existsInTeam) {
      alert('This character is already in your team.'); // Display an alert if the character is already in the team
      return; // Exit the function
    }

    // If the character is not already in the team, add it to the team array
    const characterToAdd = { id: character.id, name: character.name, image: character.image };
    selectedCharacters.push(characterToAdd);

    renderSelectedTeam(); // Call the function to render the updated team
  }

  // This function removes a character from the user's team.
  function removeFromTeam(characterId) {
    selectedCharacters = selectedCharacters.filter(char => char.id !== characterId); // Remove the character with the specified ID from the team
    renderSelectedTeam(); // Call the function to render the updated team
  }

  // This function renders the selected team in the HTML document.
  function renderSelectedTeam() {
     // Clear the selected team container
    selectedTeam.innerHTML = '';
    selectedCharacters.forEach(character => { // Iterate over each character in the selected team
      const selectedCharacter = document.createElement('div'); // Create a container for the selected character
      selectedCharacter.classList.add('selected-character'); // Add a CSS class to the selected character container

      const characterThumbnail = document.createElement('img'); // Create an image element to display the character thumbnail
      characterThumbnail.src = character.image; // Set the image source
      characterThumbnail.alt = character.name; // Set the alt attribute

      const removeBtn = document.createElement('button'); // Create a button to remove the character from the team
      removeBtn.textContent = 'X'; // Set the button text content
      removeBtn.addEventListener('click', () => removeFromTeam(character.id)); // Add an event listener to the button to remove the character from the team when clicked

      // Append the thumbnail image and 'Remove' button to the selected character container
      selectedCharacter.appendChild(characterThumbnail);
      selectedCharacter.appendChild(removeBtn);
      // Append the selected character container to the selected team section in the HTML document
      selectedTeam.appendChild(selectedCharacter);
      selectedTeam.appendChild(selectedTeamTitle)

    });

  
  }

  // This function displays the clicked character thumbnail.
  function displayThumbnail(character) {
    selectedThumbnail.innerHTML = ''; // Clear previous contents
    const clickedCharacterThumbnail = document.createElement('img'); // Create an image element for the clicked character thumbnail
    clickedCharacterThumbnail.src = character.image; // Set the image source
    clickedCharacterThumbnail.alt = character.name; // Set the alt attribute
    selectedThumbnail.appendChild(clickedCharacterThumbnail); // Append clicked thumbnail to the selected thumbnail container
  }

  // This function clears the character details section in the HTML document and the selected thumbnail.
  function resetCharacterDetails() {
    characterDetails.innerHTML = ''; // Clear the character details section in the HTML
    selectedThumbnail.innerHTML = ''; // Clear the selected thumbnail container
  }

  function handlePagination(page) {
    currentPage = page;
    fetchCharacters();
}
  // Call resetCharacterDetails to clear details on load
  resetCharacterDetails();
  fetchCharacters();

    // Pagination buttons event listeners
    document.getElementById('page-1').addEventListener('click', () => handlePagination(1));
    document.getElementById('page-2').addEventListener('click', () => handlePagination(2));
    document.getElementById('page-3').addEventListener('click', () => handlePagination(3));
    document.getElementById('page-4').addEventListener('click', () => handlePagination(4));
});