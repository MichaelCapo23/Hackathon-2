class Document {
    constructor () {
        console.log('document created');
        this.attachClickHandlers();

        // this.spotifyInstance = new Spotify();
        this.firebaseInstance = new FB();
        // this.mapsInstance = new Maps();
        // this.ticketsInstance = new Tickets();
    }

    attachClickHandlers() {
        console.log('attached clickHandlers');
    }


}