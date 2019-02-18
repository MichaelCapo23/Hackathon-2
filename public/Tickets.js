class Tickets {
    constructor() {
        this.concertInfo = {};
    }

    organizeTickets(location, artists){
        const newArtists = artists.reduce((accum, current) => {
            accum[current] ? accum[current]++ : accum[current] = 1;

            return accum;
        }, {});
        const arr = [];

        for (let key in newArtists) {
            arr.push([key, newArtists[key]]);
        }

        const a = arr.sort((a, b) => b[1] - a[1]).map(value => value[0]);

        const promise = new Promise((resolve, reject) => {
            this.getGeoHash(a, location);
        })
    }

    getGeoHash(artists, location) {
        var hash = Geohash.encode(location.lng, location.lat, [5]);
        this.callGetDataFromApi(artists, hash)
    }

    callGetDataFromApi(artistArr, hash) {
        this.getDataFromApi(artistArr[1], 1, hash);
    }

    getDataFromApi(artistName, index, hash){
        // `https://api.songkick.com/api/3.0/events.json?apikey=G8tZl3JcQGXwDFIm&artist_name=kanye+west`,
        this.ajaxCallVar = {
            type: 'GET',
            url: `https://api.songkick.com/api/3.0/search/artists.json?apikey=G8tZl3JcQGXwDFIm&query=${artistName}`,
        };
        $.ajax(this.ajaxCallVar).done((response) => {
            debugger;
            this.getEventInfo(response, index, hash)
        })
    }

    getEventInfo(artistInfo, index, hash){
        debugger;
        let artistID = artistInfo.resultsPage.results.artist[0].id;
        this.ajaxCallVar = {
            url: `https://api.songkick.com/api/3.0/artists/${artistID}/gigography.json?apikey=G8tZl3JcQGXwDFIm`,
            type: 'GET',
        };
        $.ajax(this.ajaxCallVar).done(response => {
            this.organizeResponse(response, index, hash);
        })
    }


    organizeResponse(artistInfo, index, hash) {
        debugger;
        let concertObj = {};
        console.log("artistInfo: ", artistInfo);
        const events = artistInfo.resultsPage.results.event;
        for (let index = 0; index < 5; index++) {
            concertObj.artist = events[0].performance[0].displayName;
            concertObj.name = events[index].displayName;
            concertObj.city = events[index].location.city;
            concertObj.venue = events[index].venue.displayName;
            concertObj.latlog = {
                latitude: events[index].venue.lat,
                longitude: events[index].venue.lng
            };
            concertObj.date = events[index].start.date;
            concertObj.url = events[index].uri;
            if (!this.concertInfo.hasOwnProperty(concertObj.artist)) {
                this.concertInfo[concertObj.artist] = [];
            }
            this.concertInfo[concertObj.artist][index] = concertObj;
        }

        // const info = artistInfo["_embedded"].events;
        // const venue = ["_embedded"]["venues"][0];
        //
        // for (var i = 0; i < info.length; i++) {
        //   var concertObj = {};
        //   concertObj.priceRanges = info[i].priceRanges;
        //   concertObj.venue = info[i][venue].name;
        //   concertObj.latlog = {
        //     latitude: [info[i][venue].location.latitude],
        //     longitude: [info[i][venue].location.longitude]
        //   };
        //   concertObj.address = info[i][venue].address.line1;
        //   concertObj.city = info[i][venue].city.name;
        //   concertObj.id = info[i].id;
        //   concertObj.country = info[i][venue].country.name;
        //   concertObj.website = info[i].url;
        //   concertObj.date = info[i].dates.start.localDate;
        //   concertObj.time = info[i].dates.start.localTime;
        //
        //   if (!this.concertInfo.hasOwnProperty(name)) {
        //     this.concertInfo[name] = [];
        //   }
        //   this.concertInfo[name][i] = concertObj;
        // }
    }

    getConcertInfo(){
        return this.concertInfo;
    }
}