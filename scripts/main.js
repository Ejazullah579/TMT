
$(document).ready(() => {

    user_info=localStorage.getItem('user_info');
    if (user_info == 0||user_info==null) {
        // var item = `<button class="s-btn login_btn">Log in</button>`;
        // $('.user_info').html(item);
        $('.s-btn').css("display","block");
        $('.s-btn2').css("display","none");
    }
    if(user_info==1){
        $('.s-btn2').css("display","block");
        $('.s-btn').css("display","none");
    }
    console.log('User-info:'+user_info);

});

$('.login_btn').on('click', function () {
    $('#main-container').css({
        "margin-top": "0px",
        "transition": "1s ease-in-out",
    });
})
function hideloginform() {
    $('#main-container').css({
        "margin-top": "-800px",
        "transition": "1s linear"
    });
}
function showsignupform() {
    $('#main-container').css({
        "margin-top": "-800px",
        "transition": "1s linear"
    });

    $('.m-container').css({
        "margin-top": "0px",
        "transition": "0.8s ease-in-out"
    });
}
function hidesignupform() {
    $('.m-container').css({
        "margin-top": "800px",
        "transition": "1s ease-in-out"
    });
}


