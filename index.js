document.addEventListener('DOMContentLoaded', function() {
    const characterList = document.getElementById('character-list');
    const selectedTeam = document.getElementById('selected-team');
    const characterDetails = document.getElementById('character-details');
    const selectedThumbnail = document.getElementById('selected-thumbnail');
    let selectedCharacters = [];
    const charactersPerPage = 20; // Number of characters to display per page
    let currentPage = 1; // Current page number

    const selectedTeamTitle = document.createElement('div');
    selectedTeamTitle.textContent = 'YOUR SELECTED TEAM';
    selectedTeamTitle.classList.add('selected-team-title');
    selectedTeam.appendChild(selectedTeamTitle);

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
        document.getElementById('character-details-table').style.display = 'block';
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

    function handlePagination(page) {
        currentPage = page;
        fetchCharacters();
    }

    resetCharacterDetails();
    fetchCharacters();

    // Pagination buttons event listeners
    document.getElementById('page-1').addEventListener('click', () => handlePagination(1));
    document.getElementById('page-2').addEventListener('click', () => handlePagination(2));
    document.getElementById('page-3').addEventListener('click', () => handlePagination(3));
    document.getElementById('page-4').addEventListener('click', () => handlePagination(4));
});