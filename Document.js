class Document {
    constructor () {
        this.attachClickHandlers();
        // this.attachClickHandlers = this.attachClickHandlers.bind(this);
        // this.grabUsername = this.grabUsername.bind(this);
        // this.clearInputField = this.clearInputField.bind(this);
        // this.spotifyInstance = new Spotify();
        this.firebaseInstance = new FB();
        this.map = new Map();
        // this.ticketsInstance = new Tickets();
    }

    attachClickHandlers() {
        $('.submitBtn').click(this.grabUsername);
        console.log('attached clickHandlers');
    }

    grabUsername() {
        this.username = $('.usernameInput').val();

        //use username to call the proper spotify method
        console.log(`username : ${username}`);
    }

    startApp() {
      const concerts = [
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
          price: '',
        },
      ];

      this.map.setOrigin(() => {
        const origin = this.map.getOrigin();
        console.log(origin);
        this.map.setLocations(concerts);
        this.map.initMap();
      });
    }
}