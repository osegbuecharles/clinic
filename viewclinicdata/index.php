<script src="../js/viewclinicdata.js"></script>
<link rel="stylesheet" href="../css/viewclinicdata.css"/>

<div class="viewclinicdata_body">
    <h1>Clinic Data</h1>

    <div class="noclinicdata box_shadow">
        <p>
            
        </p>
    </div>

    <div class="clinicdata box_shadow">
        <span class="warning">Something is not right with your clinic data? Then visit the clinic to modify the data</span>

        <div class="bloodgroup clinic_dataitem"></div>
        <div class="genotype clinic_dataitem"></div>
        <div class="pmc clinic_dataitem"></div>
        <div class="height clinic_dataitem"></div>
        <div class="weight clinic_dataitem"></div>
        <div class="bmi clinic_dataitem"></div>
        <div class="slidecontainer">
           <input type="range" min="12" max="45" value="" class="bmi_range" id="myRange" disabled><br/>
        </div>
        <div class="allergies clinic_dataitem"></div>
        <div class="surgeries clinic_dataitem"></div>

    </div>
</div>