<?php include "../nav/index.php" ?>
<script>active("portal")</script>
<script src="../js/portal.js"></script>
<link rel="stylesheet" href="../css/portal.css"/>


<div id="loader"></div>
<!--<div id="subloader"></div>-->

<!--<div class="preloader">
    <img src="../assets/preloader/preloaderMain.gif"/>
</div>-->

<button class="admin_link"><a id="admin" href="../admin">Admin View</a></button>

<div class="body">
    <div class="login container-fluid pt-2">
        <form autocomplete="on" class="login_form was-validated" method="post">
            <div class="container-fluid d-flex justify-content-center">
                <img class="img-fluid rounded-circle " width="200" src="../assets/loginimage.png"/><br/><br/>
            </div>
        
            <div class="form-group">
                <label class="login_label" id="login_username_label" for="username"> User Name: </label>
                <input class="form-control" id="login_username_input" maxlength="7" type="text" name="username" placeholder="Enter your username" required autofocus/>
                <div class="valid-feedback">Valid!</div>
                <div class="invalid-feedback">Please fill out this field.</div>
            </div>
            
            <div class="form-group">
                <label class="login_label" id="login_password_label" for="password"> Password: </label><br/>
                <input class="form-control" id="login_password_input" type="password" minlength=6 name="password" placeholder="Enter Password" required/>
                <div class="valid-feedback">Valid.</div>
                <div class="invalid-feedback">Password must be 6 characters or more.</div>
            </div>
            

            <input class="login_submit btn" type="submit" value="Login"/><br/><br/>
        </form>
        <div class="others rounded container-fluid pt-2 mx-auto row">
            <span class="forgot_password col-md"><a>Forgot password</a></span>
            <button class="signup_button col">Sign Up</button>
        </div>
    </div>

<button data-toggle="modal" id="showModal" style="display:none;" data-target="#myModal"></button>
    <!-- The Modal -->
<div class="modal fade" id="myModal">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
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


    <div class="signup">
        <form autocompete="on" class="signup_form" method="post">
            <br/><h2>Sign Up</h2>
            <span>Please fill in this form to create an account.</span><br/>
            <hr/><br/>

            <label class="signup_label" id="signup_matric_label" for="matric"> Matric/Staff No: </label><br/>
            <input class="signup_input" id="signup_matric_input" maxlength=7 type="text" name="matric" placeholder="Enter your Matric/Staff No" required autofocus/><br/><br/>

            <label class="signup_label" id="signup_password_label" for="password"> Password: </label><br/>
            <input class="signup_input" id="signup_password_input" minlength=6 maxlength=18 type="password" name="password" placeholder="Password" required/><br/><br/>

            <label class="signup_label" id="signup_lastName_label" for="lastName"> LastName: </label><br/>
            <input class="signup_input" id="signup_lastName_input" maxlength=25 type="text" name="lastName" placeholder="Enter your Last Name" required/><br/><br/>

            <label class="signup_label" id="signup_firstName_label" for="firstName"> FirstName: </label><br/>
            <input class="signup_input" id="signup_firstName_input" maxlength=25 type="text" name="firstName" placeholder="Enter your First Name" required/><br/><br/>

            <label class="signup_label" id="signup_email_label" for="email"> Email: </label><br/>
            <input class="signup_input" id="signup_email_input" maxlength=50 type="email" name="email" placeholder="example@example.com" required/><br/><br/>

            <label class="signup_label" id="signup_phone_label" for="phone"> Phone: </label><br/>
            <span>+234</span><input class="signup_input" id="signup_phone_input" maxlength=10 type="tel" name="phone" placeholder="1111111111" required/><br/><br/>

            <label class="signup_label" id="signup_gender_label" for="gender">Gender: </label><br/>
            <input class="signup_input" id="signup_gender_input" type="radio" name="gender" value="m" required>Male<br/>
            <input class="signup_input" id="signup_gender_input" type="radio" name="gender" value="f" required>Female<br/><br/>

            <label class="signup_label" id="signup_dob_label" for="dob">Date of Birth: </label><br/>
            <input class="signup_input" id="signup_dob_input" type="date" name="dob" required/><br/><br/>

            <label class="signup_label" id="signup_address_label" for="dob">Address: </label><br/>
            <textarea class="signup_input" id="signup_address_input" placeholder="Enter Address"></textarea>

            <input class="signup_submit" type="submit" value="SignUp"/><br/><br/>
        </form>

        <div class="signup_others">
            Already a member: &nbsp; <button class="login_button">Login</button>
        </div>
    </div>

    <div class="portal container-fluid px-0">
        <div class="tab md container-fluid px-0">
            <button class="tablinks active" onclick="openTab(event, 'Profile')">Profile</button>
            <button class="tablinks" onclick="openTab(event, 'ClinicData')">Clinic Data</button>
            <button class="tablinks" onclick="openTab(event, 'VirtualDoctor')">Virtual Doctor</button>
            <button class="tablinks" onclick="openTab(event, 'Drugs')">Drugs</button>
            <button class="tablinks" onclick="openTab(event, 'Appointment')">Appointments</button>
            <button class="tablinks" onclick="openTab(event, 'Settings')">Settings</button>
        </div>

        <div class="tab sm container-fluid px-0">
            <button class="tablinks active" onclick="openTab(event, 'Profile')"><i class="fa fa-user p-icon" aria-hidden="true"></i></button>
            <button class="tablinks" onclick="openTab(event, 'ClinicData')"><i class="fa fa-hospital-o p-icon" aria-hidden="true"></i></button>
            <button class="tablinks" onclick="openTab(event, 'VirtualDoctor')"><i class="fa fa-user-md p-icon" aria-hidden="true"></i></button>
            <button class="tablinks" onclick="openTab(event, 'Drugs')"><i class="fa fa-medkit p-icon" aria-hidden="true"></i></button>
            <button class="tablinks" onclick="openTab(event, 'Appointment')"><i class="fa fa-calendar p-icon" aria-hidden="true"></i></button>
            <button class="tablinks" onclick="openTab(event, 'Settings')"><i class="fa fa-cog p-icon" aria-hidden="true"></i></button>
        </div>

        <div id="Profile" class="tabcontent container-fluid" style="display:block;">
            <div>
                <?php
                    include "../viewprofile/index.php";
                ?>
            </div> 
        </div>

        <div id="ClinicData" class="tabcontent">
            <div>
                <?php
                   include "../viewclinicdata/index.php";
                ?>
            </div> 
        </div>

        <div id="VirtualDoctor" class="tabcontent">
            <div>
                <?php
                   include "../viewvirtualdoctor/index.php";
                ?>
            </div> 
        </div>

        <div id="Drugs" class="tabcontent">
            <div>
                <?php
                   include "../viewdrugs/index.php";
                ?>
            </div> 
        </div>

        <div id="Appointment" class="tabcontent">
            <div>
                <?php
                   include "../viewappointments/index.php";
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