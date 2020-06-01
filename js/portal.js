$(document).ready(function(){
    
    $("#loader").fadeOut(function(){
        $(".body").fadeIn();
    });

    $(".message").click(function(){
        $(".message_in").fadeOut(function(){
            $(".message").hide();
        });
    });

    if(sessionStorage.getItem("logged")!='true'){
        $(".login").show();
    }
    else{
        $(".portal").show();
    }
    
    $(".login_form").submit(async function(e){
        e.preventDefault();
        document.getElementById("showModal").click();
        var username=$("#login_username_input").val();
        var password=$("#login_password_input").val();
        login(username,password);
    });

    $(".signup_form").submit(async function(e){
        e.preventDefault();
        document.getElementById("showModal").click();
        var matricno=$("#signup_matric_input").val();
        var password=$("#signup_password_input").val();
        var lastName=$("#signup_lastName_input").val();
        var firstName=$("#signup_firstName_input").val();
        var email=$("#signup_email_input").val();
        var dob=$("#signup_dob_input").val();
        var phone="+234"+$("#signup_phone_input").val();
        var address=$("#signup_address_input").val();
        var gender=$("input[name='gender']:checked").val();
        signup(matricno,password,lastName,firstName,email,dob,phone,address,gender);
    });

    $(".signup_button").click(function(){
        $(".login").hide();
        $(".signup").fadeIn();
    });

    $(".login_button").click(function(){
        $(".signup").hide();
        $(".login").fadeIn();
    });
   
});

async function login(username,password){
    $(".modal-body").html(`
        <div>
            <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
        </div>
    `);
    var log= await loginApi(username,password);
    $(".modal-header").html(`<h1>Login Status</h1>`);
    console.log(log);
        if(log["error"]==true){
            $(window).scrollTop(0);
            $(".modal-body").html(`
            <p class="force text-danger">
                `+log["message"]+`!
            </p>
            `);
            $(".modal-footer").html(`
                <button type="button" class="btn btn-danger" data-dismiss="modal">Try Again</button>
            `);
            
        }
        else if(log["error"]==false){
            sessionStorage.setItem("username",username);
            sessionStorage.setItem("logged",true);
            sessionStorage.setItem("password",md5(password));
            $(window).scrollTop(0);
            $(".modal-body").html(`
            <p class="force text-success">
                You have successfully logged in
            </p>
            `);
            $(".modal-footer").html(`
                <button type="button" class="btn btn-success message_close" >Continue</button>
            `);
            $(".message_close").click(async function(){
                window.location.replace("../portal");
            });
            setInterval(refresh,1000);
        }
}

function refresh(){
    window.location.replace("../portal");
}

async function signup(matricno,password,lastName,firstName,email,dob,phone,address,gender){ 
    var sign= await signupApi(matricno,password,lastName,firstName,email,dob,phone,address,gender);
    if(sign["error"]==true){
        $(window).scrollTop(0);
        $(".modal-body").html(`
        <p class="force text-danger">
            `+sign["message"]+`!
        </p>
        `);
        $(".modal-footer").html(`
            <button type="button" class="btn btn-danger" data-dismiss="modal">Try Again</button>
        `);
    }
    else if(sign["error"]==false){
        sessionStorage.setItem("username",matricno);
        sessionStorage.setItem("logged",true);
        sessionStorage.setItem("password",md5(password));
        $(window).scrollTop(0);
        $(".modal-body").html(`
            <p class="force text-success">
                Thanks For signing up!
            </p>
            `);
            $(".modal-footer").html(`
                <button type="button" class="btn btn-success message_close" >Continue</button>
            `);
            $(".message_close").click(async function(){
                window.location.replace("../portal");
            });
    }
}


function loginApi(username,password){
    param={
      username:username,
      password:password
    };
    return new Promise(resolve => {
      $.get("../API/login",param, function(data, status){
        resolve(data);
      });
    });
}

function signupApi(matricno,password,lastName,firstName,email,dob,phone,address,gender){
    param={
      matricNo:matricno,
      password:password,
      lastName:lastName,
      firstName:firstName,
      email:email,
      dob:dob,
      phone:phone,
      address:address,
      gender:gender
    };
    return new Promise(resolve => {
      $.get("../API/signup",param, function(data, status){
        resolve(data);
      });
    });
}


function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }


