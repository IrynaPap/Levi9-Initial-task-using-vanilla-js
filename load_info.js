loadUsers()

function loadUsers() {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.github.com/users', true); /* Третий аргумент true означает асинхронность */
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                var user = JSON.parse(request.responseText);
                createTable(user);
            }
            else
                console.log("Error loading page\n");
        }
    };
    request.send(null);
}


var getInfo = function (login, setInfo) {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.github.com/users/' + login, true); /* Третий аргумент true означает асинхронность */
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                var userUnit = JSON.parse(request.responseText);
                setInfo(userUnit)
            }
            else
                console.log("Error loading page\n");
        }
    };
    request.send(null);
};




var getInfoUserLinks = function getInfoUserLinks(login, link, userLinks) {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.github.com/users/' + login + '/' + link, true); /* Третий аргумент true означает асинхронность */
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                var follow = JSON.parse(request.responseText);
                var count = follow.length;
                userLinks(count);
            }
            else
                console.log("Error loading page\n");
        }
    };
    request.send(null);
};
