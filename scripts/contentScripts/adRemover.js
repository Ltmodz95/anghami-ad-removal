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
            pressPlay();
            muteVideoAds();
            hideAdModals();
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
    const videoAds = document.querySelectorAll("video");
    removeItems(videoAds);
    setTimeout(pressPlay, 1000);
}
const hideAdModals = () => {
    const adModals = document.querySelectorAll("ngb-modal-window");
    const adModalsBackDrop = document.querySelectorAll("ngb-modal-backdrop");
    hideItems([...adModals, ...adModalsBackDrop]);
    console.log("removed an ad");
}
const pressPlay = () => {
    const playButton = document.querySelector(".play-pause-cont");
    if (playButton && playButton.querySelector(".play")) {
        playButton.click();
    }
}
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