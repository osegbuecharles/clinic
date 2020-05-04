$(document).ready(function(){  
  setInterval(getDate,86400000);
  //setInterval(getTime,60000);
  document.getElementById("date_input").min=getDate();

  $("#time_input").focus(function(){
    var da=$("#date_input").val();
    if(da==getDate()){
      document.getElementById("time_input").min=getTime();
    }
    else{
      document.getElementById("time_input").min="00:00";
    }
  });

  $("#set_appointment_form").submit(function(e){
    e.preventDefault();
    submitAppointment();
  });
  
  loadTodayAppointments();
  loadUpcomingAppointments();
  loadStatus();
  $("#appointment_search_form").submit(async function(e){
    e.preventDefault();
    search();
  });

});







function getDate(){
  var date= new Date();
  if(date.getMonth()<9){
    currentDate=date.getFullYear()+"-0"+(date.getMonth()+1)+"-"+date.getDate()
  }
  else{
    currentDate=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
  }
  document.getElementById("date_input").min=currentDate;
  return currentDate;
}

function getTime(){
  var date= new Date();
  if(date.getMinutes()<10){
    time=date.getHours()+":0"+date.getMinutes();
  }
  else{
    time=date.getHours()+":"+date.getMinutes();
  }
  
  return time;
}


function getTodayAppointments(){
  param={
    matricNo:sessionStorage.getItem("username"),
    password:sessionStorage.getItem("password"),
  };
  return new Promise(resolve => {
    $.get("../API/getTodayAppointmentsUser",param, function(data, status){
      resolve(data);
    });
  });
}

function getUpcomingAppointments(){
  param={
    matricNo:sessionStorage.getItem("username"),
    password:sessionStorage.getItem("password"),
  };
  return new Promise(resolve => {
    $.get("../API/getUpcomingAppointmentsUser",param, function(data, status){
      resolve(data);
    });
  });
}

function getAppointmentByStatus(status){
  param={
    matricNo:sessionStorage.getItem("username"),
    password:sessionStorage.getItem("password"),
    status:status
  };
  return new Promise(resolve => {
    $.get("../API/getAppointmentByStatusUser",param, function(data, status){
      resolve(data);
    });
  });
}

function getAppointmentById(id){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password"),
      id:id
    };
    return new Promise(resolve => {
      $.get("../API/getAppointmentByIdUser",param, function(data, status){
        resolve(data);
      });
    });
}

function getAppointmentByReason(reason){
  param={
    matricNo:sessionStorage.getItem("username"),
    password:sessionStorage.getItem("password"),
    reason: reason
  };
  return new Promise(resolve => {
    $.get("../API/getAppointmentByReasonUser",param, function(data, status){
      resolve(data);
    });
  });
}

function getAppointmentByDate(date){
  param={
    matricNo:sessionStorage.getItem("username"),
    password:sessionStorage.getItem("password"),
    date:date
  };
  return new Promise(resolve => {
    $.get("../API/getAppointmentByDateUser",param, function(data, status){
      resolve(data);
    });
  });
}

function setAppointment(reason,date,time){
  param={
    matricNo:sessionStorage.getItem("username"),
    password:sessionStorage.getItem("password"),
    reason:reason,
    date:date,
    time:time
  };
  return new Promise(resolve => {
    $.get("../API/setAppointmentUser",param, function(data, status){
      resolve(data);
    });
  });
}






async function loadTodayAppointments(){
  var today_appointment= await getTodayAppointments();
  if(today_appointment.error==false){
      if(today_appointment.data.length<1){
          $("#Today").html(`
              <div class="noappointment">You have no Appointments Today!</div>            
          `);
      }
      else{
          $("#Today").html(`
              <table id="todayappointment_table" class="table-md table-bordered">
                  <thead class="table_heading">
                      <tr>
                        <th>id</th>
                        <th>Reason</th>
                        <th>Time</th>
                        <th>Status</th>
                      <tr>
                  <thead>
                  <tbody id="todayappointments_tablebody" class="table_body">
                  
                  </tbody>
              </table>
          `);
          for(i=0;i<today_appointment.data.length;i++){
              $("#todayappointments_tablebody").append(`
                  <tr>
                      <td>`+today_appointment.data[i].id +`</td>
                      <td>`+today_appointment.data[i].reason +`</td>
                      <td>`+today_appointment.data[i].time +`</td>
                      <td>`+today_appointment.data[i].status +`</td>
                  </tr>
              `);
          }
      }
  }
  else{
      $("#Today").html(`<span class="warning">Oops! An error Occured! Try logging out and logging in!</span>`);
  }
}

async function loadUpcomingAppointments(){
  var upcoming_appointment= await getUpcomingAppointments();
  if(upcoming_appointment.error==false){
      if(upcoming_appointment.data.length<1){
          $("#Upcoming").html(`
              <div class="noappointment">You have no Upcoming Appointments</div>            
          `);
      }
      else{
          $("#Upcoming").html(`
              <table id="upcomingappointment_table" class="table-md table-bordered">
                  <thead class="table_heading">
                      <tr>
                        <th>id</th>
                        <th>Reason</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                      <tr>
                  <thead>
                  <tbody id="upcomingappointments_tablebody" class="table_body">
                  
                  </tbody>
              </table>
          `);
          for(i=0;i<upcoming_appointment.data.length;i++){
              $("#upcomingappointments_tablebody").append(`
                  <tr>
                      <td>`+upcoming_appointment.data[i].id +`</td>
                      <td>`+upcoming_appointment.data[i].reason +`</td>
                      <td>`+upcoming_appointment.data[i].date +`</td>
                      <td>`+upcoming_appointment.data[i].time +`</td>
                      <td>`+upcoming_appointment.data[i].status +`</td>
                  </tr>
              `);
          }
      }
  }
  else{
      $("#Upcoming").html(`<span class="warning">Oops! An error Occured! Try logging out and logging in!</span>`);
  }
}

async function loadStatus(){
  loadApproved();
  loadPending();
  loadCompleted();
  loadDeclined();
}

async function loadApproved(){
  var approved_appointment= await getAppointmentByStatus("Approved");
  if(approved_appointment.error==false){
      if(approved_appointment.data.length<1){
          $("#Approved").html(`
              <div class="noappointment">You have no Approved Appointments</div>            
          `);
      }
      else{
          $("#Approved").html(`
              <table id="approvedappointment_table" class="table-md table-bordered">
                  <thead class="table_heading">
                      <tr>
                        <th>id</th>
                        <th>Reason</th>
                        <th>Date</th>
                        <th>Time</th>
                      <tr>
                  <thead>
                  <tbody id="approvedappointments_tablebody" class="table_body">
                  
                  </tbody>
              </table>
          `);
          for(i=0;i<approved_appointment.data.length;i++){
              $("#approvedappointments_tablebody").append(`
                  <tr>
                      <td>`+approved_appointment.data[i].id +`</td>
                      <td>`+approved_appointment.data[i].reason +`</td>
                      <td>`+approved_appointment.data[i].date +`</td>
                      <td>`+approved_appointment.data[i].time +`</td>
                  </tr>
              `);
          }
      }
  }
  else{
      $("#Approved").html(`<span class="warning">Oops! An error Occured! Try logging out and logging in!</span>`);
  }
}

async function loadPending(){
  var pending_appointment= await getAppointmentByStatus("Pending");
  if(pending_appointment.error==false){
      if(pending_appointment.data.length<1){
          $("#Pending").html(`
              <div class="noappointment">You have no Pending Appointments</div>            
          `);
      }
      else{
          $("#Pending").html(`
              <table id="pendingappointment_table" class="table-md table-bordered">
                  <thead class="table_heading">
                      <tr>
                        <th>id</th>
                        <th>Reason</th>
                        <th>Date</th>
                        <th>Time</th>
                      <tr>
                  <thead>
                  <tbody id="pendingappointments_tablebody" class="table_body">
                  
                  </tbody>
              </table>
          `);
          for(i=0;i<pending_appointment.data.length;i++){
              $("#pendingappointments_tablebody").append(`
                  <tr>
                      <td>`+pending_appointment.data[i].id +`</td>
                      <td>`+pending_appointment.data[i].reason +`</td>
                      <td>`+pending_appointment.data[i].date +`</td>
                      <td>`+pending_appointment.data[i].time +`</td>
                  </tr>
              `);
          }
      }
  }
  else{
      $("#Pending").html(`<span class="warning">Oops! An error Occured! Try logging out and logging in!</span>`);
  }
}

async function loadDeclined(){
  var declined_appointment= await getAppointmentByStatus("Declined");
  if(declined_appointment.error==false){
      if(declined_appointment.data.length<1){
          $("#Declined").html(`
              <div class="noappointment">You have no Declined Appointments</div>            
          `);
      }
      else{
          $("#Declined").html(`
              <table id="declinedappointment_table" class="table-md table-bordered">
                  <thead class="table_heading">
                      <tr>
                        <th>id</th>
                        <th>Reason</th>
                        <th>Date</th>
                        <th>Time</th>
                      <tr>
                  <thead>
                  <tbody id="declinedappointments_tablebody" class="table_body">
                  
                  </tbody>
              </table>
          `);
          for(i=0;i<declined_appointment.data.length;i++){
              $("#declinedappointments_tablebody").append(`
                  <tr>
                      <td>`+declined_appointment.data[i].id +`</td>
                      <td>`+declined_appointment.data[i].reason +`</td>
                      <td>`+declined_appointment.data[i].date +`</td>
                      <td>`+declined_appointment.data[i].time +`</td>
                  </tr>
              `);
          }
      }
  }
  else{
      $("#Declined").html(`<span class="warning">Oops! An error Occured! Try logging out and logging in!</span>`);
  }
}

async function loadCompleted(){
  var completed_appointment= await getAppointmentByStatus("Completed");
  if(completed_appointment.error==false){
      if(completed_appointment.data.length<1){
          $("#Completed").html(`
              <div class="noappointment">You have no Completed Appointments</div>            
          `);
      }
      else{
          $("#Completed").html(`
              <table id="completedappointment_table" class="table-md table-bordered">
                  <thead class="table_heading">
                      <tr>
                        <th>id</th>
                        <th>Reason</th>
                        <th>Date</th>
                        <th>Time</th>
                      <tr>
                  <thead>
                  <tbody id="completedappointments_tablebody" class="table_body">
                  
                  </tbody>
              </table>
          `);
          for(i=0;i<completed_appointment.data.length;i++){
              $("#completedappointments_tablebody").append(`
                  <tr>
                      <td>`+completed_appointment.data[i].id +`</td>
                      <td>`+completed_appointment.data[i].reason +`</td>
                      <td>`+completed_appointment.data[i].date +`</td>
                      <td>`+completed_appointment.data[i].time +`</td>
                  </tr>
              `);
          }
      }
  }
  else{
      $("#Declined").html(`<span class="warning">Oops! An error Occured! Try logging out and logging in!</span>`);
  }
}

async function search(){
  $(".appointment_search_result").html("");
  var value=$("#appointment_search_value").val();
  var byId= await getAppointmentById(value);
  var byReason= await getAppointmentByReason(value);
  var byDate= await getAppointmentByDate(value);

  if(byId.error==true && byReason.error==true && byDate.error==true){
    $("appointment_search_result").html(`
      <div class="noappointment">Oops! No result!</div>            
    `);
  }
  else if(byId.data<1 && byReason.data.length<1 && byDate.data.length<1){
    $(".appointment_search_result").html(`
      <div class="noappointment">Oops! No result!</div>            
    `);
  }
  else{
    $(".appointment_search_result").append(`
      <table id="appointment_search_result_table" class="table-md table-bordered">
        <thead class="table_heading">
            <tr>
              <th>id</th>
              <th>Reason</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            <tr>
        <thead>
        <tbody id="appointment_search_result_tablebody" class="table_body">
        
        </tbody>
      </table>`
    );
    if(byId.data.id){
      $("#appointment_search_result_tablebody").append(`
        <tr>
          <td><b>`+byId.data.id +`</b></td>
          <td>`+byId.data.reason +`</td>
          <td>`+byId.data.date +`</td>
          <td>`+byId.data.time +`</td>
          <td>`+byId.data.status +`</td>
        </tr>
      `);
    }
    if(byReason.data.length>0){
      for(i=0;i<byReason.data.length;i++){
        $("#appointment_search_result_tablebody").append(`
          <tr>
            <td>`+byReason.data[i].id +`</td>
            <td><b>`+byReason.data[i].reason +`</b></td>
            <td>`+byReason.data[i].date +`</td>
            <td>`+byReason.data[i].time +`</td>
            <td>`+byReason.data[i].status +`</td>
          </tr>
        `);
      }
    }
    if(byDate.data.length>0){
      for(i=0;i<byDate.data.length;i++){
        $("#appointment_search_result_tablebody").append(`
          <tr>
            <td>`+byDate.data[i].id +`</td>
            <td>`+byDate.data[i].reason +`</td>
            <td><b>`+byDate.data[i].date +`</b></td>
            <td>`+byDate.data[i].time +`</td>
            <td>`+byDate.data[i].status +`</td>
          </tr>
        `);
      }
    }
  }
}

async function submitAppointment(){
  $(window).scrollTop(0);
  $(".modal-header").html(`<h2>New Appointment</h2>`);

  $(".modal-body").html(`
    <div>
      <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
    </div>
  `);
  document.getElementById("showModal").click();

  var reason=$("#reason_input").val();
  var date=$("#date_input").val();
  var time=changeTime($("#time_input").val());

  var res= await setAppointment(reason,date,time);

  if(res.error==true){
    $(".spinner-border").fadeOut(function(){
      $(".modal-body").html(`
        <p class="container">
          `+res.message+`
        </p>
      `);
    });
    $(".modal-footer").html(`
      <button type="button" class="btn btn-block btn-danger closee" data-dismiss="modal">Close</button>
    `);
    $(".closee").click(function(){
      $("#reason_input").val("");
      $("#date_input").val("");
      $("#time_input").val("");
    });
  }

  else{
    $(".spinner-border").fadeOut(function(){
      $(".modal-body").html(`
        <p class="container">
          Appointment has been set.<br/> Awaiting Approval!
        </p>
      `);
    });
    $(".modal-footer").html(`
      <button type="button" class="btn btn-block btn-success closee" data-dismiss="modal">Close</button>
    `);
    $(".closee").click(function(){
      $("#reason_input").val("");
      $("#date_input").val("");
      $("#time_input").val("");
      loadTodayAppointments();
      loadUpcomingAppointments();
      loadStatus();
    });
 
  }
}

function changeTime(time){
  if(time.substring(0,2)==0){
    time="12:"+time.substring(3,5)+"am";
  }
  else if(time.substring(0,2)<12){
    time=time.substring(0,2)+":"+time.substring(3.5)+"am";
  }
  else if(time.substring(0,2)==12){
    time=time.substring(0,2)+":"+time.substring(3,5)+"pm";
  }
  else if(time.substring(0,2)>12){
    time=(time.substring(0,2)-12)+":"+time.substring(3,5)+"pm";
  }
  return time;
}



function openAppointmentTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("viewappointments_tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("viewappointments_tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}


function openStatusTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("viewstatus_tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("viewstatus_tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
