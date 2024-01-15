
async function fetchStadiumDetails(stadiumId) {
    const response = await fetch(`https://stadium-servers--joao-victorv801.repl.co/stadiums/${stadiumId}`);
    const data = await response.json();
    console.log(data);
    return data;
}

async function fetchPhotos(stadiumId) {
    const response = await fetch(`https://stadium-servers--joao-victorv801.repl.co/photos/?id_stadium=${stadiumId}`);
    const data = await response.json();
    console.log(data);
    return data;
}

async function displayStadiumDetails() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const stadiumId = urlParams.get('id');

        if (!stadiumId) {
            throw new Error('ID do estádio não fornecido.');
        }

        const stadiumDetails = await fetchStadiumDetails(stadiumId);

        const coverStadium = document.getElementById('cover');
        coverStadium.src = stadiumDetails.photos[0].url;
        coverStadium.alt = stadiumDetails.photos[0].description;
        const titleStadium = document.getElementById('title_album');
        titleStadium.textContent = `Álbum ${stadiumDetails.name}`
        const descriptionStadium = document.getElementById('description');
        descriptionStadium.textContent = stadiumDetails.description;
        const locationStadium = document.getElementById('location');
        locationStadium.textContent = stadiumDetails.address;
        const createdAt = document.getElementById('createdAt');
        createdAt.textContent = stadiumDetails.createdAt;

        const photoGallery = document.getElementById('photos');
        const photos = await fetchPhotos(stadiumId);
        // Itera sobre o array de fotos e adiciona-as ao HTML
        photos.forEach(photo => {
            const photoContainer = document.createElement('div');
            photoContainer.classList.add('col-3', 'mb-6', 'container', 'd-flex', 'justify-content-center', 'align-items-center', 'image-container');

            const link = document.createElement('a');
            link.href = `item.html?id=${stadiumId}`; // Substitua por seu link desejado

            const imageContainer = document.createElement('div');
            imageContainer.classList.add('row', 'mr-1');

            const image = document.createElement('img');
            image.classList.add('col-12');
            image.src = photo.url;
            image.alt = "Maracana";

            const imageCaption = document.createElement('div');
            imageCaption.classList.add('image-caption', 'col-12');
            const captionText = document.createElement('p');
            captionText.innerText = photo.description;

            // Adiciona os elementos ao DOM
            photoGallery.appendChild(photoContainer);
            photoContainer.appendChild(link);
            link.appendChild(imageContainer);
            imageContainer.appendChild(image);
            imageContainer.appendChild(imageCaption);
            imageCaption.appendChild(captionText);
        });
    } catch (error) {
        console.error('Erro ao obter detalhes do estádio:', error);
    }
}

displayStadiumDetails();
