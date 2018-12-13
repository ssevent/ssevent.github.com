
var _url = "http://dnn-tts-lb-380170603.ap-northeast-2.elb.amazonaws.com";
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
    load: function(){

    },
    end: function(){

    }
}

$(document).ready(function(){
    $(".main").onepage_scroll({
        sectionContainer: "section",
        easing: "ease",
        animationTime: 1000,
        pagination: true,
        updateURL: false,
        beforeMove: function(index) {},
        loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
        keyboard: true,                  // You can activate the keyboard controls
        responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
        direction: "vertical"
    });

    //
    var va = VoiceAudio.Create(_url);
    var tts_txt = '';
    $("#btn_listen").on("click", function(){
        tts_txt = $("#tts_txt").val();
        va.play(tts_txt);
    });
    $("#btn_send").on("click", function(){
        $.ajax({
            url: _url + "/speech/buffer/mp3",
            type: 'POST',
            beforeSend: function(xhr) {
                loading.load();
            },
            data: $("#message").serialize(),
            success: function(res){
                console.log(res);
            },
            error: function(res){
                console.log(res);
            },
            complete: loading.end()
        });
    });
});