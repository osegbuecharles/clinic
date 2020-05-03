<script src="../js/adminviewpatients.js"></script>
<link rel="stylesheet" href="../css/adminviewpatients.css"/>


<div class="viewpatients_body">
    
    <h1>Patients</h1>

    <div class="viewpatients_tab box_shadow">
        <button class="viewpatients_tablinks active" onclick="openPatientTab(event, 'AllPatients')">&nbsp;All&nbsp;</button>
        <button class="viewpatients_tablinks" onclick="openPatientTab(event, 'SearchPatients')">Search</button>
    </div>

    <div id="AllPatients" class="viewpatients_tabcontent force px-3 box_shadow" style="display:block;">
           
    </div>

    <div id="SearchPatients" class="viewpatients_tabcontent px-3 box_shadow">
    <form id="patient_search_form" autocomplete="on" method="post">
           <input id="patient_search_value" class="searchbar" type="search" placeholder="Search by PatientId (MatricNo or StaffNo)" focus/>
            <input type="submit" id="patient_search" class="searchbutton" value="Search"/>
        </form>
       <div class="patient_search_result"></div>
    </div>

</div>