$(document).ready(() => {
    const main = new Document();
    const spotify = new Spotify();
    M.AutoInit();
    main.attachClickHandlers();
    spotify.attachClickHandlers();
})
