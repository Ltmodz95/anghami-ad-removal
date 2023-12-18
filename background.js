chrome.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed");
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.startsWith("https://play.anghami.com/")
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: optimizePage,
    });
  }
});

function optimizePage() {
  googleIframesRemover();
  removeAdContainers();
  pressPlay();
  muteVideoAds();
  removeLeaderboard();
}

function googleIframesRemover() {
  const googleIframes = Array.from(
    document.querySelectorAll("iframe[name*='google']")
  );
  removeItems(googleIframes, "removed google iframe");
}

function muteVideoAds() {
  document.querySelectorAll("#native-ad-video").forEach((videoAd) => {
    videoAd.addEventListener("play", (e) => {
      console.log("played", e);
      e.target.muted = true;
      hideAdModals();
      pressPlay();
    });
  });
}

function hideAdModals() {
  const adModals = document.querySelectorAll(
    "ngb-modal-window, ngb-modal-backdrop"
  );
  document.body.classList.remove("modal-open");
  hideItems(adModals);
  console.log("removed an ad");
}

function removeLeaderboard() {
  const leaderboard = document.querySelector(".player-leaderboard");
  if (leaderboard) leaderboard.remove();
}

function pressPlay() {
  const playButton = document.querySelector(".play-pause-cont .play");
  if (playButton) playButton.click();
}

function removeAdContainers() {
  removeItems(document.querySelectorAll("anghami-ads"));
}

function removeItems(items) {
  items.forEach((item) => item.remove());
}

function hideItems(items) {
  items.forEach((item) => (item.style.visibility = "hidden"));
}
