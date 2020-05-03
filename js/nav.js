$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
    $('.toast').toast('show');
    if(sessionStorage.getItem("darkmode")=="on"){
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
 /*   // When the user scrolls the page, execute myFunction
    window.onscroll = function() {myFunction()};

    // Get the navbar
    var navbar =document.getElementById("navbar");


    // Get the offset position of the navbar
    var sticky = navbar.offsetTop;


    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
        if (window.pageYOffset >= sticky+30) {
            navbar.classList.add("sticky")
        } else {
            navbar.classList.remove("sticky");
        }
    }
});
*/


function active(target){
  // Get all elements with class="nav_home" and remove the class "active"
  $(".nav_home").removeClass("active")

  //add an "active" class to the link that opened the tab
  $("#"+target).addClass(" active");
}



