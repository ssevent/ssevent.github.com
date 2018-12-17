
var _url = "https://deeptts.selvy.ai";

var text_template = [
    '친구야! 크리스마스 하루만 착하게 산다고 산타가 선물을 주는 건 아니야.\n' +
    '하지만 앞으로도 그렇게 살면 내년에도 선물을 못 받겠지?\n' +
    '내년엔 꼭 착한 사람이 되서 우리 모두 선물을 받는 사람이 되자!',
    '사랑하는 아이야! 학교는 가기 싫고 공부는 더 싫지? ' +
    '엄마, 아빠도 회사가기가 진짜 싫어! 어서 빨리 커서 너에게 용돈을 받는 날이 왔으면 좋겠다! 딩굴딩굴~',
    '아바마마, 어마마마! 올해도 철 없는 제 걱정을 하느라 고생 많으셨습니다.' +
    '안타깝지만 내년에도 한 해 더 수고 부탁드립니다!',
    '우리의 사랑은 말로 전할 수 없어. 우리 지금 만나! 당장 만나!'
];

var loading = {
    load: function(_this){
		$(_this).find('span').hide();
		$(_this).find('.loader').show();
    },
    play: function(_this){
        $(_this).find('span').text('음성 재생중');
        $(_this).find('span').show();
        $(_this).find('.loader').hide();
    },
    end: function(_this){
        $(_this).find('span').text('음성 들어보기');
		$(_this).find('span').show();
		$(_this).find('.loader').hide();
    }
}

var code = '';

var alertBox = {
    open : function(text){
        $("#messageModal").find(".message-contents").text(text);
        $("#messageModal").show();
    },
    close : function(){
        $("#messageModal").hide();
    },
    closeShare : function(){
        $("#shareModal").hide();
    },
    openShare : function(){
		$( '#share_url' ).click(
			function() {
				var urlbox = document.getElementById('share_url_input');
				urlbox.focus();
				$("#share_url_input").focus().select();
				document.execCommand( 'select' );
				document.execCommand( 'copy' );
				alert( '공유 URL 이 복사 되었습니다.' );
			}
		);
        $("#shareModal").show();
    },
    share : function(sns){
        var code = $("#code").val();
        if(!code || code == "") alert('잘못된 접근입니다.');
        else {
            var url = '';
            switch(sns){
                case 0:
                    sendLink(code);
                    return false;
                    break;
                case 1:
                    url = 'http://twitter.com/share?url=https%3A%2F%2Fpostcard.selvy.ai%2Fsanta%2F%3Fcode%3D' + code + '&text=[셀바스AI]';
                    break;
                case 2:
                    url = 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fpostcard.selvy.ai%2Fsanta%2F%3Fcode%3D' + code + '&amp;src=sdkpreparse';
                    break;
                case 3:
                    url = 'https://social-plugins.line.me/lineit/share?url=https%3A%2F%2Fpostcard.selvy.ai%2Fsanta%2F%3Fcode%3D' + code;
                    break;
            }
            window.open(url, 'blank');
        }
    }
}

function sendLink(code) {
    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: '음성 카드가 도착하였습니다.',
            description: '#크리스마스 카드 #음성지원 #음성카드 #셀바스AI #인공지능',
            imageUrl: 'https://github.com/ssevent/ssevent.github.com/blob/master/images/santa_img_01.png?raw=true',
            link: {
                mobileWebUrl: 'https://voicecard.selvy.ai/santa/?code=' + code,
                webUrl: 'https://voicecard.selvy.ai/santa/?code=' + code
            }
        },
        buttons: [
            {
                title: '음성카드 듣기',
                link: {
                    mobileWebUrl: 'https://voicecard.selvy.ai/santa/?code=' + code,
                    webUrl: 'https://voicecard.selvy.ai/santa/?code=' + code
                }
            }
        ]
    });
}

$(document).ready(function(){
	//
	// https://postcard.selvy.ai/santa/?code= ?
    //
    Kakao.init("a522881bad66036a1c1c21306321d691");
    window.URLSearchParams = window.URLSearchParams || function (searchString) {
        var self = this;
        self.searchString = searchString;
        self.get = function (name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(self.searchString);
            if (results == null) {
                return null;
            }
            else {
                return decodeURI(results[1]) || 0;
            }
        };
    };

    //
    $(".main").onepage_scroll({
        sectionContainer: "section",
        easing: "ease",
        animationTime: 1000,
        pagination: true,
        updateURL: false,
        beforeMove: function(index) {},
        loop: true,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
        keyboard: false,                  // You can activate the keyboard controls
        responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
        direction: "vertical"
    });

    if($("#intro")){
		$(".main").moveTo(2);
	}

    //
    var va = VoiceAudio.Create(_url);
    var va_status = false;
    //Events
	va.loaded = function(){
		loading.load('#btn_listen');
		va_status = true;
	}
    va.played = function(){
        loading.play('#btn_listen');
        va_status = true;
    }
    va.stoped = function(){
		loading.end('#btn_listen');
        va_status = false;
    }
    va.ended = function(){
		loading.end('#btn_listen');
        va_status = false;
    }
    va.onerror = function(err){
		loading.end('#btn_listen');
        alert(err);
    }


    var tts_txt = '';
    $("#btn_listen").on("click", function(){
        if(!va) va = VoiceAudio.Create(_url);
        tts_txt = $("#tts_txt").val();
        if(!va_status) {
			va.play(tts_txt);
			loading.load('#btn_listen');
		}
        else va.stop();
    });

    //
    $("#btn_send").on("click", function(){
        var txt = {"language":0,"speaker":0,"text": $("#tts_txt").val()};
        $.ajax({
            url: _url + "/speech/buffer/mp3",
            type: 'POST',
            contentType: "application/json",
            beforeSend: function(xhr) {
				loading.load('#btn_send');
            },
            data: JSON.stringify(txt),
            success: function(res){
                $("#code").val(res.code);
                $("#share_url_input").text('https://voicecard.selvy.ai/santa/?code=' + res.code)
                alertBox.openShare();
            },
            error: function(res){
                alertBox.open("전송 중 에러가 발생했습니다.");
                console.log(res);
            },
            complete: function(){
            	loading.end('#btn_send')
			}
        });
    });

    //
    $("#btn_feedback").on("click", function(){
        var comment = $("#tts_comment").val();
        if(comment.length < 10){
			alertBox.open("코멘트를 남겨주세요! ( 10자 이상 )");
			return false;
		}
        var txt = {"rating": "5", "comment": $("#tts_comment").val(), "rating": $("#star").val()};
        $.ajax({
            url: _url + "/data/feedback",
            type: 'POST',
            contentType: "application/json",
            beforeSend: function(xhr) {
                loading.load();
            },
            data: JSON.stringify(txt),
            success: function(res){
				$("#tts_txt").val();
                alertBox.open("이벤트에 참여해주셔서 감사합니다!");
            },
            error: function(res){
                alertBox.open("전송 중 에러가 발생했습니다.");
            },
            complete: loading.end()
        });
    });

    //
    $('#tts_txt').keyup(function (e){
        var content = $(this).val();
        if(content.length > 200){
            $(this).val($(this).val().substring(0, 190));
            return false;
        } else {
            $('#tts_txt_count').html(content.length + ' / 200 자');
        }
    });
    $('#tts_txt').keyup();

    //
    $('#tts_comment').keyup(function (e){
        var content = $(this).val();
        if(content.length > 200){
            $(this).val($(this).val().substring(0, 190));
            return false;
        } else {
            $('#tts_comment_count').html(content.length + ' / 200 자');
        }
    });
    $('#tts_comment').keyup();


    $("#btn2_listen").on("click", function(){
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');
        if(code) {
            var mp3 = "https://s3.ap-northeast-2.amazonaws.com/selvydeeptts/santa/" + code + ".mp3";
            var audio = document.createElement("audio");
            audio.preload = "auto";

            audio.controls = false;
            audio.autoplay = false;
            audio.src = mp3;
            audio.oncanplay = function () {
                console.log("Can Play!");
            };
            audio.onerror = function (e) {
                alertBox.open("재생 도중 에러가 발생하였습니다.");
            };
            if(audio.paused) audio.play();
            else audio.pause();
        } else {
            alertBox.open('잘못된 음성 카드 정보입니다.');
        }
    });

    $('#stars li').on('click', function(){
        var onStar = parseInt($(this).data('value'), 10); // The star currently selected
        var stars = $(this).parent().children('li.star');

        for (i = 0; i < stars.length; i++) {
            $(stars[i]).removeClass('selected');
        }

        for (i = 0; i < onStar; i++) {
            $(stars[i]).addClass('selected');
        }

        // JUST RESPONSE (Not needed)
        var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
        $("#star").val(ratingValue);
    });
});
