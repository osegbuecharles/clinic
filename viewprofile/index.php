<?php
require '../cloudinary/Cloudinary.php';
require '../cloudinary/Uploader.php';
require '../cloudinary/Helpers.php';
require '../cloudinary/Api.php';

\Cloudinary::config(array(
    "cloud_name" => "dqmatcjjd",
    "api_key" => "283948446355636",
    "api_secret" => "mowPmWz6Wp62n7Im46r1akieNK0"
));

    include_once "../crud/connect.php";
    if(isset($_POST["matricNo"]) && !empty($_FILES["displaypicture"])){
        $matricNo=$_POST["matricNo"];
        $target_dir="../uploads/displaypictures/";
        $target_file=$target_dir. basename($_FILES["displaypicture"]["name"]);
        $date=date("Y-M-d");
        $time=date("h:ia");
        $password=$_POST["password"];

        $query1="SELECT * FROM users WHERE matricNo='$matricNo';";      
        $query2="SELECT (displaypicture) FROM userdetails WHERE matricNo='$matricNo';";

        if($result1=mysqli_query($link,$query1)){
            $row=mysqli_fetch_array($result1,MYSQLI_ASSOC);
            if($password==$row["password"]){
                if($result2=mysqli_query($link,$query2)){
                    $row2=mysqli_fetch_array($result2,MYSQLI_ASSOC);
                    extract($row2);
                    $target_dir="../uploads/displaypictures/";
                    if($displaypicture!=NULL){
                        unlink($target_dir.$displaypicture);
                    }
                     //Select file type
                    $imageFileType= strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

                    $dp=date("YMd").date("hi")."_".$matricNo.".".$imageFileType;
                    //Valid file extension
                    $extensions_arr =array("jpg", "jpeg", "png", "gif");

                    //Check extension
                    if( in_array($imageFileType,$extensions_arr)){
                        //insert record
                        $query= "UPDATE userdetails SET displaypicture='$dp' WHERE matricNo='$matricNo'";
                        if (mysqli_query($link, $query)){
                            //Upload file
                            //\Cloudinary\Uploader::upload($target_file, array("public_id" => "03"));
                            
                            
                            move_uploaded_file($_FILES['displaypicture']['tmp_name'],$target_dir.$dp);
                        }
                        else{
                            echo "ERROR: Was not able to execute $new_product_query. " . mysqli_error($link);
                        }
                    }                    
                }
                else{
                    echo json_encode(mysqli_error($link));
                }
            }
            else{
                echo json_encode(array('error'=>TRUE,'message'=>'You are not authenticated to perform this operation'));
            }

        }
       
    }

?>

<script src="../js/viewprofile.js"></script>
<link rel="stylesheet" href="../css/viewprofile.css"/>


<div class="viewprofile_body container-fluid w-100 px-0">
    <div class="profile_header">
        
        <div class="matric" style="color:black;">
            
        </div>

        <div class="dp">
            <div class="image"></div>
            <div><div class="remove_dp">&times;</div></div>
            <div class="change_dp">Change</div>
        </div>
        
    </div>

    <div class="profile_body box_shadow container-fluid ml-2">
        
        <div id="profile_edit" class="profile_modify" >&#128393;</div><br/>
        <div id="profile_cancel" class="profile_modify">&times;</div><br/>


        <form autocompete="on" class="profile_form" method="post">

           <div id="profile_label_lastName"><span class="profile_label">Last Name:</span></div>
           <input type="text" max-length=25 id="profile_lastName" class="profile_input" placeholder="Last name" disabled/><br/>
           
           <span class="profile_label">First Name:</span><br/>
           <input type="text" max-length=25 id="profile_firstName" class="profile_input" placeholder="First name" disabled/><br/>
             
    
             <span class="profile_label">Email:</span><br/>
             <input type="text" max-length=50 id="profile_email" class="profile_input" placeholder="Email" disabled/><br/>

             <span class="profile_label">Gender:&nbsp;</span><span id="profile_gender"></span><br/><br/>
             
             <span class="profile_label">D.O.B:&nbsp;</span><span id="profile_dob"></span><br/><br/>

             <span class="profile_label">Phone:</span><br/>
             <input type="tel" max-length=14 id="profile_phone" class="profile_input" placeholder="Phone" disabled/><br/>

             <span class="profile_label">Address:</span><br/>
             <textarea type="text" max-length=25 id="profile_address" class="profile_input" placeholder="Address" disabled></textarea><br/>

             <input type="submit" value="Update" class="profile_submit"/>

        </form>
    </div>
    
</div>