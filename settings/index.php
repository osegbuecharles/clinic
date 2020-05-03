<link rel="stylesheet" href="../css/settings.css"/>
<script src="../js/settings.js"></script>

<h1>Settings</h1>

<div class="settings_body box_shadow">
    <div class="container my-3 row">
        <div class="col d-flex justify-content-end">
            <span><h3><b>Night Mode:</b></h3></span>
        </div>
        <div class="container col my-1">
            <label class="switch">
                <input id="dark_mode_input" class="dark_mode_input" type="checkbox">
                <span class="slider round"></span>
            </label>
        </div>
    </div>
    <hr/>
    <div class="change_password">
        <button class="accordion">Change Password</button>
        <div class="panel force">
            <form class="change_password_form">
                <input class="old_password" type="password" minlength="6" maxlength="18"  placeholder="Old Password" required/><br/>
                <input class="new_password" type="password" minlength="6" maxlength="18" placeholder="New Password" required/><br/>
                <input class="change_password_submit" type="submit" value="Change Password"/>
        </div>
    </div>
    <hr/>
    <div class="logout">
        <button class="logout_button">Logout</button>
    </div>
</div>