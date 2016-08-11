'use strict'

function createTable(users) {
    var n = users.length;
    var wrapper = document.getElementById("commonDiv");
    for (var i = 0; i < n; i++) {
        createRow(wrapper, users[i]);
    };
}

function createRow(wrapper, user) {
    //var row = table.insertRow(0);
    var row = document.createElement("div");
    wrapper.appendChild(row);
    row.setAttribute("class", "row row-style");

    var avatar = document.createElement("div");
    var login = document.createElement("div");
    var admin = document.createElement("div");

    row.appendChild(avatar);
    row.appendChild(login);
    row.appendChild(admin);

    avatar.setAttribute("class", "col-md-4 col-sm-4 headBlockAvatar");
    login.setAttribute("class", "col-md-4 col-sm-4 headBlock");
    admin.setAttribute("class", "col-md-4  col-sm-4 headBlock");


    avatar.style.backgroundImage = "url(" + user.avatar_url + ")";
    login.innerHTML = user.login;
    admin.innerHTML = user.site_admin;

    row.onclick = function () {
        createDroplist(wrapper, row, loadUser);
    }

    function loadUser(setInfo) {
        getInfo(user.login, setInfo);
    }
}

function createDroplist(wrapper, row, loadUser) {
    if (!document.getElementById("infoCard")) {
        showLoader(wrapper, row, function (loader) {
            loadUser(setInfo);

            function setInfo(userUnit) {
                var link = ["starred", "subscriptions", "orgs"];
                var countResult = [];
                var UserModel = {
                    login: userUnit.login,
                    name: userUnit.name,
                    email: userUnit.email,
                    followers: userUnit.followers,
                    followings: userUnit.following,
                    repos: userUnit.public_repos
                };

                function loadUser(setInfo) {
                    getInfo(user.login, setInfo);
                }

                for (var i = 0; i < link.length; i++) {

                    function loadLinks(userLinks) {
                        getInfoUserLinks(userUnit.login, link[i], userLinks);
                    }

                    loadLinks(userLinks);
                    function userLinks(count) {
                        countResult.push(count);
                        if (link.length == countResult.length) {
                            UserModel.starred = countResult[0];
                            UserModel.subscriptions = countResult[1];
                            UserModel.organizations = countResult[2];


                            wrapper.insertBefore(userView(UserModel), row.nextSibling);
                            hideLoader(loader);
                        }
                    }
                }
            }
        });
    } else {
        var row2 = document.getElementById("infoCard")
        row2.remove();
    }
}



function userView(User) {
    var row2 = document.createElement("div");

    row2.setAttribute("class", " row-style")
    row2.setAttribute("id", "infoCard")

    var topList = document.createElement("div");
    row2.appendChild(topList);
    topList.setAttribute("class", "topList");

    var name = document.createElement("span");
    var email = document.createElement("span");

    topList.appendChild(name);
    topList.appendChild(email);

    name.setAttribute("class", "displayTop");
    email.setAttribute("class", "displayTop")

    var leftList = document.createElement("div");
    var rightList = document.createElement("div");

    row2.appendChild(leftList);
    row2.appendChild(rightList);

    leftList.setAttribute("class", "lists");
    rightList.setAttribute("class", "lists");

    var ul1 = document.createElement("ul");
    leftList.appendChild(ul1)

    var followers = document.createElement("li");
    var followings = document.createElement("li");
    var starred = document.createElement("li");

    ul1.appendChild(followers);
    ul1.appendChild(followings);
    ul1.appendChild(starred);

    var ul2 = document.createElement("ul");
    rightList.appendChild(ul2)

    var subscriptions = document.createElement("li");
    var organizations = document.createElement("li");
    var repos = document.createElement("li");

    ul2.appendChild(subscriptions);
    ul2.appendChild(organizations);
    ul2.appendChild(repos);

    name.innerHTML = User.name;
    email.innerHTML = User.email;


    followers.innerHTML = "Followers" + "<span> <a href='https://github.com/"+User.login+"/followers'>"+ User.followers+"</a></span>";
    followings.innerHTML = "Followings" + "<span><a href='https://github.com/"+User.login+"/following'>" + User.followings + "</a></span>";
    repos.innerHTML = "Repos" + "<span><a href='https://github.com/"+User.login+"?tab=repositories'>" + User.repos + "</a></span>";

    starred.innerHTML = "Starred" + "<span><a href='https://github.com/stars/"+User.login+"'>" + User.starred + "</a></span>";
    subscriptions.innerHTML = "Subscriptions" + "<span>" + User.subscriptions + "</a></span>";
    organizations.innerHTML = "Organizations" + "<span>" + User.organizations + "</a></span>";

    return row2;
}


function showLoader(wrapper, row, finnishedCallback) {
    var loader = document.createElement("div");
    loader.className = "loader";
    wrapper.insertBefore(loader, row.nextSibling);
    setTimeout(function () {
        loader.className += " showed";
        setTimeout(function() {
            finnishedCallback(loader);
        }, 1000);
    }, 1);
}

function hideLoader(loader) {
    loader.remove();
}