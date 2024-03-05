document.addEventListener('DOMContentLoaded', function() {
    const characterList = document.getElementById('character-list'); 
    const selectedTeam = document.getElementById('selected-team'); 
    const characterDetails = document.getElementById('character-details'); 
    const selectedThumbnail = document.getElementById('selected-thumbnail'); 
    let selectedCharacters = []; 

    const selectedTeamTitle = document.createElement('div'); 
    selectedTeamTitle.textContent = 'YOUR SELECTED TEAM'; 
    selectedTeamTitle.classList.add('selected-team-title'); 
    selectedTeam.appendChild(selectedTeamTitle); 

    fetch('db.json')
      .then(response => response.json()) 
      .then(data => { 
        window.characterData = data;
        renderCharacterList(data.chars);
      })
      .catch(error => {
        console.error('Error fetching data:', error); 
      });

    const searchBox = document.getElementById('searchBox');

    searchBox.addEventListener('input', function() {
        const searchTerm = searchBox.value.toLowerCase(); 
        const filteredCharacters = window.characterData.chars.filter(character => character.name.toLowerCase().includes(searchTerm)); 
        renderCharacterList(filteredCharacters); 
    });

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

            const addToTeamBtn = document.createElement('button'); 
            addToTeamBtn.textContent = 'Add to Team'; 
            addToTeamBtn.addEventListener('click', () => addToTeam(character));

            characterItem.appendChild(characterThumbnail);
            characterItem.appendChild(addToTeamBtn);
            characterList.appendChild(characterItem);
        });
    }

    function displayCharacterDetails(character) {
     document.getElementById('insertName').textContent = character.name;
     document.getElementById('insertStatus').textContent = character.status;
     document.getElementById('insertSpecies').textContent = character.species;
     document.getElementById('insertType').textContent = character.type || 'N/A';
     document.getElementById('insertGender').textContent = character.gender;
     document.getElementById('insertOrigin').textContent = character.origin.name;
     document.getElementById('insertLocation').textContent = character.location.name;
    }
  
    function addToTeam(character) {
      if (selectedCharacters.length >= 5) { 
        alert('You can only select up to 5 characters for your team.'); 
        return; 
      }
  
      const existsInTeam = selectedCharacters.some(char => char.id === character.id); 
      if (existsInTeam) {
        alert('This character is already in your team.'); 
        return; 
      }
  
      const characterToAdd = { id: character.id, name: character.name, image: character.image };
      selectedCharacters.push(characterToAdd);
  
      renderSelectedTeam(); 
    }
  
    function removeFromTeam(characterId) {
      selectedCharacters = selectedCharacters.filter(char => char.id !== characterId); 
      renderSelectedTeam(); 
    }
  
    function renderSelectedTeam() {
      selectedTeam.innerHTML = ''; 
      selectedCharacters.forEach(character => { 
        const selectedCharacter = document.createElement('div'); 
        selectedCharacter.classList.add('selected-character'); 
  
        const characterThumbnail = document.createElement('img'); 
        characterThumbnail.src = character.image; 
        characterThumbnail.alt = character.name; 
  
        const removeBtn = document.createElement('button'); 
        removeBtn.textContent = 'Remove'; 
        removeBtn.addEventListener('click', () => removeFromTeam(character.id)); 
  
        selectedCharacter.appendChild(characterThumbnail);
        selectedCharacter.appendChild(removeBtn);
        selectedTeam.appendChild(selectedCharacter);
      });
    }
  
    function displayThumbnail(character) {
      selectedThumbnail.innerHTML = ''; 
      const clickedCharacterThumbnail = document.createElement('img'); 
      clickedCharacterThumbnail.src = character.image; 
      clickedCharacterThumbnail.alt = character.name; 
      selectedThumbnail.appendChild(clickedCharacterThumbnail); 
    }
  
    function resetCharacterDetails() {
      characterDetails.innerHTML = ''; 
      selectedThumbnail.innerHTML = ''; 
    }
  
    resetCharacterDetails();

});
