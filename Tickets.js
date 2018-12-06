class Tickets {
    constructor(artistArr, location) {
        this.concertInfo = {};
        this.artistArr = artistArr;
        this.location = location;
        // var hash = this.getGeoHash(this.location);
        this.organizeTickets(this.artistArr);
    }

    organizeTickets(infoArr, hash) {
        const newArtists = infoArr.reduce((accum, current) => {
            accum[current] ? accum[current]++ : accum[current] = 1;  return accum;
        }, {});
        const arr = [];for (let key in newArtists) {
            arr.push([key, newArtists[key]]);
        }
        const a = arr.sort((a, b) => b[1] - a[1]).map(value => value[0]);
        this.callGetDataFromApi(a, hash);
    }

    // getGeoHash() {
    //     var hash = Geohash.encode(this.location.longitude, this.location.latitude, [5]);
    //     return hash;
    // }

    callGetDataFromApi(artistArr, hash) {
        for (var i = 0; i < artistArr.length; i++) {
            this.getDataFromApi(artistArr[i], i);
        }
    }

    getDataFromApi(artistName, index, callback) {
        var hash = Geohash.encode(this.location.longitude, this.location.latitude, [5]);
        this.ajaxCallVar = {
            url: 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=ihQ5Lmy34lHVnLU8xKTBu75hBUHVyQAa',
            // url: 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=zoZn6pzPe7LewwYhAQIRpaWkJ1QMoGMz',
            type: 'GET',
            dataType: 'JSON',
            data: {
                geoPoint: hash,
                keyword: artistName,
                radius: "8000",
                unit: "miles"
            }
        };
        $.ajax(this.ajaxCallVar)
            .then(response => this.organizeResponse(artistName, response, index, callback))
            .fail(err => console.log('Error', err));
    }
    ;

    organizeResponse(name, artistInfo, index, callback) {
        for (var i = 0; i < artistInfo["_embedded"].events.length; i++) {
            var concertObj = {};
            concertObj.priceRanges = artistInfo["_embedded"].events[i].priceRanges;
            concertObj.venue = artistInfo["_embedded"].events[i]["_embedded"]["venues"][0].name;
            concertObj.latlog = {
                latitude: [artistInfo["_embedded"].events[i]["_embedded"]["venues"][0].location.latitude],
                longitude: [artistInfo["_embedded"].events[i]["_embedded"]["venues"][0].location.longitude]
            };
            concertObj.address = artistInfo["_embedded"].events[i]["_embedded"]["venues"][0].address.line1;
            concertObj.city = artistInfo["_embedded"].events[i]["_embedded"]["venues"][0].city.name;
            concertObj.id = artistInfo["_embedded"].events[i].id;
            concertObj.country = artistInfo["_embedded"].events[i]["_embedded"]["venues"][0].country.name;
            concertObj.website = artistInfo["_embedded"].events[i].url;
            concertObj.date = artistInfo["_embedded"].events[i].dates.start.localDate;
            concertObj.time = artistInfo["_embedded"].events[i].dates.start.localTime;
            if(this.concertInfo[name] === undefined) {
                this.concertInfo[name] = [];
            }
            this.concertInfo[name][i] = concertObj;
        }
        console.log("concertInfo", this.concertInfo);
        // callback()
    }
}
