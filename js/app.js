// CHECK jQUERY IS LOADED

if (window.jQuery) {
    console.log('WORKING!!!');
} else {
    console.log('NOT WORKING!!');
}

var vid = document.getElementById("myVideo"); // Get video element into variable
var video = $('#myVideo'); //jQuery video elemnt

// Video controls

// Buttons

//Play/Pause control clicked to play
$('#play-pause').on('click', function() {
    if(video[0].paused) {
        video[0].play(); //Change to pause button
        $('#play-pause').text('Pause');
    }
    else {
        video[0].pause(); //Change to play button
        $('#play-pause').text('Play');
    }
    return false;
});

// Add additional play/pause functionality press space bar and click










// Mute button click to mute
$('#mute').on('click', function (){
  if ($("video").prop('muted')) {
    $("video").prop('muted', false); //mute
    $('#mute').text('Mute');
    volumeBar.value = currentVolume;
  }
  else {
    currentVolume = volumeBar.value;
    $("video").prop('muted', true);
    $('#mute').text('Unmute');
    volumeBar.value = 0;
  }
});

// Full-screen button

fullscreen = document.getElementById("full-screen");
fullscreen.addEventListener('click', function(){
  if (vid.requestFullscreen) {
      vid.requestFullscreen();
  } else if (vid.mozRequestFullScreen) {
      vid.mozRequestFullScreen();// Firefox
  } else if (vid.webkitRequestFullscreen) {
      vid.webkitRequestFullscreen(); // Chrome and Safari
  } else if (vid.msRequestFullscreen) {
    vid.msRequestFullscreen(); // IE
  }
});

// Video playback speed






// Hide/unhide controls

$('speed-btn').on('click', function(){
  //  show speed buttons
});

$('speed-btn').on('hoveroff', function(){
  if (speed20.hide = false) {
    // then hide buttons
  }
});









//2.0 control
speed20 = document.getElementById('speed20');
speed20.addEventListener('click', function() {
    vid.playbackRate = 2;
    //Change class to checked
    return false;
});

//1.5 control
speed15 = document.getElementById('speed15');
speed15.addEventListener('click', function() {
    vid.playbackRate = 1.5;
    return false;
});

//1.0 control
speed10 = document.getElementById('speed10');
speed10.addEventListener('click', function() {
    vid.playbackRate = 1;
    return false;
});

//0.5 control
speed05 = document.getElementById('speed05');
speed05.addEventListener('click', function() {
    vid.playbackRate = 0.5;
    return false;
});

// Update time progress of video

function secondsToHms(d) {
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);
  return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
}
//Get HTML5 video time duration
  video.on('timeupdate', function() {
    var totalSecs = video[0].duration;
    $('.duration').text(secondsToHms(totalSecs));
});

//Update HTML5 video current play time
video.on('timeupdate', function() {
  var currentSecs = video[0].currentTime;
  $('.current').text(secondsToHms(currentSecs) + ' / ');
});

// Get bar elements

var seekBar = document.getElementById("seek-bar");
var volumeBar = document.getElementById("volume-bar");
var bufferBar = document.getElementById("buffer-bar")

// Create seekBar

// Event listener for the seek bar
seekBar.addEventListener("change", function() {
  // Calculate the new time
  var time = vid.duration * (seekBar.value / 100);
  // Update the video time
  vid.currentTime = time;
});

// Update the seek bar as the video plays
vid.addEventListener("timeupdate", function() {
  // Calculate the slider value
  var value = (100 / vid.duration) * vid.currentTime;
  // Update the slider value
  seekBar.value = value;
});

// Pause the video when the slider handle is being dragged
seekBar.addEventListener("mousedown", function() {
  vid.pause();
});

// Play the video when the slider handle is dropped
seekBar.addEventListener("mouseup", function() {
  vid.play();
});


// Create bufferBar

var startBuffer = function() {
    var maxduration = video[0].duration;
    var currentBuffer = video[0].buffered.end(0);
    var percentage = 100 * currentBuffer / maxduration;
    bufferBar.value = percentage;

    if(currentBuffer < maxduration) {
        setTimeout(startBuffer, 500);
    }
};
setTimeout(startBuffer, 500);

// Create volume controls

// Event listener for the volume bar
volumeBar.addEventListener("change", function() {
  // Update the video volume
  vid.volume = volumeBar.value;
});

// Highlight tracking of text

// Variables for spans

var first = document.getElementById("first");
var second = document.getElementById("second");
var third = document.getElementById("third");
var fourth = document.getElementById("fourth");
var fifth = document.getElementById("fifth");
var sixth = document.getElementById("sixth");
var seventh = document.getElementById("seventh");
var eighth = document.getElementById("eighth");

// Highlighting on playback

vid.ontimeupdate = function() {
  if (vid.currentTime < 7.535) {
        first.style.color = "red";
        second.style.color = "#384047";
        third.style.color = "#384047";
        fourth.style.color = "#384047";
        fifth.style.color = "#384047";
        sixth.style.color = "#384047";
        seventh.style.color = "#384047";
        eighth.style.color = "#384047";
    } else if (vid.currentTime > 7.535 && vid.currentTime < 13.960) {
        first.style.color = "#384047";
        second.style.color = "red";
        third.style.color = "#384047";
        fourth.style.color = "#384047";
        fifth.style.color = "#384047";
        sixth.style.color = "#384047";
        seventh.style.color = "#384047";
        eighth.style.color = "#384047";
    } else if (vid.currentTime > 13.960 && vid.currentTime < 17.940) {
        first.style.color = "#384047";
        second.style.color = "#384047";
        third.style.color = "red";
        fourth.style.color = "#384047";
        fifth.style.color = "#384047";
        sixth.style.color = "#384047";
        seventh.style.color = "#384047";
        eighth.style.color = "#384047";
    } else if (vid.currentTime > 17.940 && vid.currentTime < 30.920) {
        first.style.color = "#384047";
        second.style.color = "#384047";
        third.style.color = "#384047";
        fourth.style.color = "red";
        fifth.style.color = "#384047";
        sixth.style.color = "#384047";
        seventh.style.color = "#384047";
        eighth.style.color = "#384047";
    } else if (vid.currentTime > 30.920 && vid.currentTime < 41.190) {
        first.style.color = "#384047";
        second.style.color = "#384047";
        third.style.color = "#384047";
        fourth.style.color = "#384047";
        fifth.style.color = "red";
        sixth.style.color = "#384047";
        seventh.style.color = "#384047";
        eighth.style.color = "#384047";
    } else if (vid.currentTime > 41.190 && vid.currentTime < 53.760) {
        first.style.color = "#384047";
        second.style.color = "#384047";
        third.style.color = "#384047";
        fourth.style.color = "#384047";
        fifth.style.color = "#384047";
        sixth.style.color = "red";
        seventh.style.color = "#384047";
        eighth.style.color = "#384047";
    } else if (vid.currentTime > 53.760 && vid.currentTime < 57.760) {
        first.style.color = "#384047";
        second.style.color = "#384047";
        third.style.color = "#384047";
        fourth.style.color = "#384047";
        fifth.style.color = "#384047";
        sixth.style.color = "#384047";
        seventh.style.color = "red";
        eighth.style.color = "#384047";
    } else if (vid.currentTime > 57.760) {
        first.style.color = "#384047";
        second.style.color = "#384047";
        third.style.color = "#384047";
        fourth.style.color = "#384047";
        fifth.style.color = "#384047";
        sixth.style.color = "#384047";
        seventh.style.color = "#384047";
        eighth.style.color = "red";
    }
}; // End of text highlighting

// Add click event for individual spans

first.addEventListener('click', function() {
    vid.currentTime = 0;
});

second.addEventListener('click', function() {
    vid.currentTime = 7.535;
});

third.addEventListener('click', function() {
    vid.currentTime = 13.960;
});

fourth.addEventListener('click', function() {
    vid.currentTime = 17.940;
});

fifth.addEventListener('click', function() {
    vid.currentTime = 30.920;
});

sixth.addEventListener('click', function() {
    vid.currentTime = 41.190;
});

seventh.addEventListener('click', function() {
    vid.currentTime = 53.760;
});

eighth.addEventListener('click', function() {
    vid.currentTime = 57.760;
});

// scrub video to that time point
