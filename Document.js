class Document {
    constructor () {
        console.log('document created');
        // this.artistArr = ["eminem", "eminem", "ariana", "jcole", "paak", "jid", "jid", "jid"];
        // this.longlat = {longitude : 39.969938,
        //                  latitude : -75.160278};
        this.attachClickHandlers();
        this.attachClickHandlers = this.attachClickHandlers.bind(this);
        this.grabUsername = this.grabUsername.bind(this);
        this.clearInputField = this.clearInputField.bind(this);
        this.spotifyInstance = new Spotify();
        this.firebaseInstance = new FB();
        this.mapsInstance = new Maps();
        this.ticketsInstance = new Tickets();
    }

    attachClickHandlers() {
        $('.submitBtn').click(this.grabUsername);
        console.log('attached clickHandlers');
    }

    grabUsername() {
        let username = $('.usernameInput').val();
        $('.usernameInput').val('');

        //use username to call the proper spotify method
        console.log(`username : ${username}`);
    }
}