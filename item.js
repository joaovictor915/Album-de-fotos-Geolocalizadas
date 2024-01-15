async function fetchStadiumDetails(stadiumId) {
    const response = await fetch(`https://stadium-servers--joao-victorv801.repl.co/photos/?id_stadium=${stadiumId}`);
    const data = await response.json();
    console.log(data);
    return data;
}

async function render() {
    const urlParams = new URLSearchParams(window.location.search);
    const stadiumId = urlParams.get('id');

    if (!stadiumId) {
        throw new Error('ID do estádio não fornecido.');
    }

    const photos = await fetchStadiumDetails(stadiumId);
    // Adicione dinamicamente os indicadores e itens do carrossel
    photos.forEach((photo, index) => {
        const image = document.getElementById(`photo${index+1}`);
        console.log(`$photo${index+1}`);
        image.classList.add('d-block', 'w-100');
        image.src = photo.url;
        image.alt = photo.alt;
    });
}

render();
