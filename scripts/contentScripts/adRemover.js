const targetToObserve = document.querySelector('body');
const config = {
    attributes: false,
    childList: true,
    subtree: false
};

const callback = function (mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            googleIframesRemover();
            removeAdContainers();
            pressPlay();
            muteVideoAds();
            removeLeaderboard();
        }
    }
};
const observer = new MutationObserver(callback);
document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'complete') {
        observer.observe(targetToObserve, config);
    }
});
//helper functions
const googleIframesRemover = () => {
    const googleIframes = Array.prototype.filter.call(document.querySelectorAll("iframe"), x => x.name.includes('google'))
    removeItems(googleIframes, "removed google iframe")
}
const muteVideoAds = () => {
    for(const videoAd of document.querySelectorAll("#native-ad-video"))
    {
        videoAd.onplay = (e)=>{
            console.log("played",e);
            e.target.muted = true;
            hideAdModals();
            pressPlay()
        }
    }
}
const hideAdModals = () => {
    const adModals = document.querySelectorAll("ngb-modal-window");
    const adModalsBackDrop = document.querySelectorAll("ngb-modal-backdrop");
    document.body.className = document.body.className.replace("modal-open","");
    hideItems([...adModals, ...adModalsBackDrop]);
    console.log("removed an ad");
}
const removeLeaderboard = () => {
    var leaderboard = document.querySelector('.player-leaderboard');
    leaderboard.parentNode.removeChild(leaderboard);
}
const pressPlay = () => {
    const playButton = document.querySelector(".play-pause-cont");
    if (playButton && playButton.querySelector(".play")) {
        playButton.click();
    }

}
const removeAdContainers = () => removeItems(document.querySelectorAll("anghami-ads"));
const removeItems = (items) => {
    for (const item of items) {
        item.parentNode.removeChild(item);
    }
}
const hideItems = (items) => {
    for (const item of items) {
        item.style.visibility = 'hidden';
    }
}