const spotify = new Spotify();
const ticketMaster = new Tickets();
const maps = new Maps();
var userLocation = null;
const useTicketMaster = true;

$(document).ready(() => {
  M.AutoInit();
  spotify.attachClickHandlers();
  $(".submit").click(runSubmit);
});

function runSubmit() {
  setOrigin(initiateSearch);
}

async function initiateSearch() {
  var userName = $(".usernameInput").val();
  var spotifyOptions = {
    url: "/search?username=" + userName
  };
  $.ajax(spotifyOptions)
    .done(function(response) {
      console.log("spotify success: ", response);
      if (useTicketMaster) {
        debugger;
        ticketMaster.organizeTickets(userLocation, response);
        setTimeout(3000);
        debugger;
        const concertInfo = ticketMaster.getConcertInfo();
        console.log(concertInfo);
        maps.setLocations(concertInfo);
      } else {
        maps.setLocations(dummyConcertInfo);
      }
      // if (Object.keys(concertInfo).length === 0) (for fallback with promises)
  
      maps.drawMap();
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
// image api for artists on cards
// commit history - we fucked
// change app name
