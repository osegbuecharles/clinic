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
    loadUpcomingAppointments(1,3);
    loadStatus();
    $("#appointment_search_form").submit(async function(e){
      e.preventDefault(1,3);
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
  

  //API'S
  
  function getTodayAppointments(){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password"),
    };
    return new Promise(resolve => {
      $.get("../API/getTodayAppointments",param, function(data, status){
        resolve(data);
      });
    });
  }
  
  function getUpcomingAppointments(pageNum,pageSize){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password"),
      pageNum:pageNum,
      pageSize:pageSize
    };
    return new Promise(resolve => {
      $.get("../API/getUpcomingAppointments",param, function(data, status){
        resolve(data);
      });
    });
  }
  
  function getAppointmentByStatus(status,pageNum,pageSize){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password"),
      pageNum:pageNum,
      pageSize:pageSize,
      status:status
    };
    return new Promise(resolve => {
      $.get("../API/getAppointment",param, function(data, status){
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
        $.get("../API/getAppointmentById",param, function(data, status){
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
      $.get("../API/getAppointmentByReason",param, function(data, status){
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
      $.get("../API/getAppointmentByDate",param, function(data, status){
        resolve(data);
      });
    });
  }

  function getAppointmentByMatric(id,pageNum,pageSize){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password"),
      pageSize:pageSize,
      pageNum:pageNum,
      patientId:id
    };  
    return new Promise(resolve => {
      $.get("../API/getAppointment",param, function(data, status){
        resolve(data);
      });
    });
  }
  
  function setAppointment(id,reason,date,time){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password"),
      patientId:id,
      reason:reason,
      date:date,
      time:time
    };
    return new Promise(resolve => {
      $.get("../API/setAppointment",param, function(data, status){
        resolve(data);
      });
    });
  }

   
  function setAppointmentStatus(id,status){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password"),
      id:id,
      status:status
    };
    return new Promise(resolve => {
      $.get("../API/appointmentStatus",param, function(data, status){
        resolve(data);
      });
    });
  }
  
  function getPatientRecordByAppointment(id){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password"),
      appointmentId:id
    };  
    return new Promise(resolve => {
      $.get("../API/getPatientRecordByAppointment",param, function(data, status){
        resolve(data);
      });
    });
  }
  
  function addPatientRecord(id,pid,notes,diagnosis){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password"),
      appointmentId:id,
      patientId:pid,
      notes:notes,
      diagnosis:diagnosis
    };
    return new Promise(resolve => {
      $.get("../API/addPatientRecord",param, function(data, status){
        resolve(data);
      });
    });
  }
  
  function addPatientDrug(id,did,pid,instructions){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password"),
      appointmentId:id,
      patientId:pid,
      drugId:did,
      instructions:instructions
    };
    return new Promise(resolve => {
      $.get("../API/addPatientDrug",param, function(data, status){
        resolve(data);
      });
    });
  }
  
  function getPatientDrug(id){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password"),
      appointmentId:id
    };  
    return new Promise(resolve => {
      $.get("../API/getPatientDrugByAppointment",param, function(data, status){
        resolve(data);
      });
    });
  }
  
  function getDrugDetails(id){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password"),
      drugId:id
    };
    return new Promise(resolve => {
      $.get("../API/getDrugDetails",param, function(data, status){
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
                <table id="todayappointment_table" class="viewdrugs_table">
                    <thead class="table_heading">
                        <tr>
                          <th>id</th>
                          <th>Patient Id</th>
                          <th>Reason</th>
                          <th>Time</th>
                          <th>Status</th>
                          <th>Actions</th>
                        <tr>
                    <thead>
                    <tbody id="todayappointments_tablebody" class="table_body">
                    
                    </tbody>
                </table>
            `);
            for(i=0;i<today_appointment.data.length;i++){
                if(today_appointment.data[i].status.toLowerCase()=="pending"){
                  $("#todayappointments_tablebody").append(`
                   <tr>
                      <td>`+today_appointment.data[i].id +`</td>
                      <td>`+today_appointment.data[i].matricNo +`</td>
                      <td>`+today_appointment.data[i].reason +`</td>
                      <td>`+today_appointment.data[i].time +`</td>
                      <td>`+today_appointment.data[i].status +`</td>
                      <td> <span class="clickable" onclick="appointmentStatus('`+today_appointment.data[i].id+`','Approved')">Approve</span>&nbsp;<span class="clickable" onclick="appointmentStatus('`+today_appointment.data[i].id+`','Declined')">Decline</span></td>
                   </tr>
                  `);
                }
               else if(today_appointment.data[i].status.toLowerCase()=="approved"){
                  $("#todayappointments_tablebody").append(`
                   <tr>
                     <td>`+today_appointment.data[i].id +`</td>
                     <td>`+today_appointment.data[i].matricNo +`</td>
                     <td>`+today_appointment.data[i].reason +`</td>
                      <td>`+today_appointment.data[i].time +`</td>
                     <td>`+today_appointment.data[i].status +`</td>
                     <td class="clickable" onclick="appointmentStatus('`+today_appointment.data[i].id+`','Completed')">Complete</td>
                   </tr>
                  `);
                }
                else if(today_appointment.data[i].status.toLowerCase()=="completed"){
                  $("#todayappointments_tablebody").append(`
                   <tr>
                     <td>`+today_appointment.data[i].id +`</td>
                     <td>`+today_appointment.data[i].matricNo +`</td>
                     <td>`+today_appointment.data[i].reason +`</td>
                      <td>`+today_appointment.data[i].time +`</td>
                     <td>`+today_appointment.data[i].status +`</td>
                     <td> <span class="clickable" onclick="appointmentRecord('`+today_appointment.data[i].id+`','`+today_appointment.data[i].matricNo+`')">View Record</span> <span class="clickable" onclick="appointmentDrugs('`+today_appointment.data[i].id+`','`+today_appointment.data[i].matricNo+`')">View Drugs</span></td>
                   </tr>
                  `);
                }
            }
        }
    }
    else{
        $("#Today").html(`<span class="warning">Oops! An error Occured! Try logging out and logging in!</span>`);
    }
  }
  
  async function loadUpcomingAppointments(pnum,psize){
    len=await getUpcomingAppointments(1,1);
    if(len.error==false){
        if(len.length<1){
            $("#Upcoming").html(`
                <div class="noappointment">You have no Upcoming Appointments</div>            
            `);
        }
        else{
            $("#Upcoming").html(`
                <table id="upcomingappointment_table" class="viewdrugs_table">
                    <thead class="table_heading">
                        <tr>
                          <th>id</th>
                          <th>Patient Id</th>
                          <th>Reason</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Status</th>
                          <th>Actions</th>
                        <tr>
                    <thead>
                    <tbody id="upcomingappointments_tablebody" class="table_body">
                    
                    </tbody>
                </table>
                <div id="subloader" class="uasb" style="margin-left:25%;margin-top:10px;"></div>
                <div class="upcomingappointmentpagination paginationstyle"></div>
            `);
            if(len.length>psize){
              $(".upcomingappointmentpagination").append(`<a id="upcomingprev">&laquo;</a>`);
              last=Math.ceil(len.length/psize)
              for(i=1;i<=last;i++){
                  if(i==pnum){
                     $(".upcomingappointmentpagination").append(`<a id="upcomingpaginate`+i+`"class="upcomingpaginate active">`+i+`</a>`);
                  }
                  else{
                     $(".upcomingappointmentpagination").append(`<a id="upcomingpaginate`+i+`"class="upcomingpaginate">`+i+`</a>`);
                  }
              }
              $(".upcomingappointmentpagination").append(`<a id="upcomingnext">&raquo;</a>`);
            }
            
          
           $(".upcomingpaginate").click(function(){
            $(".upcomingpaginate").removeClass("active");
            $(this).addClass(" active");
            var index=$('.upcomingpaginate').index(this);
            upcomingpaginate=index+1;
            loadUpcomingAppointments(upcomingpaginate,psize);
           });
          
          
           $("#upcomingprev").click(function(){
             if(upcomingpaginate<=1){
               upcomingpaginate=last;
                page=document.getElementById("upcomingpaginate"+upcomingpaginate);
                page.click();
              }
              else{
                upcomingpaginate-=1;
                page=document.getElementById("upcomingpaginate"+upcomingpaginate);
                page.click();
              }
            });
          
            $("#upcomingnext").click(function(){
              if(upcomingpaginate>=last){
                upcomingpaginate=1;
                page=document.getElementById("upcomingpaginate"+upcomingpaginate);
                page.click();
              }
              else{
               upcomingpaginate+=1;
               page=document.getElementById("upcomingpaginate"+upcomingpaginate);
               page.click();
             }
            });
            $("#upcomingappointments_tablebody").html("");
            $("#upcomingappointments_tablebody").css({"display":"none"});
            $(".uasb").show();

            var upcoming_appointment= await getUpcomingAppointments(pnum,psize);
            for(i=0;i<upcoming_appointment.data.length;i++){
              if(upcoming_appointment.data[i].status.toLowerCase()=="pending"){
                $("#upcomingappointments_tablebody").append(`
                  <tr>
                      <td>`+upcoming_appointment.data[i].id +`</td>
                      <td>`+upcoming_appointment.data[i].matricNo +`</td>
                      <td>`+upcoming_appointment.data[i].reason +`</td>
                      <td>`+upcoming_appointment.data[i].date +`</td>
                      <td>`+upcoming_appointment.data[i].time +`</td>
                      <td>`+upcoming_appointment.data[i].status +`</td>
                      <td> <span class="clickable" onclick="appointmentStatus('`+upcoming_appointment.data[i].id+`','Approved')">Approve</span>&nbsp;<span class="clickable" onclick="appointmentStatus('`+upcoming_appointment.data[i].id+`','Declined')">Decline</span></td>
                  </tr>
              `);
              }
              else if(upcoming_appointment.data[i].status.toLowerCase()=="approved"){
                $("#upcomingappointments_tablebody").append(`
                <tr>
                    <td>`+upcoming_appointment.data[i].id +`</td>
                    <td>`+upcoming_appointment.data[i].matricNo +`</td>
                    <td>`+upcoming_appointment.data[i].reason +`</td>
                    <td>`+upcoming_appointment.data[i].date +`</td>
                    <td>`+upcoming_appointment.data[i].time +`</td>
                    <td>`+upcoming_appointment.data[i].status +`</td>
                    <td class="clickable" onclick="appointmentStatus('`+upcoming_appointment.data[i].id+`','Completed')">Complete</td>
                  </tr>
               `);
              }
              else if(upcoming_appointment.data[i].status.toLowerCase()=="completed"){
                $("#upcomingappointments_tablebody").append(`
                <tr>
                    <td>`+upcoming_appointment.data[i].id +`</td>
                    <td>`+upcoming_appointment.data[i].matricNo +`</td>
                    <td>`+upcoming_appointment.data[i].reason +`</td>
                    <td>`+upcoming_appointment.data[i].date +`</td>
                    <td>`+upcoming_appointment.data[i].time +`</td>
                    <td>`+upcoming_appointment.data[i].status +`</td>
                    <td> <span class="clickable" onclick="appointmentRecord('`+upcoming_appointment.data[i].id+`','`+upcoming_appointment.data[i].matricNo+`')">View Record</span> <span class="clickable" onclick="appointmentDrugs('`+upcoming_appointment.data[i].id+`','`+upcoming_appointment.data[i].matricNo+`')">View Drugs</span></td>
                  </tr>
               `);
              }
          }
          $("#upcomingappointments_tablebody").ready(function(){
            $(".uasb").fadeOut(function(){
              $("#upcomingappointments_tablebody").fadeIn();
            });
          });    
        }
    }
    else{
        $("#Upcoming").html(`<span class="warning">Oops! An error Occured! Try logging out and logging in!</span>`);
    }
  }

  async function loadUpcoming(pageNum,pageSize){
    
   
  }
  
  async function loadStatus(){
    loadApproved();
    loadPending();
    loadCompleted();
    loadDeclined();
  }
  
  async function loadApproved(){
    le= await getAppointmentByStatus("Approved",1,1);
    var approved_appointment= await getAppointmentByStatus("Approved",1,le.length);
    if(approved_appointment.error==false){
        if(approved_appointment.data.length<1){
            $("#Approved").html(`
                <div class="noappointment">You have no Approved Appointments</div>            
            `);
        }
        else{
            $("#Approved").html(`
                <table id="approvedappointment_table" class="viewdrugs_table">
                    <thead class="table_heading">
                        <tr>
                          <th>id</th>
                          <th>Patient Id</th>
                          <th>Reason</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Approved By</th>
                          <th>Date Approved</th>
                          <th>Time Approved</th>
                          <th>Actions</th>
                        <tr>
                    <thead>
                    <tbody id="approvedappointments_tablebody" class="table_body">
                    
                    </tbody>
                </table>
            `);
            for(k=0;k<approved_appointment.data.length;k++){
                creatooor=await getPatient(approved_appointment.data[k].approvedBy);
                $("#approvedappointments_tablebody").append(`
                    <tr>
                        <td>`+approved_appointment.data[k].id +`</td>
                        <td>`+approved_appointment.data[k].matricNo +`</td>
                        <td>`+approved_appointment.data[k].reason +`</td>
                        <td>`+approved_appointment.data[k].date +`</td>
                        <td>`+approved_appointment.data[k].time +`</td>
                        <td>`+creatooor.data.lastName+` `+creatooor.data.firstName+`</td>
                        <td>`+approved_appointment.data[k].dateApproved +`</td>
                        <td>`+approved_appointment.data[k].timeApproved +`</td>
                        <td class="clickable" onclick="appointmentStatus('`+approved_appointment.data[k].id+`','Completed')">Complete</td>
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
    var le=await getAppointmentByStatus("Pending",1,1);
    var pending_appointment= await getAppointmentByStatus("Pending",1,le.length);
    if(pending_appointment.error==false){
        if(pending_appointment.data.length<1){
            $("#Pending").html(`
                <div class="noappointment">There are no Pending Appointments</div>            
            `);
        }
        else{
            $("#Pending").html(`
                <table id="pendingappointment_table" class="viewdrugs_table">
                    <thead class="table_heading">
                        <tr>
                          <th>id</th>
                          <th>Patient Id</th>
                          <th>Reason</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Actions</th>
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
                        <td>`+pending_appointment.data[i].matricNo+`</td>
                        <td>`+pending_appointment.data[i].reason +`</td>
                        <td>`+pending_appointment.data[i].date +`</td>
                        <td>`+pending_appointment.data[i].time +`</td>
                        <td> <span class="clickable" onclick="appointmentStatus('`+pending_appointment.data[i].id+`','Approved')">Approve</span>&nbsp;<span class="clickable" onclick="appointmentStatus('`+pending_appointment.data[i].id+`','Declined')">Decline</span></td>
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
    le= await getAppointmentByStatus("Declined",1,1);
    var declined_appointment= await getAppointmentByStatus("Declined",1,le.length);
    if(declined_appointment.error==false){
        if(declined_appointment.data.length<1){
            $("#Declined").html(`
                <div class="noappointment">There are no Declined Appointments</div>            
            `);
        }
        else{
            $("#Declined").html(`
                <table id="declinedappointment_table" class="viewdrugs_table">
                    <thead class="table_heading">
                        <tr>
                          <th>id</th>
                          <th>Patient Id</th>
                          <th>Reason</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Declined By</th>
                          <th>Date Declined</th>
                          <th>Time Declined</th>
                        <tr>
                    <thead>
                    <tbody id="declinedappointments_tablebody" class="table_body">
                    
                    </tbody>
                </table>
            `);
            for(j=0;j<declined_appointment.data.length;j++){
                var creatoor=await getPatient(declined_appointment.data[j].declinedBy);
                $("#declinedappointments_tablebody").append(`
                    <tr>
                        <td>`+declined_appointment.data[j].id +`</td>
                        <td>`+declined_appointment.data[j].matricNo +`</td>
                        <td>`+declined_appointment.data[j].reason +`</td>
                        <td>`+declined_appointment.data[j].date +`</td>
                        <td>`+declined_appointment.data[j].time +`</td>
                        <td>`+creatoor.data.lastName+` `+creatoor.data.firstName+`</td>
                        <td>`+declined_appointment.data[j].dateDeclined +`</td>
                        <td>`+declined_appointment.data[j].timeDeclined +`</td>
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
    var le=await getAppointmentByStatus("Completed",1,1);
    var completed_appointment= await getAppointmentByStatus("Completed",1,le.length);
    if(completed_appointment.error==false){
        if(completed_appointment.data.length<1){
            $("#Completed").html(`
                <div class="noappointment">There are no Completed Appointments</div>            
            `);
        }
        else{
            $("#Completed").html(`
                <table id="completedappointment_table" class="viewdrugs_table">
                    <thead class="table_heading">
                        <tr>
                          <th>id</th>
                          <th>Patient Id</th>
                          <th>Reason</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Completed By</th>
                          <th>Date Completed</th>
                          <th>Time Completed</th>
                          <th>Action</th>
                        <tr>
                    <thead>
                    <tbody id="completedappointments_tablebody" class="table_body">
                    
                    </tbody>
                </table>
            `);
            for(m=0;m<completed_appointment.data.length;m++){
                creator=await getPatient(completed_appointment.data[m].completedBy);
                $("#completedappointments_tablebody").append(`
                    <tr>
                        <td>`+completed_appointment.data[m].id +`</td>
                        <td>`+completed_appointment.data[m].matricNo +`</td>
                        <td>`+completed_appointment.data[m].reason +`</td>
                        <td>`+completed_appointment.data[m].date +`</td>
                        <td>`+completed_appointment.data[m].time +`</td>
                        <td>`+creator.data.lastName+` `+creator.data.firstName+`</td>
                        <td>`+completed_appointment.data[m].dateCompleted +`</td>
                        <td>`+completed_appointment.data[m].timeCompleted +`</td>
                        <td> <span class="clickable" onclick="appointmentRecord('`+completed_appointment.data[m].id+`','`+completed_appointment.data[m].matricNo+`')">View Record</span> <span class="clickable" onclick="appointmentDrugs('`+completed_appointment.data[m].id+`','`+completed_appointment.data[m].matricNo+`')">View Drugs</span></td>
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
    var le= await getAppointmentByMatric(value,1,1);
    var byMatric=await getAppointmentByMatric(value,1,le.length)
  
    if(byId.error==true && byReason.error==true && byDate.error==true && byMatric.error==true){
      $("appointment_search_result").html(`
        <div class="noappointment">Oops! No result!</div>            
      `);
    }
    else if(byId.data<1 && byReason.data.length<1 && byDate.data.length<1 && byMatric.length<1){
      $(".appointment_search_result").html(`
        <div class="noappointment">Oops! No result!</div>            
      `);
    }
    else{
      $(".appointment_search_result").append(`
        <table id="appointment_search_result_table" class="viewdrugs_table">
          <thead class="table_heading">
              <tr id="apsr" >
                <th>id</th>
                <th>Patient Id</th>
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
      if(byMatric.data.length>0){
        $("#apsr").append(`
         <th>Actions</th>
         `);
        for(i=0;i<byMatric.data.length;i++){
          if(byMatric.data[i].status.toLowerCase()=="pending"){
            $("#appointment_search_result_tablebody").append(`
            <tr>
              <td>`+byMatric.data[i].id +`</td>
              <td><b>`+byMatric.data[i].matricNo +`</b></td>
              <td>`+byMatric.data[i].reason +`</td>
              <td>`+byMatric.data[i].date +`</td>
              <td>`+byMatric.data[i].time +`</td>
              <td>`+byMatric.data[i].status +`</td>
              <td> <span class="clickable" onclick="appointmentStatus('`+byMatric.data[i].id+`','Approved')">Approve</span>&nbsp;<span class="clickable" onclick="appointmentStatus('`+byMatric.data[i].id+`','Declined')">Decline</span></td>
            </tr>
          `);
          }
          else if(byMatric.data[i].status.toLowerCase()=="approved"){
            $("#appointment_search_result_tablebody").append(`
            <tr>
              <td>`+byMatric.data[i].id +`</td>
              <td><b>`+byMatric.data[i].matricNo +`</b></td>
              <td>`+byMatric.data[i].reason +`</td>
              <td>`+byMatric.data[i].date +`</td>
              <td>`+byMatric.data[i].time +`</td>
              <td>`+byMatric.data[i].status +`</td>
              <td class="clickable" onclick="appointmentStatus('`+byMatric.data[i].id+`','Completed')">Complete</td>
            </tr>
          `);
          }
          else if(byMatric.data[i].status.toLowerCase()=="completed"){
            $("#appointment_search_result_tablebody").append(`
            <tr>
              <td>`+byMatric.data[i].id +`</td>
              <td><b>`+byMatric.data[i].matricNo +`</b></td>
              <td>`+byMatric.data[i].reason +`</td>
              <td>`+byMatric.data[i].date +`</td>
              <td>`+byMatric.data[i].time +`</td>
              <td>`+byMatric.data[i].status +`</td>
              <td> <span class="clickable" onclick="appointmentRecord('`+byMatric.data[i].id+`','`+byMatric.data[i].matricNo+`')">View Record</span> <span class="clickable" onclick="appointmentDrugs('`+byMatric.data[i].id+`','`+byMatric.data[i].matricNo+`')">View Drugs</span></td>
            </tr>
          `);
          }
          else if(byMatric.data[i].status.toLowerCase()=="declined"){
            $("#appointment_search_result_tablebody").append(`
            <tr>
              <td>`+byMatric.data[i].id +`</td>
              <td><b>`+byMatric.data[i].matricNo +`</b></td>
              <td>`+byMatric.data[i].reason +`</td>
              <td>`+byMatric.data[i].date +`</td>
              <td>`+byMatric.data[i].time +`</td>
              <td>`+byMatric.data[i].status +`</td>
              <td>-</td>
            </tr>
          `);
          }
        }
      }
      if(byId.data.id){
        if(byId.data.status.toLowerCase()=="pending"){
          $("#apsr").append(`
            <th>Actions</th>
          `);
          $("#appointment_search_result_tablebody").append(`
          <tr>
            <td><b>`+byId.data.id +`</b></td>
            <td>`+byId.data.matricNo +`</td>
            <td>`+byId.data.reason +`</td>
            <td>`+byId.data.date +`</td>
            <td>`+byId.data.time +`</td>
            <td>`+byId.data.status +`</td>
            <td> <span class="clickable" onclick="appointmentStatus('`+byId.data.id+`','Approved')">Approve</span>&nbsp;<span class="clickable" onclick="appointmentStatus('`+byId.data.id+`','Declined')">Decline</span></td>
          </tr>
        `);
        }
        else if(byId.data.status.toLowerCase()=="approved"){
          $("#apsr").append(`
            <th>Approved By</th>
            <th>Date Approved</th>
            <th>Time Approved</th>
            <th>Actions</th>
          `);
          approvedBy=await getPatient(byId.data.approvedBy);
          $("#appointment_search_result_tablebody").append(`
          <tr>
            <td><b>`+byId.data.id +`</b></td>
            <td>`+byId.data.matricNo +`</td>
            <td>`+byId.data.reason +`</td>
            <td>`+byId.data.date +`</td>
            <td>`+byId.data.time +`</td>
            <td>`+byId.data.status +`</td>
            <td>`+approvedBy.data.lastName+` `+approvedBy.data.firstName+`</td>
            <td>`+byId.data.dateApproved+`</td>
            <td>`+byId.data.timeApproved +`</td>
            <td class="clickable" onclick="appointmentStatus('`+byId.data.id+`','Completed')">Complete</td>
          </tr>
        `);
        }
        else if(byId.data.status.toLowerCase()=="completed"){
          $("#apsr").append(`
            <th>Completed By</th>
            <th>Date Completed</th>
            <th>Time Completed</th>
            <th>Actions</th>
          `);
          completedBy=await getPatient(byId.data.completedBy);
          $("#appointment_search_result_tablebody").append(`
          <tr>
            <td><b>`+byId.data.id +`</b></td>
            <td>`+byId.data.matricNo +`</td>
            <td>`+byId.data.reason +`</td>
            <td>`+byId.data.date +`</td>
            <td>`+byId.data.time +`</td>
            <td>`+byId.data.status +`</td>
            <td>`+completedBy.data.lastName+` `+completedBy.data.firstName+`</td>
            <td>`+byId.data.dateCompleted+`</td>
            <td>`+byId.data.timeCompleted +`</td>
            <td> <span class="clickable" onclick="appointmentRecord('`+byId.data.id+`','`+byId.data.matricNo+`')">View Record</span> <span class="clickable" onclick="appointmentDrugs('`+byId.data.id+`','`+byId.data.matricNo+`')">View Drugs</span></td>
          </tr>
        `);
        }
        else if(byId.data.status.toLowerCase()=="declined"){
          $("#apsr").append(`
            <th>Declined By</th>
            <th>Date Declined</th>
            <th>Time Declined</th>
          `);
          declinedBy=await getPatient(byId.data.declinedBy);
          $("#appointment_search_result_tablebody").append(`
          <tr>
            <td><b>`+byId.data.id +`</b></td>
            <td>`+byId.data.matricNo +`</td>
            <td>`+byId.data.reason +`</td>
            <td>`+byId.data.date +`</td>
            <td>`+byId.data.time +`</td>
            <td>`+byId.data.status +`</td>
            <td>`+declinedBy.data.lastName+` `+declinedBy.data.firstName+`</td>
            <td>`+byId.data.dateDeclined+`</td>
            <td>`+byId.data.timeDeclined +`</td>
          </tr>
        `);
        }
      }

      if(byReason.data.length>0){
        $("#apsr").append(`
         <th>Actions</th>
        `);
        for(i=0;i<byReason.data.length;i++){
          if(byReason.data[i].status.toLowerCase()=="pending"){
            $("#appointment_search_result_tablebody").append(`
            <tr>
              <td>`+byReason.data[i].id +`</td>
              <td>`+byReason.data[i].matricNo +`</td>
              <td><b>`+byReason.data[i].reason +`</b></td>
              <td>`+byReason.data[i].date +`</td>
              <td>`+byReason.data[i].time +`</td>
              <td>`+byReason.data[i].status +`</td>
              <td> <span class="clickable" onclick="appointmentStatus('`+byReason.data[i].id+`','Approved')">Approve</span>&nbsp;<span class="clickable" onclick="appointmentStatus('`+byReason.data[i].id+`','Declined')">Decline</span></td>
            </tr>
          `);
          }
          else if(byReason.data[i].status.toLowerCase()=="approved"){
            $("#appointment_search_result_tablebody").append(`
            <tr>
              <td>`+byReason.data[i].id +`</td>
              <td>`+byReason.data[i].matricNo +`</td>
              <td><b>`+byReason.data[i].reason +`</b></td>
              <td>`+byReason.data[i].date +`</td>
              <td>`+byReason.data[i].time +`</td>
              <td>`+byReason.data[i].status +`</td>
              <td class="clickable" onclick="appointmentStatus('`+byReason.data[i].id+`','Completed')">Complete</td>
            </tr>
          `);
          }
          else if(byReason.data[i].status.toLowerCase()=="completed"){
            $("#appointment_search_result_tablebody").append(`
            <tr>
              <td>`+byReason.data[i].id +`</td>
              <td>`+byReason.data[i].matricNo +`</td>
              <td><b>`+byReason.data[i].reason +`</b></td>
              <td>`+byReason.data[i].date +`</td>
              <td>`+byReason.data[i].time +`</td>
              <td>`+byReason.data[i].status +`</td>
              <td> <span class="clickable" onclick="appointmentRecord('`+byReason.data[i].id+`','`+byReason.data[i].matricNo+`')">View Record</span> <span class="clickable" onclick="appointmentDrugs('`+byReason.data[i].id+`','`+byReason.data[i].matricNo+`')">View Drugs</span></td>
            </tr>
          `);
          }
          else if(byReason.data[i].status.toLowerCase()=="declined"){
            $("#appointment_search_result_tablebody").append(`
            <tr>
              <td>`+byReason.data[i].id +`</td>
              <td>`+byReason.data[i].matricNo +`</td>
              <td><b>`+byReason.data[i].reason +`</b></td>
              <td>`+byReason.data[i].date +`</td>
              <td>`+byReason.data[i].time +`</td>
              <td>`+byReason.data[i].status +`</td>
              <td>-</td>
            </tr>
          `);
          }
        }
      }

      if(byDate.data.length>0){
        $("#apsr").append(`
         <th>Actions</th>
        `);
        for(i=0;i<byDate.data.length;i++){
          if(byDate.data[i].status.toLowerCase()=="pending"){
            $("#appointment_search_result_tablebody").append(`
            <tr>
              <td>`+byDate.data[i].id +`</td>
              <td>`+byDate.data[i].matricNo +`</td>
              <td>`+byDate.data[i].reason +`</td>
              <td><b>`+byDate.data[i].date +`</b></td>
              <td>`+byDate.data[i].time +`</td>
              <td>`+byDate.data[i].status +`</td>
              <td> <span class="clickable" onclick="appointmentStatus('`+byDate.data[i].id+`','Approved')">Approve</span>&nbsp;<span class="clickable" onclick="appointmentStatus('`+byDate.data[i].id+`','Declined')">Decline</span></td>
            </tr>
          `);
          }
          else if(byDate.data[i].status.toLowerCase()=="approved"){
            $("#appointment_search_result_tablebody").append(`
            <tr>
              <td>`+byDate.data[i].id +`</td>
              <td>`+byDate.data[i].matricNo +`</td>
              <td>`+byDate.data[i].reason +`</td>
              <td><b>`+byDate.data[i].date +`</b></td>
              <td>`+byDate.data[i].time +`</td>
              <td>`+byDate.data[i].status +`</td>
              <td class="clickable" onclick="appointmentStatus('`+byDate.data[i].id+`','Completed')">Complete</td>
            </tr>
          `);
          }
          else if(byDate.data[i].status.toLowerCase()=="completed"){
            $("#appointment_search_result_tablebody").append(`
            <tr>
              <td>`+byDate.data[i].id +`</td>
              <td>`+byDate.data[i].matricNo +`</td>
              <td>`+byDate.data[i].reason +`</td>
              <td><b>`+byDate.data[i].date +`</b></td>
              <td>`+byDate.data[i].time +`</td>
              <td>`+byDate.data[i].status +`</td>
              <td> <span class="clickable" onclick="appointmentRecord('`+byDate.data[i].id+`','`+byDate.data[i].matricNo+`')">View Record</span> <span class="clickable" onclick="appointmentDrugs('`+byDate.data[i].id+`','`+byDate.data[i].matricNo+`')">View Drugs</span></td>
            </tr>
          `);
          }
          else if(byDate.data[i].status.toLowerCase()=="declined"){
            $("#appointment_search_result_tablebody").append(`
            <tr>
              <td>`+byDate.data[i].id +`</td>
              <td>`+byDate.data[i].matricNo +`</td>
              <td>`+byDate.data[i].reason +`</td>
              <td><b>`+byDate.data[i].date +`</b></td>
              <td>`+byDate.data[i].time +`</td>
              <td>`+byDate.data[i].status +`</td>
              <td>-</td>
            </tr>
          `);
          }
        }
      }
    }
  }
  
async function appointmentRecord(id,pid){
  $(".modal-dialog").addClass("modal-xl");  
  $(window).scrollTop(0);
  $(".modal-header").html(`<h2>Appointment Record</h2>`);

  $(".modal-body").html(`
    <div>
      <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
    </div>
  `);
  document.getElementById("showModal").click();

  data=await getPatientRecordByAppointment(id);

  $(data).ready(function(){
    $(".spinner-border").fadeOut(function(){
      if(data.error==false){
        $(".modal-body").html(`
         
          <div class="viewrecords_tab box_shadow">   
            <button class="viewrecords_tablinks active" id="view_record" onclick="openRecordTab(event, 'ViewRecords')">&nbsp;View Records&nbsp;</button>
            <button class="viewrecords_tablinks" onclick="openRecordTab(event, 'AddRecords')">Add Record</button>
          </div>

          <div id="ViewRecords" class="viewrecords_tabcontent box_shadow scroll_div" style="display:block;">
           <div class="subloader"></div>
          </div>
          
          <div id="AddRecords" class="viewrecords_tabcontent box_shadow scroll_div">
 
            <div class="successful force box_shadow"></div>  
       
            <form autocomplete="on" id="add_record_form" method="post">
        
           <label class="set_appointment_label" for="patientId">Patient Id:</label><br/>
           <input style="text-transform:capitalize" type="text" maxlength=7 class="set_appointment_input" name="patientId" id="recordUserId_input" placeholder="MatricNo/Staff No of patient" value="`+pid+`" disabled required><br/><br/>
 
           <label class="set_appointment_label" for="diagnosis">Diagnosis</label><br/>
           <input type="text" class="set_appointment_input" name="diagnosis" id="recorddiagnosis_input" placeholder="Diagnosis" required><br/><br/>
         
           
           <label class="set_appointment_label" for="notes">Notes:</label><br/>
           <textarea class="set_appointment_input" id="recordnotes_input" name="notes" placeholder="Notes" required></textarea><br/><br/>
 
           <input class="set_appointment_submit" type="submit" value="Add Record"/>
         </form>
       </div>
        `);
        $(".modal-footer").html(`
          <button type="button" class="btn btn-block btn-danger" data-dismiss="modal">Close</button>
       `);
       if(sessionStorage.getItem("darkmode")=="on"){
        $(".force").css({
         "background-color":"rgb(53, 54, 58)",
         "color":"white"
         });
        }
        loadRecord(data,pid);
        $("#add_record_form").submit(function(e){
          e.preventDefault();
          diagnosis=$("#recorddiagnosis_input").val();
          notes=$("#recordnotes_input").val()
          addRecords(id,pid,diagnosis,notes);
        });
      }
      else{
        $(".modal-dialog").removeClass("modal-xl");  
        $(".modal-body").html(`
          <p>
            `+data.message+`
          </p>
        `);
        $(".modal-footer").html(`
          <button type="button" class="btn btn-block btn-danger" data-dismiss="modal">Close</button>
        `);
      }
    });
  });
}


async function loadRecord(data,pid){
  if(data.data.length<1){
    $("#subloader").fadeOut(function(){
      $("#ViewRecords").html(`
        <div class="noappointment">No Records Exists!</div>    
    `);
    });
  }
  else{
    $("#subloader").fadeOut( async function(){
      $("#ViewRecords").html(`
        <h1 style="text-transform:uppercase;margin-top:-10px;margin-left:-160px;">`+pid+`</h1>
        <table style="margin-top:-15px;" id="acd_table" class="viewdata_table">
          <thead class="table_heading">
            <tr>
              <th>Record Id</th>
              <th>Diagnosis</th>
              <th>Recorded By</th>
              <th>Notes</th>
              <th>Date</th>
              <th>Time</th>
            <tr>
          <thead>
          <tbody id="apr_tablebody" class="table_body">
            
          </tbody>
        </table>    
      `);
      $("#apr_tablebody").html(`<div id="subloader" style="margin-top:10px;"></div>`);
      $("#subloader").fadeOut(async function(){
      for(i=0;i<data.data.length;i++){
        var creator=await getPatient(data.data[i].creatorId);
          $("#apr_tablebody").append(`
            <tr>
                <td style="text-transform:uppercase;">`+data.data[i].id +`</td>
                <td>`+data.data[i].diagnosis +`</td>
                <td>`+creator.data.lastName+` `+creator.data.firstName+`</td>
                <td>`+data.data[i].notes +`</td>
                <td>`+data.data[i].dateCreated +`</td>
                <td>`+data.data[i].timeCreated +`</td>
            </tr>
        `);
      }
    });
    });
  }
}

async function addRecords(id,pid,diagnosis,notes){
  $(".successful").html(`
    <div class="ss" id="subloader"></div>
  `);

  data = await addPatientRecord(id,pid,notes,diagnosis);

  $(".successful").show();
  if(data.error==true){
    $("#subloader").fadeOut(function(){
      $(".successful").css({"color":"red"});
      $(".successful").html(`
        An Error Occured!<br/>
        <button class="btn btn-block btn-danger cclosee">Close</button>  
      `);
      $(".cclosee").click(function(){
        $(".successful").hide();
        document.getElementById("view_record").click();
      });
    });
  }
  else{
    $("#subloader").fadeOut(async function(){
      $(".successful").css({"color":"green"});
      $(".successful").html(`
        Successful!
        <button class="btn btn-block btn-success cclosee">Continue</button>
      `);
      $(".cclosee").click(function(){
        $(".successful").hide();
        document.getElementById("view_record").click();
      });

      data=await getPatientRecordByAppointment(id);

      $(data).ready(function(){
        loadRecord(data,pid);
      });
  
    });
  }
  $("#recorddiagnosis_input").val("");
  $("#recordnotes_input").val("")
}


async function appointmentDrugs(id,pid){
  $(".modal-dialog").addClass("modal-xl");  
  $(window).scrollTop(0);
  $(".modal-header").html(`<h2>Appointment Drug</h2>`);

  $(".modal-body").html(`
    <div>
      <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
    </div>
  `);
  document.getElementById("showModal").click();

  data=await getPatientDrug(id);

  $(data).ready(function(){
    $(".spinner-border").fadeOut(async function(){
      if(data.error==false){
        $(".modal-body").html(`
        <div class="viewrecords_tab box_shadow">
        <button class="viewrecords_tablinks active" id="view_drug" onclick="openRecordTab(event, 'ViewDrugs')">&nbsp;View Drugs&nbsp;</button>
         <button class="viewrecords_tablinks" onclick="openRecordTab(event, 'AddDrugs')">Add Drug</button>
       </div>
       <div id="ViewDrugs" class="viewrecords_tabcontent box_shadow scroll_div" style="display:block;">
           <div class="subloader"></div>
       </div>
       <div id="AddDrugs" class="viewrecords_tabcontent box_shadow scroll_div">
 
         <div class="successful force box_shadow"></div>  
       
         <form autocomplete="on" id="add_drug_form" method="post">
 
           <label class="set_appointment_label" for="patientdrug">Drug Name:</label><br/>
           <select style="text-transform:capitalize" type="text" class="set_appointment_input" name="drugId" id="drug_input" placeholder="Select a Drug" required>
           
           </select><br/><br/>  
           
           <label class="set_appointment_label" for="notes">Instructions:</label><br/>
           <textarea class="set_appointment_input" id="instructions_input" name="notes" placeholder="Instructions on drug usage" required></textarea><br/><br/>
 
           <input class="set_appointment_submit" type="submit" value="Add Drug"/>
         </form>
       </div>
        `);
        $(".modal-footer").html(`
          <button type="button" class="btn btn-block btn-danger" data-dismiss="modal">Close</button>
        `);
        drugoptionlen=await getInventoryByType(1,1,"drug");
        drugoption=await getInventoryByType(1,drugoptionlen.length,"drug");

        if(drugoption.error==false){
          if(drugoption.length>0){
            for(j=0;j<drugoption.data.length;j++){
              $("#drug_input").append(`
                <option value="`+drugoption.data[j].id+`">`+drugoption.data[j].name+`</option>
              `);
            }
          }
        }

        if(sessionStorage.getItem("darkmode")=="on"){
          $(".force").css({
           "background-color":"rgb(53, 54, 58)",
           "color":"white"
           });
        }

        loadDrugs(data,pid);

        $("#add_drug_form").submit(function(e){
          e.preventDefault();
          drug=$("#drug_input").val();
          instructions=$("#instructions_input").val()
          addDrugs(id,drug,pid,instructions);
        });

      } 
      else{
        $(".modal-dialog").removeClass("modal-xl");  
        $(".modal-body").html(`
          <p>
            `+data.message+`
          </p>
        `);
        $(".modal-footer").html(`
          <button type="button" class="btn btn-block btn-danger" data-dismiss="modal">Close</button>
        `);
      }   
    });
  });
}

async function loadDrugs(data,pid){
  if(data.data.length<1){
    $("#subloader").fadeOut(function(){
      $("#ViewDrugs").html(`
        <div class="noappointment">No Drugs Exists!</div>    
    `);
    });
  }
  else{
    $("#subloader").fadeOut( async function(){
      $("#ViewDrugs").html(`
        <h1 style="text-transform:uppercase;margin-top:-10px;margin-left:-160px;">`+pid+`</h1>
        <table style="margin-top:-15px;" id="acd_table" class="viewdata_table">
          <thead class="table_heading">
            <tr>
              <th>Drug Id</th>
              <th>Drug Name</th>
              <th>Instructions</th>
              <th>Status</th>
            <tr>
          <thead>
          <tbody id="apr_tablebody" class="table_body">
            
          </tbody>
        </table>    
      `);
      $("#apr_tablebody").html(`<div id="subloader" style="margin-top:10px;"></div>`);
      $("#subloader").fadeOut(async function(){
      for(i=0;i<data.data.length;i++){
        drugname=await getDrugDetails(data.data[i].drugId);
          $("#apr_tablebody").append(`
            <tr>
                <td>`+data.data[i].drugId +`</td>
                <td style="text-transform:capitalize;">`+drugname.data.name +`</td>
                <td>`+data.data[i].instructions +`</td>              
                <td>`+data.data[i].status +`</td>s
            </tr>
        `);
      }
    });
    });
  }
}

async function addDrugs(id,did,pid,instructions){
  $(".successful").html(`<div class="ss" id="subloader"></div>`);

  data = await addPatientDrug(id,did,pid,instructions);

  $(".successful").show();
  if(data.error==true){
    $(".ss").fadeOut(function(){
      $(".successful").css({"color":"red"});
      $(".successful").html(`
        An Error Occured!
        <button class="btn btn-block btn-danger cclosee">Close</button>
      `);
      $(".cclosee").click(function(){
        $(".successful").hide();
        document.getElementById("view_drug").click();
      });
    });
  }
  else{
    $(".ss").fadeOut(async function(){
      
      $(".successful").css({"color":"green"});
      $(".successful").html(`
        Successful!
        <button class="btn btn-block btn-success cclosee">Continue</button>
      `);
      $(".cclosee").click(function(){
        $(".successful").hide();
        document.getElementById("view_drug").click();
      });

      data=await getPatientDrug(id);

      $(data).ready(function(){
        loadDrugs(data,pid);
      });
    });
  }
  $("#recorddiagnosis_input").val("");
  $("#recordnotes_input").val("")
}



async function appointmentStatus(id,status){

  $(".modal-dialog").removeClass("modal-xl");  
  $(window).scrollTop(0);
  $(".modal-header").html(`<h2>Appointment Status</h2>`);

  $(".modal-body").html(`
    <div>
      <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
    </div>
  `);
  document.getElementById("showModal").click();

  data= await setAppointmentStatus(id,status.toLowerCase());

  $(data).ready(function(){
    $(".spinner-border").fadeOut(function(){
      if(data.error==true){
        $(".modal-body").html(`
          <p class="message_text">
           `+data["message"]+`
          </p>
        `);
        $(".modal-footer").html(`
          <button type="button" class="btn btn-block btn-danger" data-dismiss="modal">Close</button>
        `);
      }
      else{
        $(".modal-body").html(`
        <h2 class="text-successful">
          Successful!!
        </h2>
       `);
       $(".modal-footer").html(`
         <button type="button" class="btn btn-block btn-success closee" data-dismiss="modal">Close</button>
        `);
        $(".closee").click(function(){
          loadTodayAppointments();
          loadUpcomingAppointments(1,7);
          loadStatus();
          document.getElementById("appointment_search").click(); 
        });
      }    
    });
  }); 
}

  async function submitAppointment(){

    $(".modal-dialog").removeClass("modal-xl");  
    $(window).scrollTop(0);
    $(".modal-header").html(`<h2>Appointment Status</h2>`);
  
    $(".modal-body").html(`
      <div>
        <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
      </div>
    `);
    document.getElementById("showModal").click();

    var id=$("#id_input").val();
    var reason=$("#reason_input").val();
    var date=$("#date_input").val();
    var time=changeTime($("#time_input").val());
  
    var res= await setAppointment(id,reason,date,time);

    $(res).ready(function(){
      $(".spinner-border").fadeOut(function(){
        if(res.error==true){
          $(".modal-body").html(`
            <p>
              Couldnt Set Appointment! Contact your admin
            </p>
          `);
          $(".modal-footer").html(`
            <button type="button" class="btn btn-block btn-danger" data-dismiss="modal">Close</button>
          `);
        }
        else{
          $(".modal-body").html(`
          <h2 class="text-successful">
            Appointment has been set!
          </h2>
         `);
         $(".modal-footer").html(`
           <button type="button" class="btn btn-block btn-success" data-dismiss="modal">Close</button>
          `);
        }    
      });
    });
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
  