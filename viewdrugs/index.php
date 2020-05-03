<script src="../js/viewdrugs.js"></script>
<link rel="stylesheet" href="../css/viewdrugs.css"/>

<div class="viewdrugs_body">
    
    <h1>Drugs</h1>

    <div class="viewdrugs_tab box_shadow">
        <button class="viewdrugs_tablinks active" onclick="openDrugTab(event, 'AllDrugs')">&nbsp;All&nbsp;</button>
        <button class="viewdrugs_tablinks" onclick="openDrugTab(event, 'CompletedDrugs')">Completed</button>
        <button class="viewdrugs_tablinks" onclick="openDrugTab(event, 'NotCompletedDrugs')">Not Completed</button>
    </div>

    <div id="AllDrugs" class="viewdrugs_tabcontent px-2 box_shadow" style="display:block;">
            All
    </div>

    <div id="CompletedDrugs" class="viewdrugs_tabcontent px-2 box_shadow">
        Completed
    </div>

    <div id="NotCompletedDrugs" class="viewdrugs_tabcontent px-2 box_shadow">
      Not completed
    </div>

</div>