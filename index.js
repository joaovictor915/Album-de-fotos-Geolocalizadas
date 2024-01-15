async function fetchData() {
    const response = await fetch(`https://stadium-servers--joao-victorv801.repl.co/stadiums`);
    const data = await response.json();
    return data;
  }
  
  let stadiums;
  
  async function fetchFilms () {
    try {
      console.log("ansc");
      stadiums = await fetchData();
      console.log(stadiums);
  
    } catch (e) {
      console.log(e);
    }
  }


mapboxgl.accessToken = 'pk.eyJ1IjoianZtYXJ0aW5zcHVjIiwiYSI6ImNscG9vd3F0ajBpa24yaWtoODF6MWUxNnEifQ.Mft9aoVSCrpbHTzh6dtahQ';

// const stadiums = [
//     {
//         name: 'Maracanã', address: 'Rua Professor Eurico Rabelo, Maracanã, Rio de Janeiro, RJ, Brazil',
//     },
//     { name: 'Mineirão', address: 'Avenida Antônio Abrahão Caram, Pampulha, Belo Horizonte, MG, Brazil' },
//     { name: 'Beira Rio', address: 'Avenida Padre Cacique, 891 - Praia de Belas, Porto Alegre, RS, Brazil' },
//     { name: 'Arena do Grêmio', address: 'Avenida Padre Leopoldo Brentano, 110 - Humaitá, Porto Alegre, RS, Brazil' },
//     { name: 'Arena MRV', address: 'Avenida Amazonas, 115 - Gameleira, Belo Horizonte, MG, Brazil', website: 'https://arenamrv.com.br/' },
//     { name: 'NeoQuimica Arena', address: 'Avenida Miguel Ignácio Curi, 111 - Artur Alvim, São Paulo, SP, Brazil' },
//     { name: 'Arena Pantanal', address: 'Avenida Agrícola Paes de Barros, s/n - Verdão, Cuiabá, MT, Brazil' },
//     { name: 'Arena Amazônia', address: 'Avenida Constantino Nery, 5001 - Flores, Manaus, AM, Brazil' }
// ];

fetchFilms();

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-43.2424, -22.9121], // Coordenadas do Brasil
    zoom: 4
});

stadiums.forEach(stadium => {
    // Use o serviço de geocodificação para obter coordenadas a partir do endereço
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(stadium.address)}.json?access_token=${mapboxgl.accessToken}`)
        .then(response => response.json())
        .then(data => {
            const feature = data.features[0];

            if (feature) {
                // Adiciona um marcador para cada estádio
                new mapboxgl.Marker()
                    .setLngLat(feature.center)
                    .setPopup(new mapboxgl.Popup({ offset: 25 })
                    .setHTML(`<h3>${stadium.name}</h3><p>${stadium.address}</p><a href="${stadium.website}" target="_blank">Detalhes</a>`))
                    .addTo(map);
            }
        })
        .catch(error => console.error('Erro de geocodificação:', error));
});