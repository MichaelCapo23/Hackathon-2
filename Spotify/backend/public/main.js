$(document).ready(() => {
  M.AutoInit();

  const spotify = new Spotify();
  
  spotify.attachClickHandlers();
  $(".submit").click(runSubmit);

});

function runSubmit() {
  var userLocation = null;
  setOrigin(initiateSearch)
}

function setOrigin(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      this.origin = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log("hello");
      userLocation = this.origin;
      callback();
    });
  }
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
    })
    .fail(function(error) {
      console.log("spotify error?: ", error);
    });
}
