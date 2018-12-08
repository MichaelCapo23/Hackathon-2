class Spotify {
    constructor() {
        this.login = this.login.bind(this);
        this.search = this.search.bind(this);
        this.getSearchResult = this.getSearchResult.bind(this);
    }

    attachClickHandlers() {
        $('.login').click(this.login);
        $('.submit').click(this.getSearchResult);
    }
    login() {
        window.location.href = "http://localhost:8888/login";
    }
    search() {
        var userName = $('.usernameInput').val();
        console.log(userName);
        window.location.href = "http://localhost:8888/search?username="+userName;
    }
    getSearchResult() {
        console.log('it went through');
        var userName = $('.usernameInput').val();
        $.ajax({
            url: '/search?username='+userName,
            success: function(response) {
                console.log(response);
                return response;
            }
        })
        console.log('something wrong with ajax');

    }
}

// $(document).ready(initialize);

// function initialize() {
//     console.log('wassup');
//     $('.login').click(login);
//     $('.submit').click(search);
// }

// function login() {
//     window.location.href = "http://localhost:8888/login";
//     // window.location.replace = "http://localhost:8888/login";
// }

// function search() {
//     var userName = $('.usernameInput').val();
//     window.location.href = "http://localhost:8888/search?username="+userName;
// }









