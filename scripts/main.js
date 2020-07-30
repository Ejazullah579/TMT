
// let user_info= localStorage.getItem('user_info');
var data=require('../api/routes/route1');
var user_info=data.getdata();

$(document).ready(() => {
    // let shit=async function(){
    //      await getvarvalue();
    // };
    // shit();
    console.log("user_info:"+user_info);
    // if (user_info == 0||user_info==null||user_info==undefined) {
    //     // var item = `<button class="s-btn login_btn">Log in</button>`;
    //     // $('.user_info').html(item);
    //     $('.s-btn').css("display","block");
    //     $('.user').css("display","none");
    // }
    // if(user_info==1){
    //     $('.user').css("display","block");
    //     $('.s-btn').css("display","none");
    // }
    // console.log('User-info:'+user_info);

});

$('.logout').on('click', function () {
    localStorage.setItem('user_info',0);
    
})

$('.login_btn').on('click', function () {
    $('#main-container').css({
        "margin-top": "0px",
        "transition": "1s ease-in-out",
    });
    console.log("core:"+user_info);
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

 async function getvarvalue(){
     let val;
    const car= await fetch("./api/var.json");
    const res= await car.json();
    val= await res.user_info;
    console.log("res:"+val);
    localStorage.setItem('user_info', await val);
    user_info= await val;
     return  val;
}
