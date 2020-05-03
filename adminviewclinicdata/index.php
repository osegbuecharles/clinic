<script src="../js/adminviewclinicdata.js"></script>
<link rel="stylesheet" href="../css/adminviewclinicdata.css"/>

<div class="viewclinicdata_body">
    
    <h1>Clinic Data</h1>

    <div class="viewclinicdata_tab box_shadow">
        <button class="viewclinicdata_tablinks active" onclick="openClinicTab(event, 'AllClinicData')">&nbsp;All&nbsp;</button>
        <button class="viewclinicdata_tablinks" onclick="openClinicTab(event, 'SearchClinicData')">Search</button>
        <button class="viewclinicdata_tablinks" onclick="openClinicTab(event, 'SetClinicData')">Set</button>
    </div>

    <div id="AllClinicData" class="viewclinicdata_tabcontent box_shadow" style="display:block;">
        
    </div>

    <div id="SearchClinicData" class="viewclinicdata_tabcontent box_shadow">
        <form id="clinicdata_search_form" autocomplete="on" method="post">
           <input id="clinicdata_search_value" class="searchbar" type="search" placeholder="Search by PatientId (MatricNo or StaffNo)" focus/>
            <input type="submit" id="clinic_search" class="searchbutton" value="Search"/>
        </form>
       <div class="clinic_search_result"></div>
    </div>

    <div id="SetClinicData" class="viewclinicdata_tabcontent box_shadow">

        <form autocomplete="on" id="set_clinicdata_form" method="post">

           <label class="set_appointment_label" for="patientId">Patient Id:</label><br/>
           <input type="text" maxlength=7 class="set_appointment_input" name="patientId" id="patientId_input" placeholder="MatricNo/Staff No of patient" required><br/><br/>

           <label class="set_appointment_label" for="bloodgroup">BloodGroup:</label><br/>
           <select type="text" class="set_appointment_input" id="bloodgroup_input"  name="bloodgroup" style="outline:none;" placeholder="Blood Group" required>
               <option value="A+">A+</option>
               <option value="A-">A-</option>
               <option value="B+">B+</option>
               <option value="B-">B-</option>
               <option value="O+">O+</option>
               <option value="O-">O-</option>
               <option value="AB+">AB+</option>
               <option value="AB-">AB-</option>
            </select><br/><br/>

           <label class="set_appointment_label" for="genotype">Genotype:</label><br/>
           <select type="text" class="set_appointment_input" id="genotype_input" name="genotype"  style="outline:none;" placeholder="GenoType" required>
               <option value="AA">AA</option>
               <option value="AS">AS</option>
               <option value="AC">AC</option>
               <option value="SS">SS</option>
               <option value="SC">SC</option>
               <option value="CC">CC</option>
            </select><br/><br/>

           <label class="set_appointment_label" for="height">Patient Height:</label><br/>
           <input type="num" class="set_appointment_input bm bm1" id="height_input_cm" name="height" placeholder="CM" >
           
           <input type="num" class="set_appointment_input bm fi bm1" style="display:none;width:42%;" id="height_input_ft" name="height1" placeholder="feets" >           
           
           <select type="text" class="set_appointment_sinput unit bm" id="height_unit"  name="heightunit" style="outline:none;" placeholder="GenoType" required>
               <option class="unit" value="cm">CM</option>
               <option class="unit" value="ft">Ft</option>
            </select>
            <input type="num" class="set_appointment_input bm fi"  style="display:none;width:42%;" id="height_input_in" name="height2" placeholder="inches" ><br/><br/>

           
            <label class="set_appointment_label" for="patientweight">Patient Weight:</label><br/>
           <input type="text" class="set_appointment_input bm bm1" id="weight_input" name="weight" placeholder="Weight in kg" required><b>Kg</b><br/><br/>

           <label class="set_appointment_label" for="patientbmi">BMI:</label><br/>
           <input type="text" class="set_appointment_input" id="bmi_input" name="bmi" placeholder="BMI" required><br/><br/>

           <label class="set_appointment_label" for="allergies">Allergies:</label><br/>
           <textarea class="set_appointment_input" id="allergies_input" name="allergies" placeholder="Seperate with a comma, Input None if none exists" required></textarea><br/><br/>

           <label class="set_appointment_label" for="surgeries">Surgeries:</label><br/>
           <textarea class="set_appointment_input" id="surgeries_input" name="surgeries" placeholder="Seperate with a comma, Input None if none exists" required></textarea><br/><br/>

           <label class="set_appointment_label" for="pmc">Previous Medical Condition(s):</label><br/>
           <textarea class="set_appointment_input" id="pmc_input" name="pmc" placeholder="Seperate with a comma, Input None if none exists" required></textarea><br/><br/>

           <input class="set_appointment_submit" type="submit" value="Upload"/>
       </form>
    </div>

</div>