<script src="../js/viewappointments.js"></script>
<link rel="stylesheet" href="../css/viewappointments.css"/>


<div class="viewappointments_body">
    
    <h1>Appointments</h1>

    <div class="viewappointments_tab box_shadow">
        <button class="viewappointments_tablinks active" onclick="openAppointmentTab(event, 'Today')">&nbsp;Today&nbsp;</button>
        <button class="viewappointments_tablinks" onclick="openAppointmentTab(event, 'Upcoming')">Upcoming</button>
        <button class="viewappointments_tablinks" onclick="openAppointmentTab(event, 'Status')">Status</button>
        <button class="viewappointments_tablinks" onclick="openAppointmentTab(event, 'SearchAppointment')">Search</button>
        <button class="viewappointments_tablinks" onclick="openAppointmentTab(event, 'SetAppointment')">New Appointment</button>
    </div>

    <div id="Today" class="viewappointments_tabcontent px-3 container-fluid box_shadow" style="display:block;">
            Today
    </div>

    <div id="Upcoming" class="viewappointments_tabcontent px-3 box_shadow">
        Upcoming
    </div>

    <div id="Status" class="viewappointments_tabcontent px-3 box_shadow">

        <button class="viewstatus_tablinks active" onclick="openStatusTab(event, 'Approved')">Approved</button>
        <button class="viewstatus_tablinks" onclick="openStatusTab(event, 'Pending')">Pending</button>
        <button class="viewstatus_tablinks" onclick="openStatusTab(event, 'Declined')">Declined</button>
        <button class="viewstatus_tablinks" onclick="openStatusTab(event, 'Completed')">Completed</button>

        <div id="Approved" class="viewstatus_tabcontent"  style="display:block;">
           Approved
        </div>

        <div id="Pending" class="viewstatus_tabcontent">
            Pending           
        </div>

        <div id="Declined" class="viewstatus_tabcontent">
           Declined
        </div>

        <div id="Completed" class="viewstatus_tabcontent">
           Completed
        </div>
    </div>

    <div id="SearchAppointment" class="viewappointments_tabcontent px-3 box_shadow">
       <form id="appointment_search_form" autocomplete="on" method="post">
           <input id="appointment_search_value" class="searchbar" type="search" placeholder="Search by Id, Reason or Date(y-m-d)" focus/>
            <input type="submit" id="appointment_search" class="searchbutton" value="Search"/>
        </form>
       <div class="appointment_search_result"></div>
    </div>

    <div id="SetAppointment" class="viewappointments_tabcontent box_shadow">
       <form autocomplete="on" id="set_appointment_form" method="post">
           <label class="set_appointment_label" for="reason">Reason:</label><br/>
           <input type="text" class="set_appointment_input" id="reason_input" placeholder="Reason for appointment" list="reason" required><br/><br/>
           <datalist id="reason">
               <option value="Clinic Data">
               <option value="Personal">
               <option value="Medical">
           </datalist>

           <label class="set_appointment_label" id="date_label" for="date">Date:</label><br/>
           <input class="set_appointment_input" id="date_input" type="date" name="date" required/><br/><br/>

           <label class="set_appointment_label" id="time_label" for="time">Time:</label><br/>
           <input class="set_appointment_input" id="time_input" type="time" name="time" required/><br/><br/>

           <input class="set_appointment_submit" type="submit" value="Set Appointment"/>
       </form>
    </div>

</div>