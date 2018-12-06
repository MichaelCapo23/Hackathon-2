class Document {
    constructor () {
        this.artistArr = ["eminem", "ariana", "jid"];
        this.attachClickHandlers();
        this.attachClickHandlers = this.attachClickHandlers.bind(this);
        this.grabUsername = this.grabUsername.bind(this);
        this.clearInputField = this.clearInputField.bind(this);
        this.spotifyInstance = new Spotify();
        this.firebaseInstance = new FB();
        this.map = new Map();
        this.ticketsInstance = new Tickets(this.artistArr, this.map);
    }

    attachClickHandlers() {
        $('.submitBtn').click(this.grabUsername);
        console.log('attached clickHandlers');
    }

    grabUsername() {
        this.username = $('.usernameInput').val();
    }

    startApp() {
      const concertData = {
        'ariana': [
          {
            venue: 'abc',
            latlog: { latitude: 33.6803, longitude: -116.1739 },
            city: 'los angeles',
            country: 'United States of America',
            address: '123 lucky street',
            date: '12/25/18',
            time: '19:30:00',
            website: 'https://concert.com',
            pricesRange: {min: 22, max: 99},
          },
          {
            venue: 'Coachella',
            latlog: { latitude: 33.7206, longitude: -116.2156 },
            city: 'los angeles',
            country: 'United States of America',
            address: '123 lucky street',
            date: '12/25/18',
            time: '19:30:00',
            website: 'https://concert.com',
            pricesRange: { min: 22, max: 99 },
          },
        ],
        'jid': [
          {
            venue: 'def',
            latlog: { latitude: 31.6803, longitude: -126.1739 },
            city: 'los angeles',
            country: 'United States of America',
            address: '123 lucky street',
            date: '12/25/18',
            time: '19:30:00',
            website: 'https://concert.com',
            pricesRange: { min: 22, max: 99 },
          },
          {
            venue: 'Cochella',
            latlog: { latitude: 35.7206, longitude: -110.2156 },
            city: 'los angeles',
            country: 'United States of America',
            address: '123 lucky street',
            date: '12/25/18',
            time: '19:30:00',
            website: 'https://concert.com',
            pricesRange: { min: 22, max: 99 },
          },
        ]
      }

      this.map.setOrigin(() => {
        const origin = this.map.getOrigin();
        this.map.setLocations(concertData);
        this.map.initMap();
      });
    }

    renderConcertCards(artistImageLink, artistName, concertLocation, concertLink){
        $('.concertCards').append(`
            <div class="col s4">
                <div class="card">
                    <div class="card-image">
                        <img src="${artistImageLink}">
                        <span class="card-title">${artistName}</span>
                    </div>
                    <div class="card-content">
                        <p>${concertLocation}</p>
                    </div>
                    <div class="card-action">
                        <a href="${concertLink}">Check out concert</a>
                    </div>
                </div>
            </div>
        `);
    }
}
