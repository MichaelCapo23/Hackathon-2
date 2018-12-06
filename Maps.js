class Map {
  constructor() {
    this.mapElement = '#map';
    this.options = {
      center: { lat: 33.7222, lng: -116.3745 },
      zoom: 7,
    }
    this.origin = null;
    this.locations = [
      {
        venue: 'Cochella',
        lat: 33.6803,
        lng: -116.1739,
        address: 'address',
        date: '12/25/18',
        website: 'concert.com',
        price: '$100',
      },
      {
        venue: 'Indio',
        lat: 33.7206,
        lng: -116.2156,
        address: 'address',
        date: '12/25/18',
        website: 'concert.com',
        price: '$100',
      },
      {
        venue: 'Michael\'s house',
        lat: 39.969938,
        lng: -75.160278,
        address: 'address',
        date: '12/25/18',
        website: 'concert.com',
        price: '$100',
      },
    ];
  }

  setOrigin({ lat, lng }) {
    this.options.center = { lat, lng };
  }

  setLocationsAndInfo(locations) {
    this.locations = locations;
  }
}

function initMap() {
  const map = new Map();
  const display = new google.maps.Map(document.getElementById('map'), map.options);
  const bounds = new google.maps.LatLngBounds();
  let infoWindow = new google.maps.InfoWindow();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude: lat, longitude: lng  } = position.coords;

      marker = new google.maps.Marker({
        position: { lat, lng },
        map: display,
        title: 'Your location',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          scaledSize: new google.maps.Size(40, 40),
        }
      });

      infoWindow = new google.maps.InfoWindow({ content: 'You' });

      marker.addListener('click', () => infoWindow.open(display, marker));
    });
  }

  map.locations.forEach(location => {
    let marker = new google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: display,
      title: location.venue,
    });

    bounds.extend(new google.maps.LatLng(location.lat, location.lng));

    const contentString = 
      `<div id="infoContent">
        <h1 class="infoHeading">${location.venue}</h1>
        <div id="infoBody">
          <p>${location.website}</p>
          <p>${location.date}</p>
          <p>${location.address}</p>
          <p>${location.price}</p>
        </div>
      </div>`;
    
    infoWindow = new google.maps.InfoWindow({ content: contentString });

    marker.addListener('click', () => infoWindow.open(display, marker));

    display.fitBounds(bounds);
  });
}
