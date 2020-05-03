<?php include "../nav/index.php" ?>
<script src="../js/admin.js"></script>
<link rel="stylesheet" href="../css/admin.css"/>


<div id="loader"></div>

<div class="admin_body">


<button data-toggle="modal" id="showModal" style="display:none;" data-target="#myModal"></button>
    <!-- The Modal -->
<div class="modal fade" id="myModal">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content force">
          <!-- Modal Header -->
      <div class="modal-header">
      
        </div>

      <!-- Modal body -->
      <div class="modal-body">
        <div>
            <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
        </div>
      </div>

      <!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
</div>


    <div class="portal">
        <div class="tab md container-fluid px-0">
            <button class="tablinks active" onclick="openTab(event, 'Patients')">Patients</button>
            <button class="tablinks" onclick="openTab(event, 'ClinicData')">Clinic Data</button>
            <button class="tablinks" onclick="openTab(event, 'VirtualDoctor')">Virtual Doctor</button>
            <button class="tablinks" onclick="openTab(event, 'Inventory')">Inventory</button>
            <button class="tablinks" onclick="openTab(event, 'Appointment')">Appointments</button>
            <button class="tablinks" onclick="openTab(event, 'Settings')">Settings</button>
        </div>

        <div class="tab sm container-fluid px-0">
            <button class="tablinks active" onclick="openTab(event, 'Patients')"><i class="fa fa-users p-icon" aria-hidden="true"></i></button>
            <button class="tablinks" onclick="openTab(event, 'ClinicData')"><i class="fa fa-hospital-o p-icon" aria-hidden="true"></i></button>
            <button class="tablinks" onclick="openTab(event, 'VirtualDoctor')"><i class="fa fa-user-md p-icon" aria-hidden="true"></i></button>
            <button class="tablinks" onclick="openTab(event, 'Inventory')"><i class="fa fa-archive p-icon" aria-hidden="true"></i></button>
            <button class="tablinks" onclick="openTab(event, 'Appointment')"><i class="fa fa-calendar p-icon" aria-hidden="true"></i></button>
            <button class="tablinks" onclick="openTab(event, 'Settings')"><i class="fa fa-cog p-icon" aria-hidden="true"></i></button>
        </div>

        <div id="Patients" class="tabcontent" style="display:block;">
            <div>
                <?php
                   include "../adminviewpatients/index.php";
                ?>
            </div> 
        </div>

        <div id="ClinicData" class="tabcontent">
            <div>
                <?php
                  include "../adminviewclinicdata/index.php";
                ?>
            </div> 
        </div>
        
        <div id="VirtualDoctor" class="tabcontent">
            <div>
                <?php
                   include "../adminviewvirtualdoctor/index.php";
                ?>
            </div> 
        </div>

        <div id="Inventory" class="tabcontent">
            <div>
                <?php
                   include "../adminviewinventory/index.php";
                ?>
            </div> 
        </div>

        <div id="Appointment" class="tabcontent">
            <div>
                <?php
                  include "../adminviewappointments/index.php";
                ?>
            </div> 
        </div>

        <div id="Settings" class="tabcontent">
            <div>
                <?php
                   include "../settings/index.php";
                ?>
            </div> 
        </div>

    </div>

    <?php include "../footer/index.php"; ?>
</div>