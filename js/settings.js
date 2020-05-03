$(document).ready(function(){
    if(sessionStorage.getItem("darkmode")=="on"){
        document.getElementById("dark_mode_input").click();
    }
    $(".slider").click(function(){
       if($(".dark_mode_input:checked").val()=="on"){
            sessionStorage.setItem("darkmode","off");
            $("body").css({
                "background-color":"white",
                "color":"black"
           });

           $(".force").css({
            "background-color":"white",
            "color":"black"
            });

            $("#head").html(`<a href="../home"><img src="../assets/Name.png"/></a>`);
       }
       else{
           sessionStorage.setItem("darkmode","on");
           $("body").css({
                "background-color":"rgb(53, 54, 58)",
                "color":"white"
           });

           $(".force").css({
            "background-color":"rgb(53, 54, 58)",
            "color":"white"
            });
            
            $("#head").html(`<a href="../home"><img src="../assets/Name_dark.png"/></a>`);
       }
    });

    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            }
            else {
                panel.style.display = "block";
            }
        });
    }


    $(".logout_button").click(function(){
        sessionStorage.clear();
        window.location.replace("../portal");
    });


    $(".change_password_form").submit(async function(e){
        e.preventDefault();

        $(window).scrollTop(0);
        $(".modal-header").html(`<h2>Password Change</h2>`);
      
        $(".modal-body").html(`
          <div>
            <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
          </div>
        `);
        document.getElementById("showModal").click();
        var oldPassword= $(".old_password").val();
        var newPassword= $(".new_password").val();
        var changePasswordResult= await changePassword(oldPassword,newPassword);
        if(changePasswordResult.error==true){
            $(".spinner-border").fadeOut(function(){
                $(".modal-body").html(`
                    <p class="message_text">
                        `+changePasswordResult["message"]+`
                    </p>
                `);
            });
            $(".modal-footer").html(`
                <button type="button" class="btn btn-block btn-danger closee" data-dismiss="modal">Close</button>
            `);
            $(".closee").click(function(){
                $(".old_password").val("");
                $(".new_password").val("");
            });
        }
        else if(changePasswordResult.error==false){
            $(".spinner-border").fadeOut(function(){
                $(".modal-body").html(`
                    <p class="message_text">
                        Password Changed
                    </p>
                `);
            });
            $(".modal-footer").html(`
                <button type="button" class="btn btn-block btn-success closee" data-dismiss="modal">Close</button>
            `);
            $(".closee").click(function(){
                $(".old_password").val("");
                $(".new_password").val("");
            });
        }
    });
});


function changePassword(oldPassword,newPassword){
    param={
        matricNo:sessionStorage.getItem("username"),
        oldpassword:oldPassword,
        newpassword:newPassword
    }

    return new Promise(resolve => {
        $.get("../API/changePassword",param, function(data,status){
            resolve(data);
        });
    });
}