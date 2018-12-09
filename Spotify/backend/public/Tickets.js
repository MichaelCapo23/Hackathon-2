class Tickets {
  constructor(map) {
    this.concertInfo = {};
    this.map = map;
  }

  organizeTickets(location, artists) {
    const newArtists = artists.reduce((accum, current) => {
      accum[current] ? accum[current]++ : accum[current] = 1; return accum;
    }, {});
    const arr = []; 
    
    for (let key in newArtists) {
      arr.push([key, newArtists[key]]);
    }
    
    const a = arr.sort((a, b) => b[1] - a[1]).map(value => value[0]);
    this.getGeoHash(a, location);
  }

  getGeoHash(artists, location) {
    var hash = Geohash.encode(location.lng, location.lat, [5]);
    this.callGetDataFromApi(artists, hash)
  }

  callGetDataFromApi(artistArr, hash) {
    for (var i = 0; i < artistArr.length; i++) {
      this.getDataFromApi(artistArr[i], i, hash);
    }
  }

  getDataFromApi(artistName, index, hash) {
    this.ajaxCallVar = {
      // url: 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=ihQ5Lmy34lHVnLU8xKTBu75hBUHVyQAa', // mike
      url: 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=tI1aYe3CCBWTWjMAkQJRhC6TAKtmanEY', // mike
      // url: 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=kPkBY3I9s8hIRNOlcc1L0KjBQqtwenIA',  // erick
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
      .then(response => this.organizeResponse(artistName, response, index))
      .fail(err => console.log('Error', err));
  }
  ;

  organizeResponse(name, artistInfo, index) {
    const info = artistInfo["_embedded"].events;
    const venue = ["_embedded"]["venues"][0];

    for (var i = 0; i < info.length; i++) {
      var concertObj = {};
      concertObj.priceRanges = info[i].priceRanges;
      concertObj.venue = info[i][venue].name;
      concertObj.latlog = {
        latitude: [info[i][venue].location.latitude],
        longitude: [info[i][venue].location.longitude]
      };
      concertObj.address = info[i][venue].address.line1;
      concertObj.city = info[i][venue].city.name;
      concertObj.id = info[i].id;
      concertObj.country = info[i][venue].country.name;
      concertObj.website = info[i].url;
      concertObj.date = info[i].dates.start.localDate;
      concertObj.time = info[i].dates.start.localTime;
      if (!this.concertInfo.hasOwnProperty(name)) {
        this.concertInfo[name] = [];
      }
      this.concertInfo[name][i] = concertObj;
    }
  }
}