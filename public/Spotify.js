class Spotify {
    constructor() {
        this.login = this.login.bind(this);
        this.search = this.search.bind(this);
    }

    attachClickHandlers() {
        $('.login').click(this.login);
    }
    login() {
        window.location.href = "http://localhost:8888/login";
    }
    search() {
        var userName = $('.usernameInput').val();
        window.location.href = "http://localhost:8888/search?username="+userName;
    }
}
