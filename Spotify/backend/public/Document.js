class Document {
  constructor() {
    this.grabUsername = this.grabUsername.bind(this);
    this.attachClickHandlers = this.attachClickHandlers.bind(this);
    this.map = new Map();
    this.ticketsInstance = new Tickets(this.map);
  }

  attachClickHandlers() {
    $(".submitBtn").click(this.grabUsername);
  }

  grabUsername() {
    this.username = $(".usernameInput").val();
    // this.startApp();
  }

  startApp() {
    const concertData = {};

    this.map.setOrigin(() => {
      const origin = this.map.getOrigin();
      fbClient.addOrigin(this.username, origin);
      setTimeout(() => {
        fbClient.getSpotifyArtistsFromFB(this.username).then(res => {
          const origin = res.val().origin;
          const artists = res.val().artists.feed;
          this.ticketsInstance.organizeTickets(origin, artists);
        });
      }, 5000);
    });
  }
}
