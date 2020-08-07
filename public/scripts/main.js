function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.pf_img').attr('src', e.target.result);
            $('.pf_imgg').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$(".select_img").change(function(){
    readURL(this);
});


$('.login_btn').on('click', function () {
    $('#main-container').css({
        "transform": "translate(0px)",
        "transition": "1s ease-in-out",
    });
    
})
function hideloginform() {
    $('#main-container').css({
        "transform": "translate(-1600px)",
        "transition": "1s linear"
    });
}
function showsignupform() {
    $('#main-container').css({
        "transform": "translate(-1600px)",
        "transition": "1s linear"
    });

    $('.m-container').css({
        "transform": "translate(0px)",
        "transition": "0.8s ease-in-out"
    });
}
function hidesignupform() {
    $('.m-container').css({
        "transform": "translate(1600px)",
        "transition": "1s ease-in-out"
    });
    $('.pf_img').attr("src", "/images/demo.png");
    $('#Sign-up').trigger("reset");
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
