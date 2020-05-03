<script src="../js/adminviewinventory.js"></script>
<link rel="stylesheet" href="../css/adminviewinventory.css"/>


<div class="viewinventory_body">
    
    <h1>Inventory</h1>

    <div class="viewinventory_tab box_shadow">
        <button class="viewinventory_tablinks active" onclick="openInventoryTab(event, 'AllInventory')">&nbsp;All Inventory&nbsp;</button>
        <button class="viewinventory_tablinks" onclick="openInventoryTab(event, 'SearchInventory')">Search Inventory</button>
        <button class="viewinventory_tablinks" onclick="openInventoryTab(event, 'AddInventory')">Add Inventory</button>
    </div>

    <div id="AllInventory" class="viewinventory_tabcontent box_shadow" style="display:block;">
           All
    </div>

    <div id="SearchInventory" class="viewinventory_tabcontent box_shadow">
        <form id="inventory_search_form" autocomplete="on" method="post">
           <input id="inventory_search_value" class="searchbar" type="search" placeholder="Search by Inventory Name or Type" focus/>
            <input type="submit" id="inventory_search" class="searchbutton" value="Search"/>
        </form>
       <div class="inventory_search_result"></div>
    </div>

    <div id="AddInventory" class="viewinventory_tabcontent box_shadow">
        <form id="add_inventory_form" autocomplete="on" method="post">
           
           <label class="set_appointment_label" for="inventoryname">Item Name:</label><br/>
           <input type="text" class="set_appointment_input" id="inventoryname_input" name="inventoryname" placeholder="Name of Item" required><br/><br/>

           <label class="set_appointment_label" for="inventorytype">Item Type:</label><br/>
           <input type="text" class="set_appointment_input" id="inventorytype_input" name="inventorytype" placeholder="Type of Item" list="inventorytype" required><br/><br/>
           <datalist id="inventorytype">
               <option value="Drug">
               <option value="Equipment">
               <option value="Facility">
           </datalist>

           <label class="set_appointment_label" for="inventoryquantity">Quantity:</label><br/>
           <input type="number" class="set_appointment_inputq" id="inventoryquantity_input" name="inventoryquantity" placeholder="Quantity" required> <input type="text" class="set_appointment_inputq" id="inventoryunit_input" name="inventoryquantity" placeholder="Unit" required><br/><br/>


           <label class="set_appointment_label" for="inventoryfunction">Function:</label><br/>
           <textarea class="set_appointment_input" id="inventoryfunction_input" name="inventoryfunction" placeholder="What is the function of this item" required></textarea><br/><br/>
           
           <input class="set_appointment_submit" type="submit" value="Upload"/>
        </form>
    </div>

</div>