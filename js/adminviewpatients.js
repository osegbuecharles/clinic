$(document).ready(function(){
    loadAllPatients(4);

    $("#patient_search_form").submit(function(e){
      e.preventDefault();
      $(".patient_search_result").html(`<div id="subloader"></div>`);
      searchPatient();
    });
});

function getPatient(id){
  param={
    matricNo:sessionStorage.getItem("username"),
    password:sessionStorage.getItem("password"),
    patientId:id
  };
  return new Promise(resolve => {
    $.get("../API/getPatient",param, function(data, status){
      resolve(data);
    });
  });
}

function getPatients(pageNum,pageSize){
  param={
    matricNo:sessionStorage.getItem("username"),
    password:sessionStorage.getItem("password"),
    pageNum:pageNum,
    pageSize:pageSize
  };
  return new Promise(resolve => {
    $.get("../API/getPatients",param, function(data, status){
      resolve(data);
    });
  });
}

function getPatientRecord(id){
  param={
    matricNo:sessionStorage.getItem("username"),
    password:sessionStorage.getItem("password"),
    patientId:id
  };
  return new Promise(resolve => {
    $.get("../API/getPatientRecord",param, function(data, status){
      resolve(data);
    });
  });
}

function adddPatientRecord(id,notes,diagnosis){
  param={
    matricNo:sessionStorage.getItem("username"),
    password:sessionStorage.getItem("password"),
    appointmentId:null,
    patientId:id,
    notes:notes,
    diagnosis:diagnosis
  };
  return new Promise(resolve => {
    $.get("../API/addPatientRecord",param, function(data, status){
      resolve(data);
    });
  });
}



async function loadAllPatients(p){
   pageSize=p;
  var paginate=1;
  $("#AllPatients").html(`
    <table id="allPatientsTable" class="table-md table-bordered">
      <thead class="table_heading">
        <tr>
          <th>Picture</th>
          <th>Patient Id</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Date of Birth</th>
          <th>Address</th>
          <th>Last Seen</th>
          <th>Action</th>
          </tr>
        </thead>
        <tbody id="viewuserbody" class="table_body force">
        
        </tbody>
    </table>
    <div id="subloader" style="margin-left:25%;margin-top:10px;"></div>
    <div class="pagination"></div>
  `);

  var l= await getPatients(1,1);
  if(l.length>pageSize){
    $(".pagination").append(`<a id="prev">&laquo;</a>`);
    last=Math.ceil(l.length/pageSize)
    for(i=1;i<=last;i++){
      $(".pagination").append(`<a id="paginate`+i+`"class="paginate">`+i+`</a>`);
    }
    $(".pagination").append(`<a id="next">&raquo;</a>`);
  }
  

 $(".paginate").click(function(){
  $(".paginate").removeClass("active");
  $(this).addClass(" active");
  var index=$('.paginate').index(this);
  paginate=index+1;
  loadUser(paginate,pageSize);
 });


 $("#prev").click(function(){
   if(paginate<=1){
     paginate=last;
      page=document.getElementById("paginate"+paginate);
      page.click();
    }
    else{
      paginate-=1;
      page=document.getElementById("paginate"+paginate);
      page.click();
    }
  });

  $("#next").click(function(){
    if(paginate>=last){
      paginate=1;
      page=document.getElementById("paginate"+paginate);
      page.click();
    }
    else{
     paginate+=1;
     page=document.getElementById("paginate"+paginate);
     page.click();
   }
  });

  loadUser(1,pageSize);
  $(".paginate:first").addClass(" active");
}

async function loadUser(pageNum,pageSize){
  $("#viewuserbody").html("");
  $("#viewuserbody").css({"display":"none"});
  $("#subloader").show();
  var data= await getPatients(pageNum, pageSize);
  if(data.error==false){
      if(data["data"].length>0){
        for(i=0;i<data["data"].length;i++){
          if(data.data[i].dp!=null){
            dp=data.data[i].dp;
          }
          else{
            dp="../assets/profile.png"
          }
          $("#viewuserbody").append(`
          <tr id="allpatientcontent" class=content>
            <td class="clickable" onclick="viewdp('`+dp+`')"><img  style="background-color:rgb(31, 138, 210)" src="`+dp+`" class="apimg"/></td>
            <td  style="text-transform:uppercase;" >`+data.data[i].id+`</td>
            <td>`+data.data[i].lastName+` `+data.data[i].firstName+`</td>
            <td>`+data.data[i].gender+`</td>
            <td>`+data.data[i].email+`</td>
            <td>`+data.data[i].phone+`</td>
            <td>`+data.data[i].dob+`</td>
            <td>`+data.data[i].address+`</td>
            <td>`+data.data[i].lastSeen+`</td>
            <td class="clickable" onclick="viewpatient('`+data.data[i].id+`')">View Record</td>
          </tr>
        `);  
        }
      }
      else{
        $("#AllPatients").html(`<div class="noappointment">Oops!.. No Users Exist!</div>`);
      }
  }
  $("#viewuserbody").ready(function(){
    $("#subloader").fadeOut(function(){
      $("#viewuserbody").fadeIn();
    });
  });    
}

async function searchPatient(){
  id=$("#patient_search_value").val()
  data= await getPatient(id);
  $("#subloader").fadeOut();
  if(data.error==false){
      if(data.data.length<1){
          $(".patient_search_result").html(`
              <div class="noappointment">This Patient does not exist!</div>            
          `);
      }
      else{
          $(".patient_search_result").html(`
              <table id="sp_table" class="table-md table-bordered">
                  <thead class="table_heading">
                      <tr>
                        <th>Picture</th>
                        <th>Patient Id</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Date of Birth</th>
                        <th>Address</th>
                        <th>Last Seen</th>
                        <th>Action</th>
                      <tr>
                  <thead>
                  <tbody id="sp_tablebody" class="table_body">

                  </tbody>
              </table>
          `);
          if(data.data.dp!=null){
            dp=data.data.dp;
          }
          else{
            dp="../assets/profile.png"
          }
          $("#sp_tablebody").append(`
            <tr id="searchpatientcontent" class=content>
             <td class="clickable" onclick="viewdp('`+dp+`')"><img  style="background-color:rgb(31, 138, 210)" src="`+dp+`" class="apimg"/></td>
             <td  style="text-transform:uppercase;" ><b>`+data.data.id+`</b></td>
             <td>`+data.data.lastName+` `+data.data.firstName+`</td>
              <td>`+data.data.gender+`</td>
              <td>`+data.data.email+`</td>
              <td>`+data.data.phone+`</td>
              <td>`+data.data.dob+`</td>
              <td>`+data.data.address+`</td>
              <td>`+data.data.lastSeen+`</td>
              <td class="clickable" onclick="viewpatient('`+data.data.id+`')">View Record</td>
            </tr>
        `);  
      }
  }
  else{
      $(".patient_search_result").html(`<div class="noappointment">This Patient does not exist!</div>`);
  }
}

function viewdp(dp){
  $(".modal-dialog").removeClass("modal-xl");  
  $(window).scrollTop(0);
  $(".modal-header").html(`<h2>Profile Picture</h2>`);

  $(".modal-body").html(`
    <div>
      <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
    </div>
  `);
  document.getElementById("showModal").click();

  $(".spinner-border").fadeOut(function(){
    $(".modal-body").html(`
      <div class="container-fluid">
        <img src="`+dp+`" class="img-fluid rounded"/>
      </div>
    `);
  });
  $(".modal-footer").html(`
    <button type="button" class="btn btn-block btn-danger" data-dismiss="modal">Close</button>
  `);

}

async function viewpatient(id){
  $(window).scrollTop(0);
  $(".modal-header").html(`<h2>Patient Record</h2>`);

  $(".modal-body").html(`
    <div>
      <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
    </div>
  `);

  document.getElementById("showModal").click();

  data=await getPatientRecord(id);


  if(data.error==false){
    $(".modal-dialog").addClass("modal-xl");
    $(".spinner-border").fadeOut(function(){
      $(".modal-body").html(`
      <div class="viewrecords_tab box_shadow">
       <button class="viewrecords_tablinks active" id="view_recordnull" onclick="openRecordTab(event, 'ViewRecords')">&nbsp;View Records&nbsp;</button>
        <button class="viewrecords_tablinks" onclick="openRecordTab(event, 'AddRecords')">Add Record</button>
      </div>
      <div id="ViewRecords" class="viewrecords_tabcontent box_shadow scroll_div" style="display:block;">
          <div class="subloader"></div>
      </div>
      <div id="AddRecords" class="viewrecords_tabcontent box_shadow scroll_div">

        <div class="successful force box_shadow"></div>  
      
        <form autocomplete="on" id="add_record_form" method="post">

          <label class="set_appointment_label" for="patientId">Patient Id:</label><br/>
          <input style="text-transform:capitalize" type="text" maxlength=7 class="set_appointment_input" name="patientId" id="recordUserId_input" placeholder="MatricNo/Staff No of patient" value="`+id+`" disabled required><br/><br/>

          <label class="set_appointment_label" for="diagnosis">Diagnosis</label><br/>
          <input type="text" class="set_appointment_input" name="diagnosis" id="recorddiagnosis_input" placeholder="Diagnosis" required><br/><br/>
        
          
          <label class="set_appointment_label" for="notes">Notes:</label><br/>
          <textarea class="set_appointment_input" id="recordnotes_input" name="notes" placeholder="Notes" required></textarea><br/><br/>

          <input class="set_appointment_submit" type="submit" value="Add Record"/>
        </form>
      </div>
    `);
    if(sessionStorage.getItem("darkmode")=="on"){
     $(".force").css({
      "background-color":"rgb(53, 54, 58)",
      "color":"white"
      });
    }
  $(".modal-footer").html(`
    <button type="button" class="btn btn-block btn-danger closee" data-dismiss="modal">Close</button>
  `);
  $(".closee").click(function(){
    $(".modal-dialog").removeClass("modal-xl");  
  });

    loadRecords(data);

    $("#add_record_form").submit(function(e){
      e.preventDefault();
      diagnosis=$("#recorddiagnosis_input").val();
      notes=$("#recordnotes_input").val()
      addRecord(id,diagnosis,notes);
    });
  });
  }
  else{
    $(".spinner-border").fadeOut(function(){
      $(".modal-body").html(`
        <p class="message_text">
          `+data.message+`
        </p>
    `);
    });
    $(".modal-footer").html(`
      <button type="button" class="btn btn-block btn-danger closee" data-dismiss="modal">Close</button> 
    `);
  }
}

async function loadRecords(data){
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
        <h1 style="text-transform:uppercase;margin-top:-10px;margin-left:-160px;">`+data.data[1].patientId+`</h1>
        <table id="acd_table" class="table-md ml-3 mb-3 table-bordered">
          <thead class="table_heading">
            <tr>
              <th>Record Id</th>
              <th>Appointment Id</th>
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
        if(data.data[i].appointmentId=="0"){
          appointmentId="None";
        }
        else{
          appointmentId=data.data[i].appointmentId;
        }
        var creator=await getPatient(data.data[i].creatorId);
          $("#apr_tablebody").append(`
            <tr>
                <td style="text-transform:uppercase;">`+data.data[i].id +`</td>
                <td>`+ appointmentId +`</td>
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

async function addRecord(id,diagnosis,notes){
  $(".successful").html(`<div class="ss" id="subloader"></div>`);
  var datta =await adddPatientRecord(id,notes,diagnosis);
  
  $(".successful").show();

  if(datta.error==true){
    $(".ss").fadeOut(function(){
      $(".successful").css({"color":"red"});
      $(".successful").html(`
      An Error Occured!
      <button class="btn btn-block btn-danger cclosee">Close</button>
      `);
      $(".cclosee").click(function(){
        $(".successful").hide();
        document.getElementById("view_recordnull").click();
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
      document.getElementById("view_recordnull").click();
    });
    data=await getPatientRecord(id);

    $(data).ready(function(){
      loadRecords(data);
    });
    });
  }
  $("#recorddiagnosis_input").val("");
  $("#recordnotes_input").val("")
}

function closeSuccess(id){
  $(".successful").hide(function(){
    setTimeout(viewpatient(id),3000);
  });
}


function openPatientTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("viewpatients_tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("viewpatients_tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }



  function openRecordTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("viewrecords_tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("viewrecords_tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }