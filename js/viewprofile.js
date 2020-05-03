$(document).ready(async function(){
    setProfile();

    $(".dp").hover(function(){
      $(".remove_dp").toggle();
      $(".change_dp").toggle();
    });
  
    $(".remove_dp").click(async function(){

      $(".modal-header").html(`<h2>Profile Picture</h2>`);

      $(".modal-body").html(`
        <div>
          <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
        </div>
      `);
      document.getElementById("showModal").click();
       $(window).scrollTop(0);
       $(".modal-body").html(`
       <p class="force text-danger">
        You are about to remove you Profile Picture!
       </p>
       `);
       $(".modal-footer").html(`
          <button type="button" class="btn btn-success message_continue" data-dismiss="modal">Continue</button>
           <button type="button" class="btn btn-danger" data-dismiss="modal">Opps! CLose</button>
       `);
       $(".message_continue").click(async function(){
        var r= await removeDp();
        setProfile();
      });
      });

    $(".change_dp").click(function(){
      $(".modal-header").html(`<h2>Profile Picture</h2>`);

      $(".modal-body").html(`
        <div>
          <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
        </div>
      `);
      document.getElementById("showModal").click();
      changeDp();
    });

    $(".profile_form").submit(function(e){
      e.preventDefault();
      $(".modal-header").html(`<h2>Profile Update</h2>`);

      $(".modal-body").html(`
        <div>
          <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
        </div>
      `);
      document.getElementById("showModal").click();
      sendDetails();
    });

    $("#profile_edit").click(function(){
      $("#profile_edit").hide(function(){
        $("#profile_cancel").show();
      });

      var input = document.getElementsByClassName("profile_input");
      for(i =0; i<input.length;i++){
          input[i].disabled=false;
          input[i].style.background="rgb(124, 195, 243)";
      }

      $(".profile_submit").show();
    });


    $("#profile_cancel").click(function(){
      $("#profile_cancel").hide(function(){
        $("#profile_edit").show();
      });

      var input=document.getElementsByClassName("profile_input");
      for(i=0; i<input.length;i++){
        input[i].disabled=true;
        input[i].style.background="rgb(71, 173, 241)";
      }

      $(".profile_submit").hide();

    });


});


function removeDp(){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password")
    };
    return new Promise(resolve => {
      $.get("../API/removeDp",param, function(data, status){
        resolve(data);
      });
    });
}

function getUser(matricNo){
    param={
      matricNo:matricNo,
      password:sessionStorage.getItem("password")
    };
    return new Promise(resolve => {
      $.get("../API/getUserDetails",param, function(data, status){
        resolve(data);
      });
    });
}

function setUser(matricNo,lastName,firstName,email,phone,address){
  param={
    matricNo:matricNo,
    password:sessionStorage.getItem("password"),
    lastName:lastName,
    firstName:firstName,
    email:email,
    phone:phone,
    address:address
  };
  return new Promise(resolve => {
    $.get("../API/setUserDetails",param, function(data, status){
      resolve(data);
    });
  });
}



async function setProfile(){
  $(window).scrollTop(0);
    var details= await getUser(sessionStorage.getItem("username"));
    if(details.data.type=="admin"){
      $("#main-nav").append(`
        <li class="nav-item">
          <a id="about" class="nav-link home_nav" href="../admin">Admin View</a>
        </li>
      `);
    }
    $(".matric").html(details.data.matricNo);
    $("#profile_lastName").val(details.data.lastName);
    $("#profile_firstName").val(details.data.firstName);
    $("#profile_email").val(details.data.email);
    $("#profile_phone").val(details.data.phone);
    $("#profile_address").val(details.data.address);
    $("#profile_dob").html(details.data.dob);
    if(details.data.gender=="m"){
      $("#profile_gender").html("Male");
    }
    else if(details.data.gender=="f"){
      $("#profile_gender").html("Female");
    }

    if(details.data.dp==null){
      $(".image").html(`<img class="dp_image" src="../assets/profile.png"/>`);
    }
    else{
      $(".image").html(`<img class="dp_image" src="`+details.data.dp+`"/>`);
    }
}


async function sendDetails(){
    var matric=sessionStorage.getItem("username");
    var lastName=$("#profile_lastName").val();
    var firstName=$("#profile_firstName").val();
    var email=$("#profile_email").val();
    var phone=$("#profile_phone").val();
    var address=$("#profile_address").val();
    
    var setresponse=await setUser(matric,lastName,firstName,email,phone,address);

    if(setresponse["error"]==true){
      $(window).scrollTop(0);
      $(".modal-body").html(`
        <p class="message_text">
            `+log["message"]+`
        </p>
      `);
      $(".modal-footer").html(`
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      `);
    }
    else if(setresponse["error"]==false){
      $(window).scrollTop(0);
      $(".modal-body").html(`
        <p class="text-success">
            Profile Updated!
        </p>
      `);
      $(".modal-footer").html(`
        <button type="button" class="btn btn-success message_con" data-dismiss="modal">Close</button>
      `);
      $(".message_con").click(async function(){
          document.getElementById("profile_cancel").click();
          setProfile();
        });
      }  
}


function changeDp(){
  $(window).scrollTop(0);
  $(".modal-body").html(`
    <form method="post" action="" enctype="multipart/form-data">

    <input type="text"  name="matricNo" value="`+sessionStorage.getItem("username")+`" style="display:none;" required>

    <input type="password"  name="password" value="`+sessionStorage.getItem("password")+`" style="display:none;" required>

    <label class="dp_label" for="displaypicture"><b>Select an Image</b></label><br/>
    <input class="dp_input" type="file" accept="image/jpg, image/png, image/jpeg, image/gif" placeholder="Select Product Image" name="displaypicture" required><br/>
  
    <input class="dp_submit" type="submit" value="Upload"/>
</form>
  `);
  $(".modal-footer").html(`
    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
  `);
        
} 