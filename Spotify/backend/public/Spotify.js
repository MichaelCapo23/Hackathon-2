$(document).ready(initialize);

function initialize() {
    console.log('wassup');
    $('.login').click(login);
    $('.submit').click(search);
}

function login() {
    window.location.href = "http://localhost:8888/login";
    // window.location.replace = "http://localhost:8888/login";
}

function search() {
    var userName = $('.usernameInput').val();
    window.location.href = "http://localhost:8888/search?username="+userName;
    console.log(userName);
    console.log(window.locationbar.href);
}

function getSpotifyPlayLists() {
    var username = $('.usernameInput').val();
    console.log(username);

    var ajaxOptions = {
        url:
        "http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/topalbums/limit=10/json",
      method: "get",
      dataType: "json",
    }

    
  $.ajax(ajaxOptions).then( function(response) {
    console.log(response);
  });



    }




