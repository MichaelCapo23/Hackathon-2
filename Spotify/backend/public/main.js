const spotify = new Spotify();
const ticketMaster = new Tickets();
const maps = new Maps();
var userLocation = null;
const useTicketMaster = false;

const concertData = {
  "p!nk": [
    {
      tour: "P!nk: Beautiful Trauma World Tour",
      venue: "Honda Center",
      latlog: {
        latitude: ["33.8078"],
        longitude: ["-117.8765"]
      },
      address: "2000 E Gene Autry Way",
      city: "Anaheim",
      country: "United States of America",
      date: "4/13/19",
      time: "19:00:00",
      website:
        "https://www1.ticketmaster.com/premium-level-seating-holiday-love-jam/event/09005528A3B06E74"
    },
    {
      tour: "P!nk: Beautiful Trauma World Tour",
      venue: "The Forum",
      latlog: {
        latitude: ["33.8003"],
        longitude: ["-117.8827"]
      },
      address: "3900 W Manchester Blvd",
      city: "Inglewood",
      country: "United States of America",
      date: "4/19/19",
      time: "19:30:00",
      website:
        "https://www1.ticketmaster.com/pnk-beautiful-trauma-world-tour/event/090053493349A169?f_PPL=true&ab=efeat5787v1"
    }
  ],
  Eminem: [
    {
      tour: "Eminem",
      venue: "Westpac Stadium",
      latlog: {
        latitude: ["-41.270498918"],
        longitude: ["-184.784830194"]
      },
      address: "105 Waterloo Quay",
      city: "Wellington",
      country: "New Zealand",
      date: "5/2/19",
      time: "17:00:00",
      website:
        "https://resale.ticketmaster.co.nz/eminem-tickets-wellington-wgn-2-3-2019/tickets/2505531?TRACK=24005551F59441C6"
    }
  ],
  jid: [
    {
      tour: "Catch Me If You Can Tour",
      venue: "191 Toole",
      latlog: {
        latitude: ["32.2251"],
        longitude: ["-110.9690"]
      },
      address: "191 East Toole Avenue",
      city: "Tucson",
      country: "United States of America",
      date: "1/31/19",
      time: "21:00:00",
      website:
        "https://www.ticketweb.com/event/jid-catch-me-if-191-toole-tickets/8952065?REFERRAL_ID=tmfeed&_ga=2.24564282.1458000121.1544296924-646812780.1544032702"
    },
    {
      tour: "Catch Me If You Can Tour",
      venue: "WOW Hall",
      latlog: {
        latitude: ["44.0512"],
        longitude: ["-123.0971"]
      },
      address: "291 W. 8th Ave",
      city: "Eugene",
      country: "United States of America",
      date: "1/22/19",
      time: "21:00:00",
      website:
        "https://www.ticketweb.com/event/mike-thrasher-presents-jid-wow-hall-tickets/8952865?REFERRAL_ID=tmfeed"
    },
    {
      tour: "Catch Me If You Can Tour",
      venue: "Bourbon Theatre",
      latlog: {
        latitude: ["40.8134"],
        longitude: ["-96.7006"]
      },
      address: "1415 O Street",
      city: "Lincoln",
      country: "United States of America",
      date: "2/719",
      time: "20:00:00",
      website:
        "https://www.ticketweb.com/event/jid-catch-me-bourbon-theatre-tickets/8950735?REFERRAL_ID=tmfeed&_ga=2.104135296.1458000121.1544296924-646812780.1544032702"
    }
  ],
  "Alan Walker": [
    {
      tour: "Different World Tour",
      venue: "Roundhouse",
      latlog: {
        latitude: [51.5432],
        longitude: [-0.1519]
      },
      address: "Chalk Farm Rd",
      city: "London",
      country: "United Kingdom",
      date: "12/13/18",
      time: "19:00:00",
      website:
        "https://www.ticketmaster.co.uk/alan-walker-london-12-13-2018/event/1F0054D6AA65CA7D"
    },
    {
      tour: "Different World Tour",
      venue: "The Ritz",
      latlog: {
        latitude: [35.8161],
        longitude: [-78.6204]
      },
      address: "2820 Industrial Dr",
      city: "Raleigh",
      country: "United States of America ",
      date: "2/19/19",
      time: " 20:00:00",
      website:
        "https://www.viagogo.com/Concert-Tickets/Clubs-and-Dance/Alan-Walker-Tickets/E-3287046"
    }
  ],
  "Ed Sheeran": [
    {
      tour: "Different World Tour",
      venue: "Groupama Stadium",
      latlog: {
        latitude: [45.7653],
        longitude: [4.982]
      },
      address: "10 AVENUE SIMONE VEIL",
      city: "DÉCINES-CHARPIEU",
      country: "France",
      date: "5/24/19",
      time: "22:00:00",
      website:
        "https://www.ticketmaster.fr/fr/manifestation/ed-sheeran-billet/idmanif/446875/idtier/18864121"
    }
  ]
};

$(document).ready(() => {
  M.AutoInit();
  spotify.attachClickHandlers();
  $(".submit").click(runSubmit);
});

function runSubmit() {
  setOrigin(initiateSearch);
}

function initiateSearch() {
  console.log(userLocation);
  var userName = $(".usernameInput").val();

  var spotifyOptions = {
    url: "/search?username=" + userName
  };

  $.ajax(spotifyOptions)
    .done(function(response) {
      console.log("spotify success: ", response);

      if (useTicketMaster) {
        ticketMaster.organizeTickets(userLocation, response);
      } else {
        maps.setLocations(concertData);
        maps.drawMap();
      }
    })
    .fail(function(error) {
      console.log("spotify error?: ", error);
    });
}

function setOrigin(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const origin = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      userLocation = origin;
      callback();
    });
  }
}

// TODOS
// center text
// deal with two lines in cards
// work on overall design
// image api for artists on cards
// commit history - we fucked
// change app name
