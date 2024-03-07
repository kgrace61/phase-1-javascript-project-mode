// This event listener ensures that the code inside it runs only after the HTML document has been fully loaded.
document.addEventListener('DOMContentLoaded', function() {
  // Get references to specific elements in the HTML document using their IDs.
  const characterList = document.getElementById('character-list'); // Reference to the character list container
  const selectedTeam = document.getElementById('selected-team'); // Reference to the selected team container
  const characterDetails = document.getElementById('character-details'); // Reference to the character details container
  const selectedThumbnail = document.getElementById('selected-thumbnail'); // Reference to the selected thumbnail container
  let selectedCharacters = []; // Array to store selected characters
  const charactersPerPage = 20; // Number of characters to display per page
  let currentPage = 1; // Current page number

  // Create a div element for the selected team title and set its initial properties
  const selectedTeamTitle = document.createElement('div');
  selectedTeamTitle.style.zIndex = '10';
  selectedTeamTitle.innerHTML = 'NAME YOUR SQUAD!';
  selectedTeamTitle.classList.add('selected-team-title');
  selectedTeam.appendChild(selectedTeamTitle); // Append the selected team title to the selected team container

  // Define a unique callback function for the mouseover event
  function changeTextColor() {
    // Get a reference to the header title
    const headerTitle = document.querySelector('header h1');
    // Change the text color when the mouse hovers over the header title
    headerTitle.style.color = 'yellow';
  }

  // Get a reference to the header title
  const headerTitle = document.querySelector('header h1');

  // Add a mouseover event listener to the header title with the unique callback function
  headerTitle.addEventListener('mouseover', changeTextColor);

  // Get a reference to the submit button for team name submission
  const submitButton = document.getElementById('submit-team-name');
  submitButton.classList.add('submit-team-name'); // Add a CSS class to the submit button

  // Add an event listener to the submit button to handle team name submission
  submitButton.addEventListener('click', function(event) {
      event.preventDefault();
      submitTeamName();
  });

  // Function to submit the team name
  function submitTeamName() {
      const teamNameInput = document.getElementById('team-name-input');
      const newTeamName = teamNameInput.value;
      if (newTeamName !== '') {
          selectedTeamTitle.textContent = newTeamName;
      } else {
          alert('Please enter a valid squad name.');
      }
  }

  // Get a reference to the search box
  const searchBox = document.getElementById('searchBox');
  // Add event listener for input in the search box
  searchBox.addEventListener('input', function() {
      const searchTerm = searchBox.value.toLowerCase(); // Get the search term and convert to lowercase
      fetchCharacters(searchTerm); // Fetch characters based on the search term
  });

  // Function to fetch characters from the database
  function fetchCharacters(searchTerm = '') {
      const startIndex = (currentPage - 1) * charactersPerPage;
      const endIndex = startIndex + charactersPerPage;
      fetch('db.json')
          .then(response => response.json())
          .then(data => {
              let charactersToDisplay = data.chars; // Get all characters from the database
              if (searchTerm !== '') {
                  charactersToDisplay = charactersToDisplay.filter(character => character.name.toLowerCase().includes(searchTerm)); // Filter characters based on the search term
              }
              charactersToDisplay = charactersToDisplay.slice(startIndex, endIndex); // Slice the characters to display only a certain number per page
              renderCharacterList(charactersToDisplay); // Render the character list
          })
          .catch(error => {
              console.error('Error fetching data:', error); // Log any errors to the console
          });
  }

  // Function to render the character list in the HTML document
  function renderCharacterList(characters) {
      characterList.innerHTML = ''; // Clear the character list container
      characters.forEach(character => { // Iterate over each character
          const characterItem = document.createElement('div'); // Create a container for the character
          characterItem.classList.add('character-item'); // Add a CSS class to the character container

          const characterThumbnail = document.createElement('img'); // Create an image element for the character thumbnail
          characterThumbnail.src = character.image; // Set the image source
          characterThumbnail.alt = character.name; // Set the alt attribute
          characterThumbnail.classList.add('character-thumbnail'); // Add a CSS class to the thumbnail image

          characterThumbnail.addEventListener('click', () => { // Add an event listener to the thumbnail image
              displayCharacterDetails(character); // Display details of the clicked character
              displayThumbnail(character); // Display the clicked character thumbnail
          });

          const addToTeamBtn = document.createElement('button'); // Create a button to add the character to the user's team
          addToTeamBtn.classList.add('addToTeamButton')
          addToTeamBtn.textContent = 'Add to Team'; // Set the button text content
          addToTeamBtn.addEventListener('click', () => addToTeam(character)); // Add an event listener to the button to add the character to the team when clicked

          // Append the thumbnail image and 'Add to Team' button to the character container
          characterItem.appendChild(characterThumbnail);
          characterItem.appendChild(addToTeamBtn);
          // Append the character container to the character list in the HTML document
          characterList.appendChild(characterItem);
      });
  }

  // Function to display the details of a selected character
  function displayCharacterDetails(character) {
      document.getElementById('insertName').textContent = character.name;
      document.getElementById('insertStatus').textContent = character.status;
      document.getElementById('insertSpecies').textContent = character.species;
      document.getElementById('insertType').textContent = character.type || 'N/A';
      document.getElementById('insertGender').textContent = character.gender;
      document.getElementById('insertOrigin').textContent = character.origin.name;
      document.getElementById('insertLocation').textContent = character.location.name;
      document.getElementById('character-details-table').style.display = 'block'; // Display the character details table
  }

  // Function to add a character to the user's team
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

      const characterToAdd = { id: character.id, name: character.name, image: character.image }; // Create an object for the character to add
      selectedCharacters.push(characterToAdd); // Add the character to the team array

      renderSelectedTeam(); // Render the updated team
  }

  // Function to remove a character from the user's team
  function removeFromTeam(characterId) {
      selectedCharacters = selectedCharacters.filter(char => char.id !== characterId); // Remove the character with the specified ID from the team
      renderSelectedTeam(); // Render the updated team
  }

  // Function to render the selected team in the HTML document
  function renderSelectedTeam() {
      selectedTeam.innerHTML = ''; // Clear the selected team container
      selectedTeam.appendChild(selectedTeamTitle); // Append the selected team title to the selected team container
      selectedCharacters.forEach(character => { // Iterate over each character in the selected team
          const selectedCharacter = document.createElement('div'); // Create a container for the selected character
          selectedCharacter.classList.add('selected-character'); // Add a CSS class to the selected character container

          const characterThumbnail = document.createElement('img'); // Create an image element to display the character thumbnail
          characterThumbnail.src = character.image; // Set the image source
          characterThumbnail.alt = character.name; // Set the alt attribute

          const removeBtn = document.createElement('button'); // Create a button to remove the character from the team
          removeBtn.textContent = 'X'; // Set the button text content
          removeBtn.classList.add('removeBtn'); // Add a CSS class to the remove button
          removeBtn.addEventListener('click', () => removeFromTeam(character.id)); // Add an event listener to the button to remove the character from the team when clicked

          // Append the thumbnail image and 'Remove' button to the selected character container
          selectedCharacter.appendChild(characterThumbnail);
          selectedCharacter.appendChild(removeBtn);
          // Append the selected character container to the selected team section in the HTML document
          selectedTeam.appendChild(selectedCharacter);
      });
      
  }

  // Function to display the clicked character thumbnail
  function displayThumbnail(character) {
      selectedThumbnail.innerHTML = ''; // Clear previous contents
      const clickedCharacterThumbnail = document.createElement('img'); // Create an image element for the clicked character thumbnail
      clickedCharacterThumbnail.src = character.image; // Set the image source
      clickedCharacterThumbnail.alt = character.name; // Set the alt attribute
      selectedThumbnail.appendChild(clickedCharacterThumbnail); // Append clicked thumbnail to the selected thumbnail container
  }

  // Function to clear the character details section and the selected thumbnail
  function resetCharacterDetails() {
      characterDetails.innerHTML = ''; // Clear the character details section
      selectedThumbnail.innerHTML = ''; // Clear the selected thumbnail container
  }

  // Function to handle pagination
  function handlePagination(page) {
      currentPage = page; // Update the current page number
      fetchCharacters(); // Fetch characters for the new page
  }

  // Call resetCharacterDetails to clear details on load
  resetCharacterDetails();
  fetchCharacters(); // Fetch characters for the initial page

  // Add event listeners for pagination buttons
  document.getElementById('page-1').addEventListener('click', () => handlePagination(1));
  document.getElementById('page-2').addEventListener('click', () => handlePagination(2));
  document.getElementById('page-3').addEventListener('click', () => handlePagination(3));
  document.getElementById('page-4').addEventListener('click', () => handlePagination(4));
});