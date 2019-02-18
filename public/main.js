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

function initiateSearch() {
    var userName = $(".usernameInput").val();
    var spotifyOptions = {
        url: "/search?username=" + userName
    };
    $.ajax(spotifyOptions)
        .done(function (response) {
            console.log("spotify success: ", response);
            debugger;
            ticketMaster.organizeTickets(userLocation, response);
            const concertInfo = ticketMaster.getConcertInfo();
            console.log(concertInfo);
            maps.setLocations(concertInfo);
            maps.drawMap()
        })
        .fail(function (error) {
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
