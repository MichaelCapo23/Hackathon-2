class Document {
  constructor() {
    this.grabUsername = this.grabUsername.bind(this);
    this.attachClickHandlers();
    this.attachClickHandlers = this.attachClickHandlers.bind(this);
    this.useTicketMaster = false;
    // this.spotifyInstance = new Spotify();
    // this.firebaseInstance = new FB();
    this.map = new Maps();
    this.ticketsInstance = new Tickets(this.map);
  }

  attachClickHandlers() {
    $(".submitBtn").click(this.grabUsername);
  }

  grabUsername() {
    this.username = $(".usernameInput").val();
    this.startApp();
  }

  startApp() {
    const concertData = {
      'p!nk': [
        // {
        //   venue: 'Honda Center',
        //   latlog: {
        //     latitude: '33.8078', longitude: '-117.8765',
        //   },
        //   address: '2000 E Gene Autry Way',
        //   city: 'Anaheim',
        //   country: 'United States of America',
        //   date: '4/13/19',
        //   time: '19:00:00',
        //   website: 'https://www1.ticketmaster.com/premium-level-seating-holiday-love-jam/event/09005528A3B06E74',
        // }
        // {
        //   venue: 'The Forum',
        //   latlog: {
        //     latitude: '33.8003', longitude: '-117.8827'
        //   },
        //   address: '3900 W Manchester Blvd',
        //   city: 'Inglewood',
        //   country: 'United States of America',
        //   date: '4/19/19',
        //   time: '19:30:00',
        //   website: 'https://www1.ticketmaster.com/pnk-beautiful-trauma-world-tour/event/090053493349A169?f_PPL=true&ab=efeat5787v1',
        // }
      ]
    };
    console.log(concertData);
    this.map.setOrigin(() => {
      // const origin = this.map.getOrigin();
      // fbClient.addOrigin(this.username, origin);
      setTimeout(() => {
        // fbClient.getSpotifyArtistsFromFB(this.username).then(res => {
        //   const origin = res.val().origin;
        //   const artists = res.val().artists.feed;
          if (this.useTicketMaster) {
            this.ticketsInstance.organizeTickets(origin, artists);
          } else {
            console.log('drawing map');
            this.map.setLocations(concertData);
            this.map.drawMap();
          }
        });
      }, 5000);
    // });
  }
}
