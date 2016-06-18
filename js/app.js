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
        $('#play-pause').css('background-image', 'url(icons/pause-icon.png)');
    }
    else {
        video[0].pause(); //Change to play button
        $('#play-pause').css('background-image', 'url(icons/play-icon.png)');
    }
    return false;
});

// Mute button click to mute
$('#mute').on('click', function (){
  if ($("video").prop('muted')) {
    $("video").prop('muted', false); //mute
    $('#mute').css('background-image', 'url(icons/volume-on-icon.png)');
    volumeBar.value = currentVolume;
  }
  else {
    currentVolume = volumeBar.value;
    $("video").prop('muted', true);
    $('#mute').css('background-image', 'url(icons/volume-off-icon.png)');
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

$('#play-speed-container').mouseenter(function () {
  $('.speed').removeClass('hide');
});


//2.0 control
speed20 = document.getElementById('speed20');
speed20.addEventListener('click', function() {
    vid.playbackRate = 2;
    $('#speed20').addClass('checked');
    $('.speed').addClass('hide');
    $('#speed05').removeClass('checked');
    $('#speed10').removeClass('checked');
    $('#speed15').removeClass('checked');
    return false;
});

//1.5 control
speed15 = document.getElementById('speed15');
speed15.addEventListener('click', function() {
    vid.playbackRate = 1.5;
    $('#speed15').addClass('checked');
    $('.speed').addClass('hide');
    $('#speed05').removeClass('checked');
    $('#speed10').removeClass('checked');
    $('#speed20').removeClass('checked');
    return false;
});

//1.0 control
speed10 = document.getElementById('speed10');
speed10.addEventListener('click', function() {
    vid.playbackRate = 1;
    $('#speed10').addClass('checked');
    $('.speed').addClass('hide');
    $('#speed05').removeClass('checked');
    $('#speed20').removeClass('checked');
    $('#speed15').removeClass('checked');
    return false;
});

//0.5 control
speed05 = document.getElementById('speed05');
speed05.addEventListener('click', function() {
    vid.playbackRate = 0.5;
    $('#speed05').addClass('checked');
    $('.speed').addClass('hide');
    $('#speed20').removeClass('checked');
    $('#speed10').removeClass('checked');
    $('#speed15').removeClass('checked');
    return false;
});

// Add subtitles

var videoContainer = document.getElementById('video-container');
var subtitles = document.getElementById('captions-container');


for (var i = 0; i < vid.textTracks.length; i++) {
   vid.textTracks[i].mode = 'hidden';
}

var subtitlesMenu;
if (video.textTracks) {
   var df = document.createDocumentFragment();
   var subtitlesMenu = df.appendChild(document.createElement('ul'));
   subtitlesMenu.className = 'subtitles-menu';
   subtitlesMenu.appendChild(createMenuItem('subtitles-off', '', 'Off'));
   for (var i = 0; i < vid.textTracks.length; i++) {
      subtitlesMenu.appendChild(createMenuItem('subtitles-' + video.textTracks[i].language, vid.textTracks[i].language, vid.textTracks[i].label));
   }
   videoContainer.appendChild(subtitlesMenu);
}


var captionMenuButtons = [];
var createMenuItem = function(id, lang, label) {
   var listItem = document.createElement('li');
   var button = listItem.appendChild(document.createElement('button'));
   button.setAttribute('id', id);
   button.className = 'subtitles-button';
   if (lang.length > 0) button.setAttribute('lang', lang);
   button.value = label;
   button.setAttribute('data-state', 'inactive');
   button.appendChild(document.createTextNode(label));
   button.addEventListener('click', function(e) {
      // Set all buttons to inactive
      subtitleMenuButtons.map(function(v, i, a) {
         subtitleMenuButtons[i].setAttribute('data-state', 'inactive');
      });
      // Find the language to activate
      var lang = this.getAttribute('lang');
      for (var i = 0; i < video.textTracks.length; i++) {
         // For the 'subtitles-off' button, the first condition will never match so all will subtitles be turned off
         if (video.textTracks[i].language == lang) {
            video.textTracks[i].mode = 'showing';
            this.setAttribute('data-state', 'active');
         }
         else {
            video.textTracks[i].mode = 'hidden';
         }
      }
      subtitlesMenu.style.display = 'none';
   });
   subtitleMenuButtons.push(button);
   return listItem;
};

subtitles.addEventListener('click', function(e) {
   if (subtitlesMenu) {
      subtitlesMenu.style.display = (subtitlesMenu.style.display == 'block' ? 'none' : 'block');
   }
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

// HIDE VIDEO CONTROLS ON hover

$('#video-controls').hover(function(){
  $('#play-pause').toggleClass('hide');
  $('#mute').toggleClass('hide');
  $('#volume-bar').toggleClass('hide');
  $('.progressTime').toggleClass('hide');
  $('#captions-container').toggleClass('hide');
  $('#play-speed-container').toggleClass('hide');
  $('#full-screen').toggleClass('hide');
});

video.hover(function(){
  $('#play-pause').toggleClass('hide');
  $('#mute').toggleClass('hide');
  $('#volume-bar').toggleClass('hide');
  $('.progressTime').toggleClass('hide');
  $('#captions-container').toggleClass('hide');
  $('#play-speed-container').toggleClass('hide');
  $('#full-screen').toggleClass('hide');
});


// ADD CONTROLS TO VIDEO AT SMALLER SIZES

$(document).ready(function() {
    // run test on initial page load
    checkSize();

    // run test on resize of the window
    $(window).resize(checkSize);
});

//Function to the css rule
function checkSize(){
    if ($(".progressBar").css("top") !== "-65px" ){
        $('#video-controls').hide();
        video.prop("controls",true);
    } else {
      $('#video-controls').show();
      video.prop("controls",false);
    }
}
