$('.login_btn').on('click',function(){

    $('#main-container').css({
        "margin-top":"0px",
        "transition":"1s ease-in-out",
    });

   console.log("seee");
})
function hideloginform(){

    $('#main-container').css({
        "margin-top":"-800px",
        "transition":"1s linear"
    });
    

   console.log("seee");
}
function showsignupform(){
    $('#main-container').css({
        "margin-top":"-800px",
        "transition":"1s linear"
    });

    $('.m-container').css({
        "margin-top":"0px",
        "transition":"0.8s ease-in-out"
    });
    

   console.log("seee");
}
function hidesignupform(){

    $('.m-container').css({
        "margin-top":"800px",
        "transition":"1s ease-in-out"
    });
    

   console.log("seee");
}
   