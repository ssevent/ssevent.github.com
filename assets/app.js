
var _url = "https://deeptts.selvy.ai";

var text_template = [
    '친구야!\n크리스마스 하루만 착하게 산다고 산타가 선물을 주는 건 아니야.\n' +
    '하지만 앞으로도 그렇게 살면 내년에도 선물을 못 받겠지?\n' +
    '내년엔 꼭 착한 사람이 돼서 우리 모두 선물을 받는 사람이 되자!',
    '사랑하는 아이야!\n학교는 가기 싫고 공부는 더 싫지?\n' +
    '엄마 아빠도 회사가기가 진짜 싫어!\n어서 빨리 커서 너에게 용돈을 받는 날이 왔으면 좋겠다! 딩굴딩굴~',
    '아바마마, 어마마마! 올해도 철없는 제 걱정을 하느라 고생 많으셨습니다.\n' +
    '안타깝지만 내년에도 한 해 더 수고 부탁드립니다!',
    '우리의 사랑은 말로 전할 수 없어.\n우리 지금 만나! 당장 만나!'
];

var loading = {
    disable: function(_this){
        $(_this).attr("disabled", true);
        $(_this).addClass("disabled");
    },
    enable: function(_this){
        $(_this).attr("disabled", false);
        $(_this).removeClass("disabled");
    },
    load: function(_this){
        $(_this).attr("disabled", true);

		$(_this).find('span').hide();
		$(_this).find('.loader').show();
    },
    play: function(_this){
        $(_this).attr("disabled", false);
        
        $(_this).find('span').text('음성 중지하기');
        $(_this).find('span').show();
        $(_this).find('.loader').hide();
    },
    end: function(_this){
        $(_this).attr("disabled", false);

        $(_this).find('span').text('음성 들어보기');
		$(_this).find('span').show();
		$(_this).find('.loader').hide();
    }
}

var sending = {
    disable: function(_this){
        $(_this).attr("disabled", true);
        $(_this).addClass("disabled");
    },
    enable: function(_this){
        $(_this).attr("disabled", false);
        $(_this).removeClass("disabled");
    },
    load: function(_this){
        $(_this).attr("disabled", true);
        //$(_this).addClass("disabled");

        $(_this).find('span').hide();
        $(_this).find('.loader').show();
    },
    complete: function(_this){
        $(_this).attr("disabled", false);
        //$(_this).removeClass("disabled");

        $(_this).find('span').text('음성카드 보내기');
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
        var code = $("#code").val();
        if(!code || code == "") alert('잘못된 접근입니다.');
        else {
            var url = "https://voicecard.selvy.ai/santa/?code=" + code;
            $("#share_url_input").text(url)
        }

		$( '#share_url' ).off('click').on('click', function(){
                var t = document.createElement("textarea");
                document.body.appendChild(t);
                t.value = $("#share_url_input").text();
                t.select();
                   
                var res = document.execCommand( 'copy' );
                document.body.removeChild(t);

				if(res){
                    alert( '공유 URL 이 복사 되었습니다.' );
                    $( '#share_url' ).off('click');
                }else{
                    alert( '텍스트를 직접 선택하여 복사합니다.' );
                    $( '#share_url' ).off('click');
                }
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
                    url = 'http://twitter.com/share?url=https%3A%2F%2Fvoicecard.selvy.ai%2Fsanta%2F%3Fcode%3D' + code + '&text=%5B%EC%9D%B8%EA%B3%B5%EC%A7%80%EB%8A%A5%20%EC%82%B0%ED%83%80%EC%86%8C%ED%99%98%20%EC%9D%B4%EB%B2%A4%ED%8A%B8%5D';
                    break;
                case 2:
                    url = 'https://www.facebook.com/sharer.php?u=https%3A%2F%2Fvoicecard.selvy.ai%2Fsanta%2F%3Fcode%3D' + code;
                    break;
                case 3:
                    url = 'https://social-plugins.line.me/lineit/share?url=https%3A%2F%2Fvoicecard.selvy.ai%2Fsanta%2F%3Fcode%3D' + code + '&text=%5B%EC%9D%B8%EA%B3%B5%EC%A7%80%EB%8A%A5%20%EC%82%B0%ED%83%80%EC%86%8C%ED%99%98%20%EC%9D%B4%EB%B2%A4%ED%8A%B8%5D';
                    break;
            }
            window.open(url, '_blank');
        }
    }
}

var noticeBox = {
    close : function(){
        $("#noticeModal").hide();
        sessionStorage.setItem("isCloseEventNotice", "true");
    },
    open : function(){
        $("#noticeModal").show();
    }
}

function sendLink(code) {
    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: '음성 카드가 도착하였습니다.',
            description: '#크리스마스 카드 #음성지원 #음성카드 #셀바스AI #인공지능',
            imageUrl: 'https://voicecard.selvy.ai/images/santa_img_01.png?raw=true',
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




var va = null;

$(document).ready(function(){
	//
	// https://voicecard.selvy.ai/santa/?code= ?
    //
  	$(".main").onepage_scroll({
  		sectionContainer: "section",
  		easing: "ease",
  		animationTime: 1000,
  		pagination: true,
  		updateURL: false,
  		beforeMove: function(index) { },
  		loop: true,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
  		keyboard: false,                  // You can activate the keyboard controls
  		responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
  		direction: "vertical"
  	});

    Kakao.init("05e498922eaae22574ef07c723d026dc"); //Kakao

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

    var prev_sub_context = null;
    $(".page_faq").find(".sub_title").on("click", function(){
        var cur_sub_context = $(this).next(); 
        if(prev_sub_context != null){
            if($(prev_sub_context).is($(cur_sub_context)) || $(prev_sub_context).is(":visible")){
                prev_sub_context.toggle();
            }
        }else{
            if($(cur_sub_context).is(":visible")){
                return;
            }
        }

        if(!$(prev_sub_context).is($(cur_sub_context))){
            cur_sub_context.toggle();
        }

        prev_sub_context = cur_sub_context;
    });

    if($("#intro")){
		$(".main").moveTo(2);
	}

    var tts_txt = '';
    var va_status = false;
    $("#btn_listen").on("click", function(){
        tts_txt = $("#tts_txt").val();
        if( $.trim(tts_txt).length < 5){
            alertBox.open("조금 더 길게 입력하고 들어보세요.");
            return;
        }

        if(!va) {
            //
            va = VoiceAudio.Create(_url);
            //Events
            va.loaded = function(){
                sending.disable('#btn_send');
                loading.load('#btn_listen');
                va_status = true;
            }
            va.played = function(){
                sending.disable('#btn_send');
                loading.play('#btn_listen');
                va_status = true;
            }
            va.stoped = function(){
                sending.enable('#btn_send');
                loading.end('#btn_listen');
                va_status = false;
            }
            va.ended = function(){
                sending.enable('#btn_send');
                loading.end('#btn_listen');
                va_status = false;
            }
            va.onerror = function(err){
                sending.enable('#btn_send');
                loading.end('#btn_listen');
                va_status = false;
                alertBox.open(err.errorMessage);
            }
        }
        
        if(!va_status) {
            va.play(tts_txt);
            sending.disable('#btn_send');
            loading.load('#btn_listen');
            gtag('event', 'click', {'send_to': 'UA-130813910-1','event_category': 'preview_speech', 'event_action': 'click'});
		}
        else va.stop();
    });

    //
    $("#btn_send").on("click", function(){
        tts_txt = $("#tts_txt").val();
        if( $.trim(tts_txt).length < 5){
            alertBox.open("조금 더 길게 입력하고 공유해주세요.");
            return;
        }

        var txt = {"language":0,"speaker":0,"text": tts_txt};
        $.ajax({
            url: _url + "/speech/buffer/mp3",
            type: 'POST',
            contentType: "application/json",
            headers: {
                'x-selvy-token': GetToken()
            },
            beforeSend: function(xhr) {
                loading.disable('#btn_listen');
                sending.load('#btn_send');
            },
            data: JSON.stringify(txt),
            success: function(res){
                $("#code").val(res.code);
                alertBox.openShare();
            },
            error: function(res){
                var errMsg = '';
                if(res.status == 400){
                    errMsg = "잘못된 메시지입니다.";
                }else{
                    errMsg = "합성할 수 없는 메시지입니다.";
                    /*
                    resp = JSON.parse(res.responseText);
                    if(resp.message){
                        errMsg = "에러가 발생했습니다.(" + resp.message + ")"
                    }else{
                        errMsg = "알수 없는 에러가 발생했습니다.";
                    }
                    */
                }
                alertBox.open(errMsg);
            },
            complete: function(){
                loading.enable('#btn_listen');
            	sending.complete('#btn_send')
			}
        });
        gtag('event', 'click', {'send_to': 'UA-130813910-1','event_category': 'share_speech', 'event_action': 'click'});
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
            headers: {
                'x-selvy-token': GetToken()
            },
            beforeSend: function(xhr) {
                loading.load();
            },
            data: JSON.stringify(txt),
            success: function(res){
                alertBox.open("이벤트에 참여해주셔서 감사합니다!");
                gtag('event', 'click', {'send_to': 'UA-130813910-1','event_category': 'send_feedback', 'event_action': 'click'});
            },
            error: function(res){
                alertBox.open("전송 중 에러가 발생했습니다.");
            },
            complete: function(){
                $("#tts_comment").val("");
                $("#star").val("0");
                $("#stars li").removeClass('selected');
                $('#tts_comment').keyup();

                loading.end()
            }
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

    var audio = null;
    $("#btn2_listen").on("click", function(){
		const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if(code) {
            if(!audio){
                var mp3 = "https://s3.ap-northeast-2.amazonaws.com/selvydeeptts/santa/" + code + ".mp3";
                audio = document.createElement("audio");
                audio.preload = "auto";

                audio.controls = false;
                audio.autoplay = false;
                audio.src = mp3;
                audio.oncanplay = function () {
                    //console.log("Can Play!");
                    //loading.play('#btn2_listen');
                    va_status = true;
                };
                audio.onended = function(){
                    loading.end('#btn2_listen');
                    va_status = false;
                };
                audio.onpause = function(){
                    loading.end('#btn2_listen');
                    va_status = false;
                };
                audio.onerror = function (e) {
                    loading.end('#btn2_listen');
                    va_status = false;

                    audio.src = "https://s3.ap-northeast-2.amazonaws.com/selvydeeptts/santa/invalid.mp3";
                    alertBox.open("재생 도중 에러가 발생하였습니다.");
                };
            }
            
            if(!va_status || audio.paused) {
                loading.load('#btn2_listen');
                audio.play();
                loading.play('#btn2_listen');
                va_status = true;
                gtag('event', 'click', {'send_to': 'UA-130813910-1','event_category': 'listen_speech', 'event_action': 'click'});
            }
            else {
                audio.pause();
                audio.currentTime = 0;
            }
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
