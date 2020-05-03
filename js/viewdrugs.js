$(document).ready(async function(){

    loadAllDrugs();
    loadCompletedDrugs();
    loadUnCompletedDrugs();
});


function getPatientDrugByStatus(status){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password"),
      status:status
    };
    return new Promise(resolve => {
      $.get("../API/getPatientDrugByStatus",param, function(data, status){
        resolve(data);
      });
    });
}

function getPatientDrugUser(){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password"),
    };
    return new Promise(resolve => {
      $.get("../API/getPatientDrugUser",param, function(data, status){
        resolve(data);
      });
    });
}

function completeDrugApi(id){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password"),
      id:id,
      status:"Completed"
    };
    return new Promise(resolve => {
      $.get("../API/updatePatientDrugUser",param, function(data, status){
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



async function loadCompletedDrugs(){
    var completed_drugs= await getPatientDrugByStatus("Completed");
    if(completed_drugs.error==false){
        if(completed_drugs.data.length<1){
            $("#CompletedDrugs").html(`
                <div class="nodrugs">You have no Completed Drugs!</div>            
            `);
        }
        else{
            $("#CompletedDrugs").html(`
                <table id="completeddrugs_table" class="table-md table-bordered">
                    <thead class="table_heading">
                        <tr>
                          <th>id</th>
                          <th>Drug Id</th>
                          <th>Appointment Id</th>
                          <th>Instructions</th>
                          <th>Status</th>
                          <th>Date Completed</th>
                        <tr>
                    <thead>
                    <tbody id="completeddrugs_tablebody" class="table_body">
                    
                    </tbody>
                </table>
            `);
            for(i=0;i<completed_drugs.data.length;i++){
                $("#completeddrugs_tablebody").append(`
                    <tr>
                        <td>`+completed_drugs.data[i].id +`</td>
                        <td class="clickable" onclick="drugDetails('`+completed_drugs.data[i].drugId+`')">`+completed_drugs.data[i].drugId +`</td>
                        <td class="clickable" onclick="appointmentDetails('`+completed_drugs.data[i].appointmentId+`')">`+completed_drugs.data[i].appointmentId +`</td>   
                        <td>`+completed_drugs.data[i].instructions +`</td>
                        <td>`+completed_drugs.data[i].status +`</td>
                        <td>`+completed_drugs.data[i].dateCompleted +`</td>
                    </tr>
                `);
            }
        }
    }
    else{
        $("#CompletedDrugs").html(`<span class="warning">Oops! An error Occured! Try logging out and logging in!</span>`);
    }
}

async function loadUnCompletedDrugs(){
    var uncompleted_drugs= await getPatientDrugByStatus("Not Completed");
    if(uncompleted_drugs.error==false){
        if(uncompleted_drugs.data.length<1){
            $("#NotCompletedDrugs").html(`
                <div class="nodrugs">You have no Uncompleted Drugs!</div>            
            `);
        }
        else{
            $("#NotCompletedDrugs").html(`
                <table id="uncompleteddrugs_table" class="table-md table-bordered">
                    <thead class="table_heading">
                        <tr>
                          <th>id</th>
                          <th>Drug Id</th>
                          <th>Appointment Id</th>
                          <th>Instructions</th>
                          <th>Status</th>
                          <th>Action</th>
                        <tr>
                    <thead>
                    <tbody id="uncompleteddrugs_tablebody" class="table_body">
                    
                    </tbody>
                </table>
            `);
            for(i=0;i<uncompleted_drugs.data.length;i++){
                $("#uncompleteddrugs_tablebody").append(`
                    <tr>
                        <td>`+uncompleted_drugs.data[i].id +`</td>
                        <td class="clickable" onclick="drugDetails('`+uncompleted_drugs.data[i].drugId+`')">`+uncompleted_drugs.data[i].drugId +`</td>
                        <td class="clickable" onclick="appointmentDetails('`+uncompleted_drugs.data[i].appointmentId+`')">`+uncompleted_drugs.data[i].appointmentId +`</td>   
                        <td>`+uncompleted_drugs.data[i].instructions +`</td>
                        <td>`+uncompleted_drugs.data[i].status +`</td>
                        <td class="clickable" onclick="completeDrugs('`+uncompleted_drugs.data[i].id+`')">Complete Drugs</td>
                    </tr>
                `);
            }
        }
    }
    else{
        $("#NotCompletedDrugs").html(`<span class="warning">Oops! An error Occured! Try logging out and logging in!</span>`);
    }
}

async function loadAllDrugs(){
    var all_drugs= await getPatientDrugUser();
    if(all_drugs.error==false){
        if(all_drugs.data.length<1){
            $("#AllDrugs").html(`
                <div class="nodrugs">You have no Drugs!</div>            
            `);
        }
        else{
            $("#AllDrugs").html(`
                <table id="alldrugs_table" class="table-md table-bordered ">
                    <thead class="table_heading">
                        <tr>
                          <th>Id</th>
                          <th>Drug Id</th>
                          <th>Appointment Id</th>
                          <th>Instructions</th>
                          <th>Status</th>
                          <th>Date Completed</th>
                          <th>Action</th>
                        <tr>
                    <thead>
                    <tbody id="alldrugs_tablebody" class="table_body">
                    
                    </tbody>
                </table>
            `);
            for(i=0;i<all_drugs.data.length;i++){
                if(all_drugs.data[i].status=="Completed"){
                    $("#alldrugs_tablebody").append(`
                    <tr>
                        <td>`+all_drugs.data[i].id +`</td>
                        <td class="clickable" onclick="drugDetails('`+all_drugs.data[i].drugId+`')">`+all_drugs.data[i].drugId +`</td>
                        <td class="clickable" onclick="appointmentDetails('`+all_drugs.data[i].appointmentId+`')">`+all_drugs.data[i].appointmentId +`</td>   
                        <td>`+all_drugs.data[i].instructions +`</td>
                        <td>`+all_drugs.data[i].status +`</td>
                        <td>`+all_drugs.data[i].dateCompleted +`</td>
                        <td class="table-danger">-</td>
                    </tr>
                    `);
                }
                else{
                    $("#alldrugs_tablebody").append(`
                    <tr>
                        <td>`+all_drugs.data[i].id +`</td>
                        <td class="clickable" onclick="drugDetails('`+all_drugs.data[i].drugId+`')">`+all_drugs.data[i].drugId +`</td>
                        <td class="clickable" onclick="appointmentDetails('`+all_drugs.data[i].appointmentId+`')">`+all_drugs.data[i].appointmentId +`</td>   
                        <td>`+all_drugs.data[i].instructions +`</td>
                        <td>`+all_drugs.data[i].status +`</td>
                        <td class="table-danger">-</td>
                        <td class="clickable" onclick="completeDrugs('`+all_drugs.data[i].id+`')">Complete Drugs</td>
                    </tr>
                `);
                }                
            }
        }
    }
    else{
        $("#AllDrugs").html(`<span class="warning">Oops! An error Occured! Try logging out and logging in!</span>`);
    }
}





async function drugDetails(drugId){
    $(window).scrollTop(0);
    $(".modal-header").html(`<h2>Drug Details</h2>`);

    $(".modal-body").html(`
      <div>
        <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
      </div>
    `);
    document.getElementById("showModal").click();

    var drug_data=await getDrugDetails(drugId);

    $(".spinner-border").fadeOut(function(){
        $(".modal-body").html(`
            <div class="container">
                <span class="drug_data_label">Id: </span>`+drug_data.data.id+`<br/>
                <span class="drug_data_label">Name: </span>`+drug_data.data.name+`<br/>
                <div class="container-fluid px-0"><span class="drug_data_label">Function: </span>`+drug_data.data.function+`</div><br/>
            </div>
        `);
    });
    $(".modal-footer").html(`
        <button type="button" class="btn btn-block btn-danger" data-dismiss="modal">Close</button>
    `);
}

async function appointmentDetails(appointmentId){
    $(window).scrollTop(0);
    $(".modal-header").html(`<h2>Appointment Details</h2>`);

    $(".modal-body").html(`
      <div>
        <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
      </div>
    `);
    document.getElementById("showModal").click();

    var appointment_data=await getAppointmentById(appointmentId) ;
    
    $(".spinner-border").fadeOut(function(){
        $(".modal-body").html(`
            <div class="container">
                <span class="drug_data_label">Id: </span>`+appointment_data.data.id+`<br/>
                <span class="drug_data_label">Date: </span>`+appointment_data.data.date+`<br/>
                <span class="drug_data_label">Time: </span>`+appointment_data.data.time+`<br/>
                <span class="drug_data_label">Status: </span>`+appointment_data.data.status+`<br/>
                <div class="container-fluid px-0"><span class="drug_data_label">Reason: </span>`+appointment_data.data.reason+`</div><br/>
            </div>
        `);
    });
    $(".modal-footer").html(`
        <button type="button" class="btn btn-block btn-danger" data-dismiss="modal">Close</button>
    `);
}

async function completeDrugs(id){
    $(window).scrollTop(0);
    $(".modal-header").html(`<h2>Complete Drugs</h2>`);

    $(".modal-body").html(`
      <div>
        <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
      </div>
    `);
    document.getElementById("showModal").click();

    $(".spinner-border").fadeOut(function(){
        $(".modal-body").html(`
            <div class="container">
                Are you sure you have completed this drug?
            </div>
        `);
    });
    $(".modal-footer").html(`
        <button type="button" class="btn btn-success message-continue" data-dismiss="modal">Yes i am</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal">Maybe Not</button>
    `);
    $(".message-continue").click(async function(){
        var result= await completeDrugApi(id);
        if(result.error==false){
            loadAllDrugs();
            loadCompletedDrugs();
            loadUnCompletedDrugs();
        }
    });
}


function openDrugTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("viewdrugs_tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("viewdrugs_tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }