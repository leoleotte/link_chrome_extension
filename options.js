let saveButton = document.getElementById('save');
let refreshMinutes = document.getElementById('minutes_to_refresh');
let favGame = document.getElementById('fav_game');

saveButton.addEventListener('click', function() {
    chrome.storage.sync.set({minutesToRefresh: parseInt(refreshMinutes.value)});
    chrome.storage.sync.set({favGameID: favGame.value});
  });

chrome.storage.sync.get("minutesToRefresh", function(data) {
    let minutes = parseInt(data.minutesToRefresh) ? parseInt(data.minutesToRefresh) : 0;
    refreshMinutes.value = minutes;
});

chrome.storage.sync.get("favGameID", function(data) {
    let titleID = data.favGameID ? data.favGameID : "";
    favGame.value = titleID;
});