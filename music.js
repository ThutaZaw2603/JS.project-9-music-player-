//DOM 
const trackBox = document.getElementsByClassName("trackbox")[0];
const audioBox = document.getElementsByClassName("audioBox")[0];
const musicImg = document.getElementById("musicImg");

//MUSIC DATA IN array
let musicArr = 
[ 
    { musicId : "audio/closer.mp3",                 songName : "Closer" ,                artist : "Chain-Smoker" ,musicImage : "image/closer.jpg" },
    { musicId : "audio/darkside.mp3",               songName : "Dark-side" ,             artist : "Alan Walker"  ,musicImage : "image/darkside.jpg"},
    { musicId : "audio/giveme-sunshine.mp3",        songName : "Give me Sunshine" ,      artist : "3-idiots"     ,musicImage : "image/3idiots.jpg"},
    { musicId : "audio/move-your-body.mp3",         songName : "Move your body" ,        artist : "Sia"          ,musicImage : "image/move-your-body.jpg"},
    { musicId : "audio/spectre.mp3",                songName : "The Spectre" ,           artist : "Alan Walker"  ,musicImage : "image/the-spectre.jpg"},
    { musicId : "audio/live-when-we-are-young.mp3", songName : "Live when we're young" , artist : "One-direction",musicImage : "image/live.jpg"},
    { musicId : "audio/love-story.mp3",             songName : "Love Story" ,            artist : "Taylor Swift" ,musicImage : "image/loveStory.jpg"},
    { musicId : "audio/crazier.mp3",                songName : "Crazier" ,               artist : "Taylor Swift" ,musicImage : "image/crazier.jpg"},
    { musicId : "audio/white-horse.mp3",            songName : "White Horse" ,           artist : "Taylor Swift" ,musicImage : "image/whiteHorse.jpg"},
    { musicId : "audio/super-bass.mp3",             songName : "Super Bass" ,            artist : "Nici Minaj"   ,musicImage : "image/superbass.png"}
]

//adding music data into trackbox dom
for(let i = 0 ; i < musicArr.length ; i++)
{
    // creating div, h5, p 
    let trackDiv = document.createElement("div");
    let trackH   = document.createElement("h5");
    let trackP   = document.createElement("p");
    trackDiv.classList.add("trackClass");    

    // adding songname and artist name into div , h5 and p
    let songName =  musicArr[i].songName;
    let artist   =  musicArr[i].artist;
    trackP.textContent = artist;
    trackH.style.color = "#ffc107";
    trackH.textContent = songName;

    //appending the div into trackbox
    trackDiv.append(trackH,trackP)
    trackBox.append(trackDiv);

    // creating click event to play music when i click trackDiv 
    trackDiv.addEventListener('click',() => 
    {
        currentPlayingIndex = i;
        playSong();
    })
}

//TIME AND DURATION
let totalDurationText = "00 : 00";  //make it global to use in current time text
let totalDuration   = 0;

//getting the total duration of the song when i click trackDiv
audioBox.addEventListener("loadeddata", () => 
{ 
    //getting the total duration
    totalDuration = Math.floor(audioBox.duration); 

    //run the converter funciton
     totalDurationText = secondMinuteText(totalDuration);
}
);

let currentAndTotalTimeText = document.getElementById("currentAndTotalTimeText");
//getting the current progressing duration of the song (this will update every 1 second)
audioBox.addEventListener("timeupdate",()=>
{
    //getting the current time
    let currentTime = Math.floor(audioBox.currentTime);  
   
    //run the converter funciton
    let currentTimeText = secondMinuteText(currentTime);

    //adding the total and current time text into DOM
    currentAndTotalTimeText.textContent = currentTimeText + " / " + totalDurationText;

    //run the progress bar updating function
    updateProgressBar(currentTime);
});


//creating the function which convert the total time input into minute and second and outputting the dom
let secondMinuteText = (totalsecond) => 
{
     //converting into  minute
     let minute   = Math.floor(totalsecond / 60); 

     //converting into  second 
     let second   = totalsecond % 60 ;

     const minuteText = minute < 10 ? "0" + minute.toString() : minute;
     const secondText = second < 10 ? "0" + second.toString() : second;
    
     return minuteText  + ":" + secondText;
}

//PROGRESS BAR
//get the progress bar DOM
let currentProgressBar = document.getElementById("currentProgress-bar");
//creating the update function of progress bar
let updateProgressBar = (currentTime) =>
{
    let updating = (60/totalDuration) * currentTime;
    currentProgressBar.style.width = updating.toString() + "%";   //width = 1 %;
}

//PLAY AND PAUSE BUTTON
//dom
let playBtn  = document.getElementsByClassName("playBtn")[0];
let pauseBtn = document.getElementsByClassName("pauseBtn")[0];
let isPlaying= false;
let currentPlayingIndex = 0;
//default play song when i first click the play btn
playBtn.addEventListener("click",() =>
{
        let currentTime = Math.floor(audioBox.currentTime);
        isPlaying = true;
       
        if(currentTime === 0)
        {
            playSong();
        } 
        else
        {
            audioBox.play();
            updatePlayAndPauseBtn();
        }

})
pauseBtn.addEventListener("click",() =>
{
    audioBox.pause();
    isPlaying = false;
    updatePlayAndPauseBtn();
});

const updatePlayAndPauseBtn = () =>
{
    if(isPlaying)
    {
         pauseBtn.style.display = "inline";
         playBtn.style.display  = "none";
    }
    else
    {
         pauseBtn.style.display = "none";
         playBtn.style.display  = "inline";
    }
   
}

//NEXT AND PREVIOUS BUTTON
//dom
let nextBtn     = document.getElementsByClassName("nextBtn")[0];
let previousBtn = document.getElementsByClassName("previousBtn")[0];

previousBtn.addEventListener("click",() =>
{
    if(currentPlayingIndex === 0)
    {
       currentPlayingIndex = musicArr.length;
       playSong();
    }
    
        currentPlayingIndex -= 1;
        playSong();
});

nextBtn.addEventListener("click",() =>
{
    if(currentPlayingIndex === musicArr.length - 1)
    {
        currentPlayingIndex = 0;
        playSong();
        
    }
    currentPlayingIndex += 1;
    playSong();
})

//SONG NAME AND ARTIST NAME IN PLAYER BOX
//dom
let songNameText = document.getElementById("songName");
let artistNameText = document.getElementById("artistName");

//Play song function
let playSong = () =>
{
    //play audio
    const musicId = musicArr[currentPlayingIndex].musicId;
    audioBox.src = musicId;
    audioBox.play();
    isPlaying = true;

    //update pause and play btn
    updatePlayAndPauseBtn();

    //update songname and artist name
    songNameText.textContent = musicArr[currentPlayingIndex].songName;
    artistNameText.textContent = musicArr[currentPlayingIndex].artist;

    //update music image src;
    const img = musicArr[currentPlayingIndex].musicImage;
    musicImg.src = img ;
}


//SUMMARY OF THIS MUSIC JS
/*
    STEP1  ==> set the total song arrays

    STEP2  ==> add the song array into track box

    STEP3  ==> make the track box song to be clickable and play song

    STEP4  ==> make second/minute and duration text

    STEP5  ==> make the progress bar

    STEP6  ==> make play and pause btn clickable and play song

    STEP7  ==> make next and previous btn to be skip next and skip back

    STEP8  ==> write the MAIN FUNCTION( playSong() )
                which include
                    1.play song
                    2.update play and pause btn
                    3.update song name and artist name
                    4.update song image 
*/