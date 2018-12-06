let express = require("express");
let request = require("request");
let requestpromise = require("request-promise");
let querystring = require("querystring");
let q = require("q");
let bluebird = require("bluebird");

let app = express();

var access_token;

app.use(express.static("public"));

let redirect_uri = process.env.REDIRECT_URI || "http://localhost:8888/callback";

app.get("/login", function(req, res) {
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: "c01e41d46ff44ba2b73f4b8a28fa9499",
        scope: "user-read-private user-read-email",
        redirect_uri
      })
  );
});

app.get("/callback", function(req, res) {
  let code = req.query.code || null;
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri,
      grant_type: "authorization_code"
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer(
          "c01e41d46ff44ba2b73f4b8a28fa9499" +
            ":" +
            "4e8fc234b5694ebfa68709e4eeee23c1"
        ).toString("base64")
    },
    json: true
  };
  request.post(authOptions, function(error, response, body) {
    access_token = body.access_token;
    console.log(body);
    console.log(access_token);
    let uri = process.env.FRONTEND_URI || "index.html";
    res.redirect(uri);
  });
});

app.get("/search", function(req, res) {
  let username = req.query.username || null;

  let searchOptions = {
    url: `https://api.spotify.com/v1/users/${username}/playlists`,
    method: "GET",
    headers: {
      Authorization: "Bearer " + access_token
    },
    json: true
  };

  requestpromise(searchOptions).then(function(dat) {
    var playlists = [];
    var tracks = [];
    for (var playlist = 0; playlist < dat.items.length - 2; playlist++) {
      playlists.push(dat.items[playlist].id);
    }

    var promises = playlists.map(function(playlist) {
      let tracksOption = {
        method: "GET",
        url: `https://api.spotify.com/v1/playlists/${playlist}/tracks`,
        headers: {
          Authorization: "Bearer " + access_token
        },
        json: true
      }
      return requestpromise(tracksOption)
    })

    bluebird.all(promises).spread(function () {
      var tracks = [];
      for (var album1 in arguments) {
          // console.log("START: ", arguments[album1].items)
        arguments[album1].items.forEach(function(item) {
          tracks.push(item.track.album.artists[0].name);
        })


        // tracks.push(arguments[album].items.track.album.artists[0].name);

      }

      console.log(tracks);

    })

    // body.items.forEach(function(item) {
    //   tracks.push(item.track.album.artists[0].name);
  
  }).catch(function(err) {
    console.log(err);
  });
 

    // for (var playlist = 0; playlist < dat.items.length - 2; playlist++) {
    //   var list = dat.items[playlist].id;

    //   let tracksOptions = {
    //     method: "GET",
    //     url: `https://api.spotify.com/v1/playlists/${list}/tracks`,
    //     headers: {
    //       Authorization: "Bearer " + access_token
    //     },
    //     json: true
    //   };

    //   request.get(tracksOptions, function(error, response, body) {
    //     body.items.forEach(function(item) {
    //       tracks.push(item.track.album.artists[0].name);
    //     });
    //     // console.log(tracks);
    //   });
    // }

  let uri = process.env.FRONTEND_URI || "index.html";
  res.redirect(uri);
});

let port = process.env.PORT || 8888;
console.log(
  `Listening on port ${port}. Go /login to initiate authentication flow.`
);
app.listen(port);
