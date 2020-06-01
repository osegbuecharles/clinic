<?php include "../nav/index.php" ?>
<script>active("home")</script>
<link rel="stylesheet" href="../css/home.css"/>
<script src="../js/home.js"></script>

<body>

    <div id="homePageCarousel" class="carousel slide" data-ride="carousel">
        
      <ol class="carousel-indicators">
          <li data-target="#homePageCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#homePageCarousel" data-slide-to="1"></li>
          <li data-target="#homePageCarousel" data-slide-to="2"></li>
        </ol>

        <div class="carousel-inner">
      
          <div class="carousel-item active">
            <img class="d-block w-100" src="../assets/gallery/20191122_104920.jpg" alt="First slide">
            <div class="carousel-caption">
              <h3>We Care!</h3>
              <p>Health at its best</p>
            </div>
          </div>
      
          <div class="carousel-item">
            <img class="d-block w-100" src="../assets/gallery/background1.jpg" alt="Second slide">           
          </div>
      
          <div class="carousel-item">
            <img class="d-block w-100" src="../assets/gallery/20191122_110738.jpg" alt="Third slide">
          </div>
      
        </div>
      
        <a class="carousel-control-prev" href="#homePageCarousel" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
      
        <a class="carousel-control-next" href="#homePageCarousel" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>

    </div>

    <hr style="width:99%; margin-top:0px; height:1px;"/>

    <div class="healthTips container">
      <h2>Fun Health Tips</h2><br/>

      <div class="card border-primary my-3">      
        
        <div class="card-header">
          <h4 class="card-title">Where is my Coffee? ☕</h4>
        </div>

        <div class="card-body">
          <blockquote class="blockquote">          
            <p>
              As hard as it may seem, Coffee is actually very healthy<br/><br/>
              It’s high in antioxidants, and studies have linked coffee intake to longevity and a reduced risk of type 2 diabetes, Parkinson’s and Alzheimer’s diseases, and numerous other illnesses <br/><br/>
              So why not incorporate coffee into your routine 😀 and be careful not to go overboard!
            </p>
            <footer class="blockquote-footer text-dark">From <a class="text-dark flink" href="https://www.healthline.com/nutrition/27-health-and-nutrition-tips#section4">healthline.com</a></footer>
          </blockquote>        
        </div>
     
      </div>


      <div class="card border-primary my-3">      
        
        <div class="card-header">
          <h4 class="card-title">Cant get enough Water 💧</h4>
        </div>

        <div class="card-body">

          <blockquote class="blockquote">          
            <p>
              Drinking enough water can have numerous benefits.<br/><br/>
              Surprisingly, it can boost the number of calories you burn.<br/><br/>
              Two studies note that it can increase metabolism by 24–30% over 1–1.5 hours. 
              This can amount to 96 additional calories burned if you drink 8.4 cups (2 liters) of water per day<br/><br/>
              The optimal time to drink it is before meals. One study showed that downing 2.1 cups (500 ml) of water 30 minutes
              before each meal increased weight loss by 44%
            </p>
            <footer class="blockquote-footer text-dark">From <a class="text-dark flink" href="https://www.healthline.com/nutrition/27-health-and-nutrition-tips#section4">healthline.com</a></footer>
          </blockquote>
        
        </div>
     
      </div>      


      <div class="card border-primary">      
        
        <div class="card-header">
          <h4 class="card-title">Healthy Nuts ✔</h4>
        </div>

        <div class="card-body">

          <blockquote class="blockquote">          
            <p>
              Despite being high in fat, nuts are incredibly nutritious and healthy.<br/><br/>
              They’re loaded with magnesium, vitamin E, fiber, and various other nutrients.<br/><br/>
              Studies demonstrate that nuts can help you lose weight and may help fight type 2 diabetes and heart disease<br/><br/>
              Additionally, your body doesn’t absorb 10–15% of the calories in nuts. Some evidence also suggests that this food can boost metabolism<br/><br/>
              In one study, almonds were shown to increase weight loss by 62%, compared with complex carbs
            </p>
            <footer class="blockquote-footer text-dark">From <a class="text-dark flink" href="https://www.healthline.com/nutrition/27-health-and-nutrition-tips#section2">healthline.com</a></footer>
          </blockquote>
        
        </div>
     
      </div>

      <div class="card bg-white text-dark border border-success my-3">
        <div class="card-body py-2" style="text-align: center;">
          <h4><a class="text-success" href="../healthtips/">See more>></a></h4>
        </div>
      </div>

    

    </div>


<?php
    include "../footer/index.php";
?>


