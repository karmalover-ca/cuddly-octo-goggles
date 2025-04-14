const dataURL = 'https://raw.githubusercontent.com/karmalover-ca/cuddly-octo-goggles/refs/heads/master/foundPets.json'; // Replace with your real URL

    fetch(dataURL)
      .then(response => response.json())
      .then(data => {
        const pets = data.pets;
        const tableBody = document.querySelector('#petTable tbody');

        pets.forEach(pet => {
          const row = document.createElement('tr');

          const chipCell = `<td>${pet.chipID}</td>`;
          const ownerCell = `<td>${pet.ownerID}</td>`;
          const ageCell = `<td>${pet.age}</td>`;
          const provinceCell = `<td>${pet.province}</td>`;
          const typeCell = `<td>${pet.type}</td>`;
          
          const char = pet.characteristics;
          const charCell = `<td class="left">Breed: ${char.breed}<br>Colour: ${char.colour}<br>Gender: ${char.gender}</td>`;

          const nameCell = `<td>${pet.Name}</td>`;

          row.innerHTML = chipCell + ownerCell + ageCell + provinceCell + typeCell + charCell + nameCell;
          tableBody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error loading pet data:', error);
      });