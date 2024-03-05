// const charIndex = document.getElementById('char-index');
// const detailImg = document.querySelector('.detail-image img');
// const detailName = document.querySelector('.detail-image .name');
// const imageOptions = document.querySelectorAll('.image-option');
// const imagePreview = document.getElementById('image-preview');
// let curChar = 0;
// const url = "http://localhost:5500";
// const charDetail = document.getElementById('char-detail');


// // Function to handle form submission for adding a new character
// const addSubmitListener = (e) => {
//   e.preventDefault();
//   // Create a new character object from form data
//   const newChar = {
//     name: e.target.name,
//     image: e.target.image,
//   };

//   // Add the new character to the index and display it
//   addCharToIndex(newChar);
// };

// // Function to add a character to the index
// const addCharToIndex = (char) => {
//   const charImg = document.createElement('img');
//   charImg.src = char.image;
//   charImg.className = "index-img";

//   charIndex.append(charImg);
//   charImg.addEventListener('click', () => handleClick(char));
// };

// // Function to handle form submission for editing a character
// const editSubmitListener = (e) => {
//   e.preventDefault();
//   // Update the character details
//   detailName.textContent = e.target.name;
//   detailImg.src = e.target.image;
// };

// // Function to display characters
// const displayChars = () => {
//   fetch(`${url}/chars`)
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       } else {
//         console.error('something went wrong');
//       }
//     })
//     .then(chars => {
//       chars.forEach(char => {
//         addCharToIndex(char);
//       });
//     })
//     .catch(err => console.error('something went wrong'));


// const main = () => {
//   // Invoke displayChars here
//   displayChars();

//   // Add event listeners for form submissions
//   const newCharForm = document.getElementById('new-char');
//   newCharForm.addEventListener('submit', addSubmitListener);

//   const editForm = document.getElementById('edit-char');
//   editForm.addEventListener('submit', editSubmitListener);

//   // Add event listeners for image selection
//   imageOptions.forEach(option => {
//     option.addEventListener('click', () => handleImageSelect(option.dataset.name, option.dataset.image));
//   });
// };

// const handleImageSelect = (name, imageURL) => {
//   // Update the name and image in the form
//   document.getElementById('new-name').value = name;
//   imagePreview.style.backgroundImage = `url('${imageURL}')`;
// };

// main();

// export {
//   displayChars,
//   addSubmitListener,
//   handleClick,
//   main,
// };




// // Function to create and add event listeners for character images
// function addEventListenersForCharacters() {
//     fetchCharacterData()
//     .then(characters => {
//         const container = document.getElementById('character-container');
//         characters.forEach(character => {
//             const characterDiv = document.createElement('div');
//             characterDiv.classList.add('character');
//             characterDiv.id = `character-${character.id}`;
//             characterDiv.innerHTML = `<img src="${character.image}" alt="${character.name}"/>`;
//             characterDiv.addEventListener('click', () => handleClick(character.id));
//             container.appendChild(characterDiv);
//         });
//     } catch (error) {
//         console.error('Error adding event listeners for characters:', error);
//     }
// }



// // Function to display character information in a separate box
// function showCharacterInfo(character) {
//     const characterInfo = document.getElementById('character-info');
//     characterInfo.innerHTML = `
//         <h2>${character.name}</h2>
//         <p>Status: ${character.status}</p>
//         <p>Species: ${character.species}</p>
//         <p>Type: ${character.type || 'N/A'}</p>
//         <p>Gender: ${character.gender}</p>
//         <p>Origin: ${character.origin.name}</p>
//     `;
//     characterInfo.style.display = 'block'; // Display the character info box
// }

// // Function to handle click event on character images
// function handleClick(characterId) {
//     fetchCharacterData()
//     .then(characters => {
//         const characters = characters.find(char => char.id === characterId)
//         if (character) {
//            showCharacterInfo(character); // Display character information
//         } else {
//             console.error('Character not found');
//         }
//     } catch (error) {
//         console.error('Error handling click event:', error);
//     }
// }