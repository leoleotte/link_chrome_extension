browser.runtime.onInstalled.addListener(function () {
  browser.storage.sync.set({ minutesToRefresh: 10 });
  refreshBadge();
});

browser.runtime.onStartup.addListener(function () {
  refreshBadge();
})

async function setMinutes(minutes) {
  await sleep((minutes * 60) * 1000);
  refreshBadge();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function refreshBadge() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", browser.extension.getURL("http://phoenix.xboxunity.net/linkgizmo.php"), true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      let resp = JSON.parse(xhr.responseText);
      if (resp && resp.online) {
        browser.browserAction.setBadgeText({ text: resp.online});
        //get minutes from storage to auto-refresh
        browser.storage.sync.get("minutesToRefresh", function (data) {
          let minutes = parseInt(data.minutesToRefresh) ? parseInt(data.minutesToRefresh) : 0;
          setMinutes(minutes);
          console.log("refreshing in " + minutes + " minutes");
        });
      }
    }
  }
  xhr.send();
}