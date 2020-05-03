$(document).ready(async function(){

  $("#main-nav").append(`
    <li class="nav-item">
      <a id="about" class="nav-link home_nav" href="../portal">User View</a>
     </li>
  `);

  var user= await getUserDetails();
  if(user.error==true){
    window.location.replace("../portal");
  }
  if(user.data.type!="admin"){
      window.location.replace("../portal");
  }
  else{

  }

  $("#loader").fadeOut(function(){
    $(".admin_body").fadeIn();
  });

  $(".message").click(function(){
    $(".message_in").fadeOut(function(){
        $(".message").hide();
        $(".message_in").css({"marginTop":"200px","width":"50%","marginLeft":"30%"});
    });
  });
});

function getUserDetails(){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password")
    };
    return new Promise(resolve => {
      $.get("../API/getUserDetails",param, function(data, status){
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
