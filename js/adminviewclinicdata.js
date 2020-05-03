$("document").ready(function(){
    

    loadClinicData();

    $(".unit").click(function(){
        var val=$("#height_unit").val();
        if(val=="cm"){
            $(".fi").hide(function(){
                $("#height_input_cm").show();
                $(".fi").val("");
            });
        }
        else{
            $("#height_input_cm").hide(function(){
                $(".fi").show();
                $("#height_input_cm").val("");
            });
        }
    });

    $(".bm").focus(function(){
            $(".bm").keyup(async function(){
             loadbmi();
            });
            $('.bm').on('keydown', async function() {
                var key = event.keyCode || event.charCode;
                if( key == 8 || key == 46 ){
                    loadbmi();
                }
            });
    });

    $("#set_clinicdata_form").submit(function(e){
        e.preventDefault();
        setClinic();
    });

    $("#clinicdata_search_form").submit(function(e){
        e.preventDefault();
        $(".clinic_search_result").html(`<div id="subloader"></div>`);
        searchClinic();
    });

});




function setClinicData(id,bloodgroup,genotype,pmc,height,weight,bmi,allergies,surgeries){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password"),
      patientId:id,
      bloodgroup:bloodgroup,
      genotype:genotype,
      pmc:pmc,
      height:height,
      weight:weight,
      bmi:bmi,
      allergies:allergies,
      surgeries:surgeries
    };
    return new Promise(resolve => {
      $.get("../API/setClinicData",param, function(data, status){
        resolve(data);
      });
    });
}

function updateClinicData(id,bloodgroup,genotype,pmc,height,weight,bmi,allergies,surgeries){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password"),
      patientId:id,
      bloodgroup:bloodgroup,
      genotype:genotype,
      pmc:pmc,
      height:height,
      weight:weight,
      bmi:bmi,
      allergies:allergies,
      surgeries:surgeries
    };
    return new Promise(resolve => {
      $.get("../API/updateClinicData",param, function(data, status){
        resolve(data);
      });
    });
}


function getClinicData(){
    param={
        matricNo:sessionStorage.getItem("username"),
        password:sessionStorage.getItem("password"),
      };
      return new Promise(resolve => {
        $.get("../API/getClinicDataAdmin",param, function(data, status){
          resolve(data);
        });
      });
}

function getClinicData(id){
    param={
        matricNo:sessionStorage.getItem("username"),
        password:sessionStorage.getItem("password"),
        patientId:id
      };
      return new Promise(resolve => {
        $.get("../API/getClinicDataAdmin",param, function(data, status){
          resolve(data);
        });
      });
}


async function searchClinic(){
    id=$("#clinicdata_search_value").val()
    data= await getClinicData(id);
    $("#subloader").fadeOut();
    if(data.error==false){
        if(data.data.length<1){
            $(".clinic_search_result").html(`
                <div class="noappointment">No clinic data for this patient exists!</div>            
            `);
        }
        else{
            $(".clinic_search_result").html(`
                <table id="scd_table" class="viewdata_table">
                    <thead class="table_heading">
                        <tr>
                          <th>Patient Id</th>
                          <th>Blood Group</th>
                          <th>Genotype</th>
                          <th>Height</th>
                          <th>Weight</th>
                          <th>BMI</th>
                          <th>Allergies</th>
                          <th>Surgeries</th>
                          <th>Previous Medical Conditions</th>
                          <th>Actions</th>
                        <tr>
                    <thead>
                    <tbody id="scd_tablebody" class="table_body">
                    
                    </tbody>
                </table>
            `);
              $("#scd_tablebody").append(`
                 <tr>
                    <td style="text-transform:uppercase;"><b>`+data.data.matricNo +`</b></td>
                    <td>`+data.data.bloodgroup +`</td>
                    <td>`+data.data.genotype +`</td>
                    <td>`+data.data.height +`</td>
                     <td>`+data.data.weight +`</td>
                    <td>`+data.data.bmi +`</td>
                    <td>`+data.data.allergies +`</td>
                    <td>`+data.data.surgeries +`</td>
                    <td>`+data.data.pmc +`</td>
                    <td class="clickable" onclick="editSingleClinicData('`+data.data.matricNo+`')">Edit</td>
                </tr>
            `);
        }
    }
    else{
        $(".clinic_search_result").html(`<div class="noappointment">No clinic data for this patient exists!</div>`);
    }
}

async function loadClinicData(){
    $("#AllClinicData").html(`<div id="subloader"></div>`);
    data= await getClinicData();
    if(data.error==false){
        if(data.data.length<1){
            $("#AllClinicData").html(`
                <div class="noappointment">No clinic data for patients exists!</div>            
            `);
        }
        else{
            $("#AllClinicData").html(`
                <table id="acd_table" class="viewdata_table">
                    <thead class="table_heading">
                        <tr>
                          <th>Patient Id</th>
                          <th>Blood Group</th>
                          <th>Genotype</th>
                          <th>Height</th>
                          <th>Weight</th>
                          <th>BMI</th>
                          <th>Allergies</th>
                          <th>Surgeries</th>
                          <th>Previous Medical Conditions</th>
                          <th>Actions</th>
                        <tr>
                    <thead>
                    <tbody id="acd_tablebody" class="table_body">
                    
                    </tbody>
                </table>
            `);
            for(i=0;i<data.data.length;i++){
                $("#acd_tablebody").append(`
                    <tr>
                        <td style="text-transform:uppercase;">`+data.data[i].matricNo +`</td>
                        <td>`+data.data[i].bloodgroup +`</td>
                        <td>`+data.data[i].genotype +`</td>
                        <td>`+data.data[i].height +`</td>
                        <td>`+data.data[i].weight +`</td>
                        <td>`+data.data[i].bmi +`</td>
                        <td>`+data.data[i].allergies +`</td>
                        <td>`+data.data[i].surgeries +`</td>
                        <td>`+data.data[i].pmc +`</td>
                        <td class="clickable" onclick="editSingleClinicData('`+data.data[i].matricNo+`')">Edit</td>
                    </tr>
                `);
            }
        }
    }
    else{
        $("#AllClinicData").html(`<span class="warning">Oops! An error Occured! Try logging out and logging in!</span>`);
    }
}


async function editSingleClinicData(id){
  $(".modal-dialog").addClass("modal-xl");  
  $(window).scrollTop(0);
  $(".modal-header").html(`<h2>Clinic Data</h2>`);

  $(".modal-body").html(`
    <div>
      <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
    </div>
  `);
  document.getElementById("showModal").click();


  sdata= await getClinicData(id);
   $(sdata).ready(function(){

        $(".modal-footer").html(`
            <button type="button" class="btn btn-block btn-danger" data-dismiss="modal">Close</button>
        `);

       $(".spinner-border").fadeOut(function(){
           $(".modal-body").html(`
           <div class="message_div" style="padding-left:1%;max-height:450px;">
           <form autocomplete="on" id="update_clinicdata_form" method="post">

           <input id="messagecontinue" class="btn btn-outline-success btn-block" type="submit" value="Update"/>
           
          <label class="set_appointment_label" for="patientId">Patient Id:</label><br/>
          <input type="text" maxlength=7 class="set_appointment_input" name="patientId" id="upatientId_input" value=`+sdata.data.matricNo +` required disabled><br/><br/>

          <label class="set_appointment_label" for="bloodgroup">BloodGroup:</label><br/>
          <select type="text" class="set_appointment_input" id="ubloodgroup_input"  name="bloodgroup" style="outline:none;" required>
              <option id="A+" value="A+">A+</option>
              <option id="A-" value="A-">A-</option>
               <option id="B+" value="B+">B+</option>
              <option id="B-" value="B-">B-</option>
              <option id="O+" value="O+">O+</option>
              <option id="O-" value="O-">O-</option>
              <option id="AB+" value="AB+">AB+</option>
              <option id="AB-" value="AB-">AB-</option>
          </select><br/><br/>

          <label class="set_appointment_label" for="genotype">Genotype:</label><br/>
           <select type="text" class="set_appointment_input" id="ugenotype_input" name="genotype"  style="outline:none;" value=`+sdata.data.genotype +` required>
               <option id="AA" value="AA">AA</option>
                <option id="AS" value="AS">AS</option>
               <option id="AC" value="AC">AC</option>
                <option id="SS" value="SS">SS</option>
                <option id="SC" value="SC">SC</option>
                <option id="CC" value="CC">CC</option>
             </select><br/><br/>

            <label class="set_appointment_label" for="height">Patient Height:</label><br/>
            <input style="width:87%;" type="num" class="set_appointment_input bm bm1" id="uheight_input_cm" name="height" value=`+sdata.data.height +` >
 
            <input type="num" style="display:none;width:42%;" class="set_appointment_input bm fi bm1" id="uheight_input_ft" name="height1" placeholder="feets" >           
 
           <select type="text" class="set_appointment_sinput unit bm" id="uheight_unit"  name="heightunit" style="outline:none;" placeholder="GenoType" required>
               <option class="unit" value="cm">CM</option>
                <option class="unit" value="ft">Ft</option>
             </select>
           <input type="num" style="display:none;width:42%;" class="set_appointment_input bm fi" id="uheight_input_in" name="height2" placeholder="inches" ><br/><br/>

 
           <label class="set_appointment_label" for="patientweight">Patient Weight:</label><br/>
           <input type="text" class="set_appointment_input bm bm1" id="uweight_input" name="weight" placeholder="Weight in kg"   value=`+sdata.data.weight +` required><b>Kg</b><br/><br/>

          <label class="set_appointment_label" for="patientbmi">BMI:</label><br/>
             <input type="text" class="set_appointment_input" id="ubmi_input" name="bmi" placeholder="BMI"  value=`+sdata.data.bmi+` required><br/><br/>

          <label class="set_appointment_label" for="allergies">Allergies:</label><br/>
            <textarea class="set_appointment_input" id="uallergies_input" name="allergies"  placeholder="Seperate with a comma, Input None if none exists" required>`+sdata.data.allergies +`</textarea><br/><br/>

          <label class="set_appointment_label" for="surgeries">Surgeries:</label><br/>
          <textarea class="set_appointment_input" id="usurgeries_input" name="surgeries"   placeholder="Seperate with a comma, Input None if none exists" required>`+sdata.data.surgeries +`</textarea><br/><br/>

          <label class="set_appointment_label" for="pmc">Previous Medical Condition(s):</label><br/>
          <textarea class="set_appointment_input" id="upmc_input" name="pmc"  placeholder="Seperate with a comma, Input None if none exists" required>`+sdata.data.pmc +`</textarea><br/>

          <input id="messagecontinue" class="btn btn-outline-success btn-block" type="submit" value="Update"/><br/><br/>
           </form>
            </div>
           `);
           document.getElementById(sdata.data.bloodgroup).selected=true;
           document.getElementById(sdata.data.genotype).selected=true;
           
           $(".unit").click(function(){
            var val=$("#uheight_unit").val();
            if(val=="cm"){
                $(".fi").hide(function(){
                    $("#uheight_input_cm").show();
                    $(".fi").val("");
                });
            }
            else{
                $("#uheight_input_cm").hide(function(){
                    $(".fi").show();
                    $("#uheight_input_cm").val("");
                });
            }
            });
    
            $(".bm").focus(function(){
                $(".bm").keyup(async function(){
                    var unit=$("#uheight_unit").val();
                    var w=$("#uweight_input").val();
                    if(unit=="cm"){
                        var h=$("#uheight_input_cm").val();
                        bmi= bmical(h,w);
                        $("#ubmi_input").val(bmi);
                    }
                    else{
                        var ft= $("#uheight_input_ft").val();
                        inc=$("#uheight_input_in").val();
                        var fi=ft+"."+inc;
                        var h= ftToCm(fi);
                        bmi= bmical(h,w);
                        $("#ubmi_input").val(bmi);
                    }
                });
                $('.bm').on('keydown', async function() {
                    var key = event.keyCode || event.charCode;
                    if( key == 8 || key == 46 ){
                        var unit=$("#uheight_unit").val();
                        var w=$("#uweight_input").val();
                        if(unit=="cm"){
                            var h=$("#uheight_input_cm").val();
                            bmi= bmical(h,w);
                            $("#ubmi_input").val(bmi);
                        }
                        else{
                            var ft= $("#uheight_input_ft").val();
                            inc=$("#uheight_input_in").val();
                            var fi=ft+"."+inc;
                            var h= ftToCm(fi);
                            bmi= bmical(h,w);
                            $("#ubmi_input").val(bmi);
                        }
                    }
                });
      
            });  

            $("#update_clinicdata_form").submit(async function(e){
                e.preventDefault();
                var id= $("#upatientId_input").val();
                var bloodgroup= $("#ubloodgroup_input").val();
                var genotype= $("#ugenotype_input").val();
                var heightUnit=$("#uheight_unit").val();
                if(heightUnit=="cm"){
                    var height=$("#uheight_input_cm").val();
                }
                else{
                   var ft= $("#uheight_input_ft").val();
                   var inc= $("#uheight_input_in").val();
                   var fi=ft+"."+inc;
                   var height= ftToCm(fi);
                }
                var weight= $("#uweight_input").val();
                var bmi= $("#ubmi_input").val();
                var pmc= $("#upmc_input").val();
                var allergies= $("#uallergies_input").val();
                var surgeries= $("#usurgeries_input").val();
        
                $(".modal-body").html(`
                    <div>
                        <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
                    </div>
                `);
                $(".modal-dialog").addClass("modal-xl");
        
                var upload= await updateClinicData(id,bloodgroup,genotype,pmc,height,weight,bmi,allergies,surgeries);                 
        
                $(upload).ready(function(){
                    $(".spinner-border").fadeOut(function(){
                        if(upload["error"]==true){
                            $('.modal-body').html(`
                                <p>`+upload["message"]+`</p>
                            `);
                            $(".modal-footer").html(`
                                <button type="button" class="btn btn-block btn-danger" data-dismiss="modal">Close</button>
                           `);
                        }
                        else if(upload["error"]==false){
                            $(".modal-body").html(`
                                <h1 class="text-success">Upload Successful!!</h1>
                            `);
                            $(".modal-footer").html(`
                                <button type="button" class="btn btn-block btn-success closee" data-dismiss="modal">Continue</button>
                           `);
                            $(".closee").click(function(){
                                loadClinicData();
                            })
                        }
                    });
                });
            
            });

        });

       

    });

  


}

async function setClinic(){

    $(".modal-dialog").removeClass("modal-xl");  
    $(window).scrollTop(0);
    $(".modal-header").html(`<h2>Clinic Data</h2>`);
  
    $(".modal-body").html(`
      <div>
        <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
      </div>
    `);
    document.getElementById("showModal").click();

    var id= $("#patientId_input").val();
    var bloodgroup= $("#bloodgroup_input").val();
    var genotype= $("#genotype_input").val();
    var heightUnit=$("#height_unit").val();
    if(heightUnit=="cm"){
        var height=$("#height_input_cm").val();
    }
    else{
        var ft= $("#height_input_ft").val();
        var inc= $("#height_input_in").val();
        var fi=ft+"."+inc;
        var height= ftToCm(fi);
    }
    var weight= $("#weight_input").val();
    var bmi= $("#bmi_input").val();
    var pmc= $("#pmc_input").val();
    var allergies= $("#allergies_input").val();
    var surgeries= $("#surgeries_input").val();

    var upload= await setClinicData(id,bloodgroup,genotype,pmc,height,weight,bmi,allergies,surgeries);
     
    $(upload).ready(function(){
        $(".spinner-border").fadeOut(function(){
            if(upload["error"]==true){
                $(".modal-body").html(`
                    <p>`+upload["message"]+`</p>
                `);
                $(".modal-footer").html(`
                    <button type="button" class="btn btn-block btn-danger" data-dismiss="modal">Try Again</button>
                `);
            }
            else if(upload["error"]==false){
                $(".modal-body").html(`
                    <h1 class="text-successful">Upload Successful!</h1>
                `);
                $(".modal-footer").html(`
                    <button type="button" class="btn btn-block btn-success closee" data-dismiss="modal">Continue</button>
                `);
                $(".closee").click(function(){
                    loadClinicData();
                });
            }
        });
    });
}

async function updateClinic(){
  
}
  
  
function ftToInch(ft){
    var t=ft*12
    return t;
}

function inchToCm(inch){
    var q=inch*2.54
    return q;
}

function ftToCm(ft){
    var q=ft*30.48;
    return q;
}

function loadbmi(){
    var unit=$("#height_unit").val();
    var w=$("#weight_input").val();
    if(unit=="cm"){
        var h=$("#height_input_cm").val();
        bmi= bmical(h,w);
        $("#bmi_input").val(bmi);
    }
    else{
        var ft= $("#height_input_ft").val();
        inc=$("#height_input_in").val();
        var fi=ft+"."+inc;
        var h= ftToCm(fi);
        bmi= bmical(h,w);
        $("#bmi_input").val(bmi);
    }
}

function bmical(h,w){
    hm=h/100;
    h2=hm*hm;
    bmi=w/h2;
    return bmi.toFixed(2);
}


function openClinicTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("viewclinicdata_tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("viewclinicdata_tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }