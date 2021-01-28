const targetToObserve = document.querySelector('body');
const config = {attributes: false, childList: true, subtree: true };
let autoPlay = true;
const callback = function(mutationsList) {
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            googleIframesRemover();//removing google frames
            adsContainerRemover(); //removing the ads container
            adsModalBackDropRemover(); // removing the backdrop of the modal to make the app interactive again
            adsModalWindowRemover(); // removing the main ads container
            pressPlay();  // press the play button again cause am too lazy to press it again.
           
        }

    }
};

const observer = new MutationObserver(callback);
observer.observe(targetToObserve, config);


//helper functions

const googleIframesRemover = () =>{
    const googleIframes = Array.prototype.filter.call(document.querySelectorAll("iframe"),x=>x.name.includes('google'))
    removeItems(googleIframes,"removed google iframe")
}

const adsContainerRemover = ()=>
{
    removeItems(document.querySelectorAll("anghami-ads"),"removed ad container")
}

const adsModalBackDropRemover = ()=>{
    removeItems(document.querySelectorAll("ngb-modal-backdrop"),"removed the modal popup back drop")
}

const adsModalWindowRemover = ()=>{
    const adsModals = document.querySelectorAll("ngb-modal-window");
    if(adsModals.length)
    {
        autoPlay = true;
    }
    removeItems(document.querySelectorAll("ngb-modal-window"),"removed the modal popup ")
}

const pressPlay = ()=>{
    const playButton = document.querySelector(".play-pause-cont");
    if(playButton && playButton.querySelector(".play") && autoPlay)
    {
        playButton.click();
        if(playButton.querySelector(".pause"))
        {
            autoPlay = !autoPlay;
        }
       
    }
}

const removeItems = (items,desc) =>
{
    for(const item of items){
        item.parentNode.removeChild(item);
            console.log(`${desc}`);
    }
}