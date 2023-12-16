$(document).ready(function() {
    // process bar
    setTimeout(function() {
        firstQuestion();
        $('.spinner').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'hidden'
        });
    }, 600);
})

function init(){
    $('#title').text(CONFIG.title)
    $('#desc').text(CONFIG.desc)
    $('#yes').text(CONFIG.btnYes)
    $('#no').text(CONFIG.btnNo)
}

function firstQuestion(){
    $('.content-yes').hide();
    $('.box').hide();
    
    Swal.fire({
        title: CONFIG.introTitle,
        text: CONFIG.introDesc,

        // 2. Ảnh ở câu hỏi đầu tiên
        imageUrl: 'img/cuteCat.jpeg',
        imageWidth: 300,
        imageHeight: 300,
        background: '#fff url("img/iput-bg.jpg")',
        imageAlt: 'Custom image',
        confirmButtonText: CONFIG.btnIntro
      })
      .then(function(){
        $('.content-yes').show(200);
    $('.box').show(200);
    // snowDrop(150, randomInt(1035, 1280));
    // snow(150, 150);
      })
}

 // switch button position
 function switchButton() {
    var audio = new Audio('sound/last-christmas.mp3');
    var audio1 = document.getElementById('audio');
    audio1.addEventListener("ended", function() {
        this.currentTime = 0;
        this.play();
      });
    
    // audio.loop=true;
    audio1.play();
    var leftNo = $('#no').css("left");
    var topNO = $('#no').css("top");
    var leftY = $('#yes').css("left");
    var topY = $('#yes').css("top");
    $('#no').css("left", leftY);
    $('#no').css("top", topY);
    $('#yes').css("left", leftNo);
    $('#yes').css("top", topNO);
}

function moveButton() {
    var audio = new Audio('sound/Swish1.mp3');
    audio.play();
    var x = Math.random() * ($(window).width() - $('#no').width()) * 0.9 ;
    var y = Math.random() * ($(window).height() - $('#no').height()) * 0.9;
    var left = x + 'px';
    var top = y + 'px';
    $('#no').css("left", left);
    $('#no').css("top", top);
}

init()

var n = 0;
$('#no').mousemove(function() {
    if (n < 1)
        switchButton();
    if (n > 1)
        moveButton();
    n++;
});
$('#no').click(() => {
    if (screen.width>=900)
        switchButton();
})

// generate text in input
function textGenerate() {
    var n = "";
    var text = " " + CONFIG.reply;
    var a = Array.from(text);
    var textVal = $('#txtReason').val() ? $('#txtReason').val() : "";
    var count = textVal.length;
    if (count > 0) {
        for (let i = 1; i <= count; i++) {
            n = n + a[i];
            if (i == text.length + 1) {
                $('#txtReason').val("");
                n = "";
                break;
            }
        }
    }
    $('#txtReason').val(n);
    setTimeout("textGenerate()", 1);
}

// show popup
$('#yes').click(function() {
    var audio = new Audio('sound/tick.mp3');
    audio.play();
    Swal.fire({
        title: CONFIG.question,
        html: true,
        width: 900,
        padding: '3em',
        html: "<input type='text' class='form-control' id='txtReason' onmousemove=textGenerate()  placeholder='" + CONFIG.reasonPlaceholder + "'>",
        background: '#fff url("img/iput-bg.jpg")',
        backdrop: `
              rgba(0,0,123,0.4)
              url("img/giphy2.gif")
              left top
              no-repeat
            `,
        confirmButtonColor: '#3085d6',
        confirmButtonColor: '#fe8a71',
        confirmButtonText: CONFIG.btnReply
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                width: 900,
                confirmButtonText: CONFIG.btnAccept,
                background: '#fff url("img/iput-bg.jpg")',
                title: CONFIG.mess,
                text: CONFIG.messDesc,
                confirmButtonColor: '#83d0c9',
                onClose: () => {
                    window.location = CONFIG.messLink;
                  }
            })
        }
    })
})
// snowDrop(150, randomInt(1035, 1280));
// snow(150, 150);
// function snow(num, speed) {
// 		if (num > 0) {
// 			setTimeout(function () {
// 				$('#drop_' + randomInt(1, 250)).addClass('animate');
// 				num--;
// 				snow(num, speed);
// 			}, speed);
// 		}
// 	};
// 	function snowDrop(num, position) {
// 		if (num > 0) {
// 			var drop = '<div class="drop snow" id="drop_' + num + '"></div>';

// 			$('body').append(drop);
// 			$('#drop_' + num).css('left', position);
// 			num--;
// 			snowDrop(num, randomInt(60, 1480));
// 		}
// 	};
// function randomInt(min, max) {
// 		return Math.floor(Math.random() * (max - min + 1) + min);
// 	};

// var yes = document.getElementById('yes');
// var getUrlParameter = function getUrlParameter(sParam) {
//     var sPageURL = window.location.search.substring(1),
//         sURLVariables = sPageURL.split('&'),
//         sParameterName,
//         i;
 
//     for (i = 0; i < sURLVariables.length; i++) {
//         sParameterName = sURLVariables[i].split('=');
 
//         if (sParameterName[0] === sParam) {
//             return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
//         }
//     }
// };



snowDrop(150, randomInt(60, 1580));
snow(150, 150);
// Function to generate snowflakes
function snow(num, speed) {
    if (num > 0) {
        setTimeout(function () {
            $('#drop_' + randomInt(1, 250)).addClass('animate');
            num--;
            snow(num, speed);
        }, speed);
    }
};

// Function to create and position snowflakes based on screen width
function snowDrop(num, position) {
    if (num > 0) {
        var drop = '<div class="drop snow" id="drop_' + num + '"></div>';
        $('body').append(drop);

        // Update the left position relative to the screen width
        var screenWidth = $(window).width();
        var newPosition = position * screenWidth / 1920; // Adjust 1920 to the original screen width

        $('#drop_' + num).css('left', newPosition);

        num--;
        snowDrop(num, randomInt(60, 1680));
    }
};

// Function to generate random integer within a range
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// Handling URL parameters
var yes = document.getElementById('yes');
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

// Get 'link' parameter from the URL
var link = getUrlParameter('link');

// If 'link' parameter is defined and contains "//", set the 'href' attribute of 'yes'
if (typeof link !== 'undefined' && link.match(/\/\//g)) {
    yes.href = link;
} else {
    console.log('Không tìm thấy link!');
}

// Handle window resize to make the snowfall effect responsive
$(window).resize(function () {
    // Clear existing snowflakes
    $('.drop.snow').remove();

    // Call snowDrop function again to reposition snowflakes based on the new screen width
    // snowDrop(150, randomInt(60, 1480));
    snowDrop(150, randomInt(60, 1580));
});

// Initial call to create the snowfall effect
// snowDrop(150, randomInt(60, 1480));
// snow(150, 150);


