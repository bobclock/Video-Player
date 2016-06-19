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

// Show on off buttons

$('#captions-container').mouseenter(function () {
  $('.captions').removeClass('hide');
});

(function() {
	var captionsOn = document.getElementById("captions-on"),
      captionsOff = document.getElementById("captions-off"),
		  i,
		  track,
		hideTracks = function() {
			// Oddly, there's no way to remove a track from a video, so hide them instead
			for (i = 0; i < vid.textTracks.length; i++) {
				vid.textTracks[i].mode = "hidden";
			}
		};

	captionsOn.addEventListener("click", function() {
    $('#captions-on').addClass('checked');
    $('#captions-off').removeClass('checked');
    $('.captions').addClass('hide');
    hideTracks();
		track = vid.addTextTrack("captions", "English", "en");
		track.mode = "showing";
		track.addCue(new VTTCue(0, 4.13, "Now that we've looked at the architecture of the internet, let's see how you might"));
		track.addCue(new VTTCue(4.13, 7.535, "connect your personal devices to the internet inside your house."));
		track.addCue(new VTTCue(7.535, 11.27, "Well there are many ways to connect to the internet, and"));
		track.addCue(new VTTCue(11.27, 13.96, "most often people connect wirelessly."));
		track.addCue(new VTTCue(13.96, 17.94, "Let's look at an example of how you can connect to the internet"));
		track.addCue(new VTTCue(17.94, 22.37, "If you live in a city or a town, you probably have a coaxial cable for"));
		track.addCue(new VTTCue(22.37, 26.88, "cable Internet, or a phone line if you have DSL, running to the outside of"));
		track.addCue(new VTTCue(26.88, 30.92, "your house, that connects you to the Internet Service Provider, or ISP."));
		track.addCue(new VTTCue(30.92, 32.1, "I'm searching for someone."));
		track.addCue(new VTTCue(32.1, 34.73, "If you live far out in the country, you'll more likely have"));
		track.addCue(new VTTCue(34.73, 39.43, "a dish outside your house, connecting you wirelessly to your closest ISP, or"));
		track.addCue(new VTTCue(39.43, 41.19, "you might also use the telephone system."));
		track.addCue(new VTTCue(41.19, 46.3, "Whether a wire comes straight from the ISP hookup outside your house, or"));
		track.addCue(new VTTCue(46.3, 49.27, "it travels over radio waves from your roof,"));
    track.addCue(new VTTCue(49.27, 53.76, "the first stop a wire will make once inside your house, is at your modem."));
    track.addCue(new VTTCue(53.76, 57.78, "A modem is what connects the internet to your network at home."));
    track.addCue(new VTTCue(57.78, 60.15, "A few common residential modems are DSL or"));
	});
  captionsOff.addEventListener("click", function() {
    $('#captions-off').addClass('checked');
    $('#captions-on').removeClass('checked');
    $('.captions').addClass('hide');
    hideTracks();
  });


}());



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
// seekBar.addEventListener("mousedown", function() {
//   vid.pause();
// });
//
// // Play the video when the slider handle is dropped
// seekBar.addEventListener("mouseup", function() {
//   vid.play();
// });

// On progress bar click move the video

seekBar.addEventListener('click', function(e) {
   var pos = (e.pageX  - this.offsetLeft) / this.offsetWidth;
   video.currentTime = pos * video.duration;
   if (video[0].paused) {
       $('#play-pause').css('background-image', 'url(icons/play-icon.png)');
   } else {
     $('#play-pause').css('background-image', 'url(icons/pause-icon.png)');
   }
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

video.mouseenter(function(){
  $('.progressBar').css('top', '-65px');
});

video.mouseleave(function(){
  $('.progressBar').css('top', '-10px');
});

$('#video-controls').mouseenter(function(){
  $('.progressBar').css('top', '-65px');
});

$('#video-controls').mouseleave(function(){
  $('.progressBar').css('top', '-10px');
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
