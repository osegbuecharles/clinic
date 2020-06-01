<?php include "../header.php" ?>
<link rel="stylesheet" href="../css/nav.css"/>
<script src="../js/nav.js"></script>
<!--<body>
    <div id="head">
        <a href="../home"><img src="../assets/Name.png"/></a>
    </div>
    <div id="navbar">
        <a id="home" href="../home">Home</a>
        <hr/>
        <a id="portal" href="../portal">Portal</a>
        <hr/>
        <a id="clinic" href="../clinic">Clinic</a>
        <hr/>
        <a id="gallery" href="../gallery">Gallery</a>
    </div>

    <div id="mobilenav">
        <a class="home" id="home" href="../home">Home</a>
        <div class="dropdown">
            <a href="javascript:void(0);" class="icon">&#9776;</a>
            <a class="nav" id="portal" href="../portal">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Portal</a>
            <a class="nav" id="clinic" href="../clinic">Clinic</a>
            <a class="nav" id="gallery" href="../gallery">Gallery</a>
        </div>
    </div>
</body>-->

<div id="head">
    <a href="../home"><img src="../assets/NAME.png"/></a>
</div>

<nav class="navbar navbar-expand-sm justify-content-center navbar-dark sticky-top w-100" style="background-color: rgb(130, 60, 0);z-index:1">
    <!-- Brand -->
    <a class="navbar-brand" data-toggle="tooltip" data-placement="top" title="Augustine University Ilara">AUI</a>
  
    <!-- Toggler/collapsibe Button -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Navbar links -->
    <div class="collapse navbar-collapse justify-content-center" id="collapsibleNavbar">
      <ul class="navbar-nav" id="main-nav">

        <li class="nav-item">
          <a id="home" class="nav-link home_nav" href="../home">Home</a>
        </li>

        <li class="nav-item">
          <a id="portal" class="nav-link home_nav" style="background-color: inherit;" href="../portal">Portal</a>
        </li>

        <li class="nav-item">
          <a id="gallery" class="nav-link home_nav" href="../gallery">Gallery</a>
        </li>

        <li class="nav-item">
            <a id="about" class="nav-link home_nav" href="../about">About Us</a>
        </li>
       
      </ul>
    </div>
</nav>

