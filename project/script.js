let page = 1;

async function getCharacters() {
    const container = document.querySelector('.container_characters');
    const res = await fetch('https://rickandmortyapi.com/api/character?page=' + page);
    const data = await res.json();
    console.log(data);

    container.innerHTML = ''; 
    data.results.forEach((item) => {
        container.innerHTML += `
        <div class="character_block">
            <img src="${item.image}">
            <div>
                <h2>${item.name}</h2>
                <h2 class="status">Status: ${item.status}</h2>
                <h2 class="status">Species: ${item.species}</h2>
                <h2 class="status">Gender: ${item.gender}</h2>
            </div>
        </div>
        `;
    });
}

getCharacters();

function nextPage() {
    page += 1;
    document.querySelector('.container_characters').innerHTML = ''; 
    document.getElementById('currentPage').innerText = page;
    getCharacters();
}

function backPage() {
    if (page > 1) {
        page -= 1;
        document.querySelector('.container_characters').innerHTML = ''; 
        document.getElementById('currentPage').innerText = page;
        getCharacters();
    }
}

function stopPage() {
    page = 1;
    document.querySelector('.container_characters').innerHTML = ''; 
    document.getElementById('currentPage').innerText = page;
    getCharacters();
}

async function searchCharacter() {
    const name = document.getElementById('characterName').value;
    const container = document.querySelector('.container_characters');
    const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
    const data = await res.json();

    container.innerHTML = ''; 

    if (data.results) {
        data.results.forEach((item) => {
            container.innerHTML += `
            <div class="character_block">
                <img src="${item.image}">
                <div>
                    <h2>${item.name}</h2>
                    <h2 class="status">Status: ${item.status}</h2>
                    <h2 class="status">Species: ${item.species}</h2>
                    <h2 class="status">Gender: ${item.gender}</h2>
                </div>
            </div>
            `;
        });
    } else {
        container.innerHTML = `<h2>Нет таких персонажей</h2>`;
    }
}

async function filterByStatus() {
    const status = document.getElementById('characterStatus').value.toLowerCase();
    const container = document.querySelector('.container_characters');
    const res = await fetch(`https://rickandmortyapi.com/api/character/?status=${status}`);
    const data = await res.json();

    container.innerHTML = ''; 

    if (data.results) {
        data.results.forEach((item) => {
            container.innerHTML += `
            <div class="character_block">
                <img src="${item.image}">
                <div>
                    <h2>${item.name}</h2>
                    <h2 class="status">Status: ${item.status}</h2>
                    <h2 class="status">Species: ${item.species}</h2>
                    <h2 class="status">Gender: ${item.gender}</h2>
                </div>
            </div>
            `;
        });
    } else {
        container.innerHTML = `<h2>Персонажи со статусом не найдены "${status}"</h2>`;
    }
}