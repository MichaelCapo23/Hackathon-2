class Tickets {
    constructor(artistArr, location) {
        this.artistArr = artistArr;
        this.location = location;
        this.infoArr = [this.artistArr.length];
        var hash = this.getGeoHash(this.location);
        this.callGetDataFromApi(this.artistArr, hash);
        this.concertInfo = {};
    }

    getGeoHash() {
        var hash = Geohash.encode(this.location.longitude,this.location.latitude , [5]);
        return hash;
    }

    callGetDataFromApi(artistArr, hash) {
        for (var i = 0; i < artistArr.length; i++) {
            this.getDataFromApi(artistArr[i], i, hash);
        }
    }

    getDataFromApi(artistName, index, hash) {
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
        $.ajax(this.ajaxCallVar).then(response => this.organizeResponse(artistName, response, index)).fail(err => console.log('Error', err));
    };

    organizeResponse(name, artistInfo, index) {
        console.log(name, artistInfo);
        for (var i = 0; i < artistInfo["_embedded"].events.length; i++) {
            var concertObj = {};
            concertObj.priceRanges = artistInfo["_embedded"].events[i].priceRanges;
            console.log("prices", concertObj.priceRanges);
            concertObj.venue = artistInfo["_embedded"].events[i]["_embedded"]["venues"][0].name;
            console.log("venue", concertObj.venue);
            concertObj.latlog = {
                latitude: [artistInfo["_embedded"].events[i]["_embedded"]["venues"][0].location.latitude],
                longitude: [artistInfo["_embedded"].events[i]["_embedded"]["venues"][0].location.longitude]
            };
            console.log("latlog", concertObj.latlog);
            concertObj.address = artistInfo["_embedded"].events[i]["_embedded"]["venues"][0].address.line1;
            console.log("address", concertObj.address);
            concertObj.city = artistInfo["_embedded"].events[i]["_embedded"]["venues"][0].city.name;
            console.log("city", concertObj.city);
            concertObj.country = artistInfo["_embedded"].events[i]["_embedded"]["venues"][0].country.name;
            console.log("country", concertObj.country);
            concertObj.website = artistInfo["_embedded"].events[i].url;
            console.log("website", concertObj.website);
            concertObj.date = artistInfo["_embedded"].events[i].dates.start.localDate;
            console.log("date", concertObj.date);
            concertObj.time = artistInfo["_embedded"].events[i].dates.start.localTime;
            console.log("time", concertObj.time);
            this.concertInfo[index][i] = concertObj;
        }
        console.log("concertInfo", this.concertInfo);

    }
}
