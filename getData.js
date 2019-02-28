let games = [document.getElementById("game1"),
document.getElementById("game2"),
document.getElementById("game3"),
document.getElementById("game4"),
document.getElementById("game5")];

let gameUsers = [document.getElementById("game1_users"),
document.getElementById("game2_users"),
document.getElementById("game3_users"),
document.getElementById("game4_users"),
document.getElementById("game5_users")];

let gameIcons = [document.getElementById("game1_icon"),
document.getElementById("game2_icon"),
document.getElementById("game3_icon"),
document.getElementById("game4_icon"),
document.getElementById("game5_icon")];

let favGame = document.getElementById("game_fav");
let favGameUsers = document.getElementById("game_fav_users");
let favGameIcon = document.getElementById("game_fav_icon");

let online = document.getElementById("online");
let xhr = new XMLHttpRequest();

xhr.open("GET", browser.extension.getURL("http://phoenix.xboxunity.net/linkgizmo.php"), true);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        let resp = JSON.parse(xhr.responseText);
        online.textContent = "Player Online: " + resp.online;
        browser.browserAction.setBadgeText({ text: resp.online });
        for (i = 0; i < 5; i++) {
            if (resp.rooms[i]) {
                games[i].textContent = resp.rooms[i].room;
                gameUsers[i].textContent = "Users: " + resp.rooms[i].users;
                gameIcons[i].src = resp.rooms[i].icon;
            }
        };
    }
}
xhr.send();


getFavouriteGame();

function getFavouriteGame() {
    browser.storage.sync.get("favGameID", function (data) {
        let favGameID = data.favGameID;
        if (!favGameID) {
            return;
        }
        let xhr = new XMLHttpRequest();
        xhr.open("GET", browser.extension.getURL("http://xboxunity.net/Resources/Lib/TitleList.php?page=0&count=10&search=" + favGameID + "&sort=3&direction=1&category=0&filter=0"), true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                let resp = JSON.parse(xhr.responseText);
                let game;
                if (resp.Items) {
                    game = resp.Items[0];
                }
                if (game) {
                    favGame.textContent = game.Name;
                    favGameUsers.textContent = "Users: " + game.UserCount;
                    favGameIcon.src = "http://xboxunity.net/Resources/Lib/Icon.php?tid=" + favGameID + "&custom=1";
                }
            }
        }
        xhr.send();
    });
}

let optionsButton = document.getElementById('options');
optionsButton.addEventListener('click', function() {
    window.open("/options.html");
  });