
function loadUsers() {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.github.com/users', true); /* Третий аргумент true означает асинхронность */
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200)
                console.log(request.responseText);
            else
                console.log("Error loading page\n");
            var user = JSON.parse(request.responseText);
            //Downloading users
            createTable(user);
        }
    };
    request.send(null);
}
console.log(loadUsers());


var getInfo = function (login, setInfo) {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.github.com/users/' + login, true); /* Третий аргумент true означает асинхронность */
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200)
                console.log(request.responseText + "vtoroy");
            else
                console.log("Error loading page\n");
            var userUnit = JSON.parse(request.responseText);
            setInfo(userUnit)
        }
    };
    request.send(null);

};




var getInfoUserLinks = function getInfoUserLinks(login, link, userLinks) {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.github.com/users/' + login + '/' + link, true); /* Третий аргумент true означает асинхронность */
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200)
                console.log(request.responseText + " podpischiki");
            else
                console.log("Error loading page\n");
            var follow = JSON.parse(request.responseText);
            var count = follow.length;
            userLinks(count);
        }
    };
    request.send(null);

};
      /*  loadLinks(userUnit,getInfoUserLinks);*/