const xmlURL = 'https://raw.githubusercontent.com/karmalover-ca/cuddly-octo-goggles/refs/heads/master/lostPets.xml'; // Replace with your actual XML URL

fetch(xmlURL)
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
    })
    .then(str => (new window.DOMParser()).parseFromString(str, 'text/xml'))
    .then(data => {
        const pets = data.getElementsByTagName('Pet');
        const tableBody = document.querySelector('#petTable tbody');

        for (let pet of pets) {
            const row = document.createElement('tr');

            const chipID = pet.getElementsByTagName('chipID')[0]?.textContent || '';
            const ownerID = pet.getElementsByTagName('ownerID')[0]?.textContent || '';
            const age = pet.getElementsByTagName('age')[0]?.textContent || '';
            const province = pet.getElementsByTagName('province')[0]?.textContent || '';
            const type = pet.getElementsByTagName('type')[0]?.textContent || '';
            const name = pet.getAttribute('Name') || '';

            // Characteristics grouped in one cell
            const characteristics = pet.getElementsByTagName('characteristics')[0];
            let charText = '';
            if (characteristics) {
                const breed = characteristics.getElementsByTagName('breed')[0]?.textContent || '';
                const colour = characteristics.getElementsByTagName('colour')[0]?.textContent || '';
                const gender = characteristics.getElementsByTagName('gender')[0]?.textContent || '';
                charText = `Breed: ${breed}\nColour: ${colour}\nGender: ${gender}`;
            }

            const cells = [chipID, ownerID, age, province, type, charText, name];
            cells.forEach((text, index) => {
                const cell = document.createElement('td');
                cell.textContent = text;
                row.appendChild(cell);

                // Use innerHTML for the Characteristics column (index 5)
                if (index === 5) {
                    cell.innerHTML = text.replace(/\n/g, '<br>');
                    cell.classList.add('left-align');
                } else {
                    cell.textContent = text;
                }
            });

            tableBody.appendChild(row);
        }
    })
    .catch(error => {
        console.error('Error fetching or parsing XML:', error);
    });