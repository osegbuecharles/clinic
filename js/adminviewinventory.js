var psize=6;
var pnum=1;
$(document).ready(function(){
    loadAllInventory(psize,pnum);
    $("#inventory_search_form").submit(function(e){
      e.preventDefault();
      loadSearchResult(psize,pnum);
    });

    $("#add_inventory_form").submit(function(e){
      e.preventDefault();
      submitAddInventory();
    });
});


function getInventory(pageNum,pageSize){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password"),
      pageNum:pageNum,
      pageSize:pageSize
    };
    return new Promise(resolve => {
      $.get("../API/getInventory",param, function(data, status){
        resolve(data);
      });
    });
}

function getInventoryByName(pageNum,pageSize,name){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password"),
      pageNum:pageNum,
      pageSize:pageSize,
      name:name
    };
    return new Promise(resolve => {
      $.get("../API/getInventory",param, function(data, status){
        resolve(data);
      });
    });
}

function getInventoryByType(pageNum,pageSize,type){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password"),
      pageNum:pageNum,
      pageSize:pageSize,
      type:type
    };
    return new Promise(resolve => {
      $.get("../API/getInventory",param, function(data, status){
        resolve(data);
      });
    });
}

function updateInventory(id,name,functio,type,quantity,unit){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password"),
      id:id,
      name:name,
      function:functio,
      type:type,
      quantity:quantity,
      unit:unit
    };
    return new Promise(resolve => {
      $.get("../API/updateInventory",param, function(data, status){
        resolve(data);
      });
    });
}

function addInventory(name,functio,type,quantity,unit){
  param={
    matricNo:sessionStorage.getItem("username"),
    password:sessionStorage.getItem("password"),
    name:name,
    function:functio,
    type:type,
    quantity:quantity,
    unit:unit
  };
  return new Promise(resolve => {
    $.get("../API/setInventory",param, function(data, status){
      resolve(data);
    });
  });
}




async function loadAllInventory(p,ps){
   inventorypageSize=p;
   var inventorypaginate=1;
   $("#AllInventory").html(`
     <table id="allInventoryTable" class="table">
       <thead class="table_heading">
         <tr>
           <th>Id</th>
           <th>Name</th>
           <th>Type</th>
           <th>Quantity</th>
           <th>Unit</th>
           <th>Function</th>
           <th>Action</th>
           </tr>
         </thead>
         <tbody id="viewinventorybody" class="table_body">
         
         </tbody>
     </table>
     <div id="subloader" class="aisb" style="margin-left:25%;margin-top:10px;"></div>
     <div class="inventorypagination paginationstyle"></div>
   `);
 
   l= await getInventory(1,1);
   if(l.length>inventorypageSize){
     $(".inventorypagination").append(`<a id="inventoryprev">&laquo;</a>`);
     last=Math.ceil(l.length/inventorypageSize)
     for(i=1;i<=last;i++){
         if(i==ps){
            $(".inventorypagination").append(`<a id="inventorypaginate`+i+`"class="inventorypaginate active">`+i+`</a>`);
         }
         else{
            $(".inventorypagination").append(`<a id="inventorypaginate`+i+`"class="inventorypaginate">`+i+`</a>`);
         }
     }
     $(".inventorypagination").append(`<a id="inventorynext">&raquo;</a>`);
   }
   
 
  $(".inventorypaginate").click(function(){
   $(".inventorypaginate").removeClass("active");
   $(this).addClass(" active");
   var index=$('.inventorypaginate').index(this);
   inventorypaginate=index+1;
   loadInventory(inventorypaginate,inventorypageSize);
  });
 
 
  $("#inventoryprev").click(function(){
    if(inventorypaginate<=1){
      inventorypaginate=last;
       page=document.getElementById("inventorypaginate"+inventorypaginate);
       page.click();
     }
     else{
       inventorypaginate-=1;
       page=document.getElementById("inventorypaginate"+inventorypaginate);
       page.click();
     }
   });
 
   $("#inventorynext").click(function(){
     if(inventorypaginate>=last){
       inventorypaginate=1;
       page=document.getElementById("inventorypaginate"+inventorypaginate);
       page.click();
     }
     else{
      inventorypaginate+=1;
      page=document.getElementById("inventorypaginate"+inventorypaginate);
      page.click();
    }
   });
   
    loadInventory(ps,inventorypageSize);
  // $(".inventorypaginate:second").addClass(" active");
}
 
async function loadInventory(pageNum,pageSize){
   $("#viewinventorybody").html("");
   $("#viewinventorybody").css({"display":"none"});
   $(".aisb").show();
   var data= await getInventory(pageNum, pageSize);
   if(data.error==false){
       if(data["data"].length>0){
         for(i=0;i<data["data"].length;i++){
           $("#viewinventorybody").append(`
           <tr id="allinventorycontent" class=content>
             <td>`+data.data[i].id+`</td>
             <td>`+data.data[i].name+`</td>
             <td>`+data.data[i].type+`</td>
             <td><span class="clickable controllers" onclick="minusquantity('`+data.data[i].id+"','"+data.data[i].name+"','"+data.data[i].function+"','"+data.data[i].type+"','"+data.data[i].quantity+"','"+data.data[i].unit+"','"+pageNum+`')">&minus;</span>`+data.data[i].quantity+`<span class="clickable controllers" onclick="plusquantity('`+data.data[i].id+"','"+data.data[i].name+"','"+data.data[i].function+"','"+data.data[i].type+"','"+data.data[i].quantity+"','"+data.data[i].unit+"','"+pageNum+`')">&plus;</span></td>
             <td>`+data.data[i].unit+`</td>
             <td>`+data.data[i].function+`</td>
             <td class="clickable" onclick="editinventory('`+data.data[i].id+"','"+data.data[i].name+"','"+data.data[i].function+"','"+data.data[i].type+"','"+data.data[i].quantity+"','"+data.data[i].unit+`')">Edit Inventory</td>
           </tr>
         `);  
         }
       }
       else{
         $("#AllInventory").html(`<div class="noappointment">Oops!.. No Item found in Inventory!</div>`);
       }
   }
   $("#viewinventorybody").ready(function(){
     $(".aisb").fadeOut(function(){
       $("#viewinventorybody").fadeIn();
     });
   });    
}


async function loadSearchResult(p,ps){
  searchpageSize=p;
  var searchpaginate=1;
  $(".inventory_search_result").html(`
    <table id="inventorySearchTable" class="table">
      <thead class="table_heading">
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Type</th>
          <th>Quantity</th>
          <th>Unit</th>
          <th>Function</th>
          <th>Action</th>
          </tr>
        </thead>
        <tbody id="viewinventorysearchbody" class="table_body">
        
        </tbody>
    </table>
    <div id="subloader" class="sisb" style="margin-left:25%;margin-top:10px;"></div>
    <div class="searchpagination paginationstyle"></div>
  `);
    searchval=$("#inventory_search_value").val();
    searchName= await getInventoryByName(1,1,searchval);
    searchType= await getInventoryByType(1,1,searchval);
    l=parseInt(searchName.length) + parseInt(searchType.length);
  if(l>searchpageSize){
    $(".searchpagination").append(`<a id="searchprev">&laquo;</a>`);
    last=Math.ceil(l/searchpageSize)
    for(i=1;i<=last;i++){
        if(i==ps){
           $(".searchpagination").append(`<a id="searchpaginate`+i+`"class="searchpaginate active">`+i+`</a>`);
        }
        else{
           $(".searchpagination").append(`<a id="searchpaginate`+i+`"class="searchpaginate">`+i+`</a>`);
        }
    }
    $(".searchpagination").append(`<a id="searchnext">&raquo;</a>`);
  }
  

 $(".searchpaginate").click(function(){
  $(".searchpaginate").removeClass("active");
  $(this).addClass(" active");
  var index=$('.searchpaginate').index(this);
  searchpaginate=index+1;
  loadSearch(searchpaginate,searchpageSize);
 });


 $("#searchprev").click(function(){
   if(searchpaginate<=1){
     searchpaginate=last;
      page=document.getElementById("searchpaginate"+searchpaginate);
      page.click();
    }
    else{
      searchpaginate-=1;
      page=document.getElementById("searchpaginate"+searchpaginate);
      page.click();
    }
  });

  $("#searchnext").click(function(){
    if(searchpaginate>=last){
      searchpaginate=1;
      page=document.getElementById("searchpaginate"+searchpaginate);
      page.click();
    }
    else{
     searchpaginate+=1;
     page=document.getElementById("searchpaginate"+searchpaginate);
     page.click();
   }
  });
  
   loadSearch(ps,searchpageSize);
 // $(".inventorypaginate:second").addClass(" active");
}

async function loadSearch(pageNum,pageSize){
  $("#viewinventorysearchbody").html("");
  $("#viewinventorysearchbody").css({"display":"none"});
  $(".sisb").show();
  searchval=$("#inventory_search_value").val();
  var data= await getInventoryByName(pageNum,pageSize,searchval);
  var data2= await getInventoryByType(pageNum,pageSize,searchval);

  if(data.error==false || data2.error==false){
      if(data["data"].length>0){
        for(i=0;i<data["data"].length;i++){
          $("#viewinventorysearchbody").append(`
          <tr id="searchinventorycontent" class=content>
            <td>`+data.data[i].id+`</td>
            <td><b>`+data.data[i].name+`</b></td>
            <td>`+data.data[i].type+`</td>
            <td><span class="clickable controllers" onclick="sminusquantity('`+data.data[i].id+"','"+data.data[i].name+"','"+data.data[i].function+"','"+data.data[i].type+"','"+data.data[i].quantity+"','"+data.data[i].unit+"','"+pageNum+`')">&minus;</span>`+data.data[i].quantity+`<span class="clickable controllers" onclick="splusquantity('`+data.data[i].id+"','"+data.data[i].name+"','"+data.data[i].function+"','"+data.data[i].type+"','"+data.data[i].quantity+"','"+data.data[i].unit+"','"+pageNum+`')">&plus;</span></td>
            <td>`+data.data[i].unit+`</td>
            <td>`+data.data[i].function+`</td>
            <td class="clickable" onclick="editinventory('`+data.data[i].id+"','"+data.data[i].name+"','"+data.data[i].function+"','"+data.data[i].type+"','"+data.data[i].quantity+"','"+data.data[i].unit+`')">Edit Inventory</td>
          </tr>
        `);  
        }
      }
      if(data2["data"].length>0){
        for(i=0;i<data2["data"].length;i++){
          $("#viewinventorysearchbody").append(`
          <tr id="searchinventorycontent" class=content>
            <td>`+data2.data[i].id+`</td>
            <td>`+data2.data[i].name+`</td>
            <td><b>`+data2.data[i].type+`</b></td>
            <td><span class="clickable controllers" onclick="sminusquantity('`+data2.data[i].id+"','"+data2.data[i].name+"','"+data2.data[i].function+"','"+data2.data[i].type+"','"+data2.data[i].quantity+"','"+data2.data[i].unit+"','"+pageNum+`')">&minus;</span>`+data2.data[i].quantity+`<span class="clickable controllers" onclick="splusquantity('`+data2.data[i].id+"','"+data2.data[i].name+"','"+data2.data[i].function+"','"+data2.data[i].type+"','"+data2.data[i].quantity+"','"+data2.data[i].unit+"','"+pageNum+`')">&plus;</span></td>
            <td>`+data2.data[i].unit+`</td>
            <td>`+data2.data[i].function+`</td>
            <td class="clickable" onclick="editinventory('`+data2.data[i].id+`')">Edit Inventory</td>
          </tr>
        `);  
        }
      }
      if(data.length<1 && data2.length<1){
        $(".inventory_search_result").html(`<div class="noappointment">Oops!.. Your item wasn't in the Inventory!</div>`);
      }
  }
  $("#viewinventorysearchbody").ready(function(){
    $(".sisb").fadeOut(function(){
      $("#viewinventorysearchbody").fadeIn();
    });
  });    
}

async function submitAddInventory(){
  $(".modal-dialog").removeClass("modal-xl");  
  $(window).scrollTop(0);
  $(".modal-header").html(`<h2>Inventory</h2>`);

  $(".modal-body").html(`
    <div>
      <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
    </div>
  `);
  document.getElementById("showModal").click();
  

  name=$("#inventoryname_input").val();
  type=$("#inventorytype_input").val();
  quantity=$("#inventoryquantity_input").val();
  unit=$("#inventoryunit_input").val();
  functio=$("#inventoryfunction_input").val();

  data= await addInventory(name,functio,type,quantity,unit);

  $(data).ready(function(){
    $(".spinner-border").fadeOut(function(){
      if(data["error"]==true){
        $(".modal-body").html(`
          <p>
            `+data["message"]+`
          </p>
        `);
        $(".modal-footer").html(`
          <button type="button" class="btn btn-block btn-danger" data-dismiss="modal">Close</button>
        `);
      }
      else if(data["error"]==false){
        $(".modal-body").html(`
          <h2 class="text-successful">
            Upload Successful
          </h2>
        `);
        $(".modal-footer").html(`
          <button type="button" class="btn btn-block btn-success closee" data-dismiss="modal">Continue</button>
        `);
        $(".closee").click(function(){
          loadAllInventory(psize,pnum);
        });
      }
      $("#inventoryname_input").val("");
      $("#inventorytype_input").val("");
      $("#inventoryquantity_input").val("");
      $("#inventoryunit_input").val("");
      $("#inventoryfunction_input").val("");
    });    
  });
}



 
async function editinventory(id,name,functio,type,quantit,unit){
  $(".modal-dialog").addClass("modal-xl");  
  $(window).scrollTop(0);
  $(".modal-header").html(`<h2>Inventory</h2>`);

  $(".modal-body").html(`
    <div>
      <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
    </div>
  `);
  document.getElementById("showModal").click();

  $(".spinner-border").fadeOut(1500,function(){
    $(".modal-body").html(`
        <div class="message_div">
            <form id="update_inventory_form" autocomplete="on" method="post">
    
            <label class="set_appointment_label" for="inventoryid">Item Id:</label><br/>
            <input type="text" class="set_appointment_input" id="uinventoryid_input" name="inventoryid" placeholder="Item Id" value="`+id+`" disabled required><br/><br/>

            <label class="set_appointment_label" for="inventoryname">Item Name:</label><br/>
            <input type="text" class="set_appointment_input" id="uinventoryname_input" name="inventoryname" placeholder="Name of Item" value="`+name+`" required><br/><br/>

            <label class="set_appointment_label" for="inventorytype">Item Type:</label><br/>
            <input type="text" class="set_appointment_input" id="uinventorytype_input" name="inventorytype" placeholder="Type of Item" value="`+type+`" list="inventorytype" required><br/><br/>
            <datalist id="inventorytype">
              <option value="Drug">
              <option value="Equipment">
              <option value="Facility">
            </datalist>

            <label class="set_appointment_label" for="inventoryquantity">Quantity:</label><br/>
            <input type="number" class="set_appointment_inputq" id="uinventoryquantity_input" name="inventoryquantity" placeholder="Quantity" value="`+quantit+`" required> <input type="text" class="set_appointment_inputq" id="uinventoryunit_input" name="inventoryquantity" placeholder="Unit" value="`+unit+`"><br/><br/>


            <label class="set_appointment_label" for="inventoryfunction">Function:</label><br/>
            <textarea class="set_appointment_input" id="uinventoryfunction_input" name="inventoryfunction" placeholder="What is the function of this item" required>`+functio+`</textarea><br/><br/>
 
            <input id="message_continue" class="btn btn-block btn-success" type="submit" value="Update"/><br/>
          </form>
        </div>
    `);
  $("#update_inventory_form").submit(async function(e){
    e.preventDefault();
    uname=$("#uinventoryname_input").val();
    utype=$("#uinventorytype_input").val();
    uquantity=$("#uinventoryquantity_input").val();
    uunit=$("#uinventoryunit_input").val();
    ufunctio=$("#uinventoryfunction_input").val();
    $(".modal-body").html(`
      <div>
        <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
      </div>
  `);
    $(".modal-dialog").removeClass("modal-xl");  
    data= await updateInventory(id,uname,ufunctio,utype,uquantity,uunit);
    $(data).ready(function(){
      $(".spinner-border").fadeOut(function(){
        if(data["error"]==true){
          $(".modal-body").html(`
            <p>
            `+data["message"]+`
            </p>
          `);
          $(".modal-footer").html(`
           <button type="button" class="btn btn-block btn-danger" data-dismiss="modal">Close</button>
          `);
        }
        else if(data["error"]==false){
          $(".modal-body").html(`
            <h2>Upload Successful!</h2>
          `);
          $(".modal-footer").html(`
           <button type="button" class="btn btn-block btn-success closee" data-dismiss="modal">Continue</button>
          `);
          $(".closee").click(function(){
            loadAllInventory(psize,pnum);
          });
        }
      });
    });

  });
});
$(".modal-footer").html(`
  <button type="button" class="btn btn-block btn-danger" data-dismiss="modal">Close</button>
`);

}

async function minusquantity(id,name,functio,type,quantit,unit,pageNum){
    quantity=parseInt(quantit)-1;
    data= await updateInventory(id,name,functio,type,quantity,unit);
    if(data.error==false){
        loadAllInventory(psize,pageNum);
    }
    else{
        alert("An error Occured! \nTry Again");
    }
}

async function plusquantity(id,name,functio,type,quantit,unit,pageNum){
    quantity=parseInt(quantit)+1;
    data= await updateInventory(id,name,functio,type,quantity,unit);
    if(data.error==false){
        loadAllInventory(psize,pageNum);
    }
    else{
        alert("An error Occured! \nTry Again");
    }
}

async function sminusquantity(id,name,functio,type,quantit,unit,pageNum){
  quantity=parseInt(quantit)-1;
  data= await updateInventory(id,name,functio,type,quantity,unit);
  if(data.error==false){
      loadAllInventory(psize,1);
      loadSearchResult(psize,pageNum);
  }
  else{
      alert("An error Occured! \nTry Again");
  }
}

async function splusquantity(id,name,functio,type,quantit,unit,pageNum){
  quantity=parseInt(quantit)+1;
  data= await updateInventory(id,name,functio,type,quantity,unit);
  if(data.error==false){
      loadAllInventory(psize,1);
      loadSearchResult(psize,pageNum);
  }
  else{
      alert("An error Occured! \nTry Again");
  }
}

function openInventoryTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("viewinventory_tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("viewinventory_tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }
