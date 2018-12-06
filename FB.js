class FB {
    constructor() {
        console.log('Firebase Constructor Called');
        this.init();
        this.testConnection()
    }

    init() {
        // we know we shouldn't save api keys, but we're lazy 
        const config = {
            apiKey: "AIzaSyACHDJLR_de1uWao0_PxgePqdwHhB9M3R4",
            authDomain: "hackathon2-9e91e.firebaseapp.com",
            databaseURL: "https://hackathon2-9e91e.firebaseio.com",
            projectId: "hackathon2-9e91e",
            storageBucket: "hackathon2-9e91e.appspot.com",
            messagingSenderId: "951283584290"
          };

        this.db = firebase.initializeApp(config).database();
    }

    testConnection() {
        const test = this.db.ref('/test/');
        console.log('testing connection...');

        test.once('value', snapshot => {
            console.log(snapshot.val())
        })
    }

    spotifyToFB(feed) {
        console.log(feed);
    }
}