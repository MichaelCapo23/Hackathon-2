class Map {
  constructor() {
    this.mapElement = '#map';
    this.origin = null;
    this.locations = [];
  }

  setLocations(locations) {
    this.locations = locations;
  }

  setOrigin(callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.origin = { lat: position.coords.latitude, lng: position.coords.longitude };
        callback();
      });
    }
  }

  getOrigin() {
    return this.origin;
  }

  initMap() {
    $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCDnACGfvcJvr6XTbNAPz8U_iXlJ2ekgqE', () => this.drawMap());
  }

  drawMap() {
    const display = new google.maps.Map(document.getElementById('map'));
    const bounds = new google.maps.LatLngBounds();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude: lat, longitude: lng } = position.coords;

        bounds.extend(new google.maps.LatLng(lat, lng));

        const marker = new google.maps.Marker({
          position: { lat, lng },
          map: display,
          title: 'Your location',
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            scaledSize: new google.maps.Size(40, 40),
          }
        });

        const infoWindow = new google.maps.InfoWindow({ content: 'You' });

        marker.addListener('click', () => infoWindow.open(display, marker));

        display.fitBounds(bounds);
      });
    }

    this.locations.forEach(location => {
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: display,
        title: location.venue,
      });

      bounds.extend(new google.maps.LatLng(location.lat, location.lng));

      const price = location.price ? `<p>${location.price}</p>` : '';
      
      const contentString =
        `<div id="infoContent">
          <h1 class="infoHeading">${location.venue}</h1>
          <div id="infoBody">
            <p>${location.website}</p>
            <p>${location.date}</p>
            <p>${location.address}</p>
            ${price}
          </div>
        </div>`;

      const infoWindow = new google.maps.InfoWindow({ content: contentString });

      marker.addListener('click', () => infoWindow.open(display, marker));

      display.fitBounds(bounds);
    });
  }
}
