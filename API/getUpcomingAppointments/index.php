<?php
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Methods: GET");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    
    if(isset($_GET) && isset($_GET["matricNo"])){
        include "../../crud/connect.php";
        
        $matricNo=$_GET["matricNo"];
        $password=$_GET["password"];
        $date=date("Y-m-d");

        $pageNum=$_GET["pageNum"];
        $pageSize=$_GET["pageSize"];
        

        $resultarr=array();
        $resultarr["error"]="";
        $resultarr["length"]="";
        $resultarr["data"]=array();

        $query= "SELECT * FROM appointment WHERE date>'$date' ORDER BY date ASC;";
        $query1="SELECT * FROM users WHERE matricNo='$matricNo';";
        $query2="SELECT (`type`) FROM userdetails WHERE matricNo='$matricNo';";
        
        if($result1=mysqli_query($link,$query1)){
            $row=mysqli_fetch_array($result1,MYSQLI_ASSOC);
            if($password==$row["password"]){
                if($result2=mysqli_query($link,$query2)){
                    $row2=mysqli_fetch_array($result2,MYSQLI_ASSOC);
                    if($row2["type"]=="admin"){
                        if($result=mysqli_query($link,$query)){
                            $resultarr["error"]=FALSE;
                            $resultarr["length"]=mysqli_num_rows($result);
                            $count=0;
                            $dataCount=0;
                            if($pageNum==1){
                                $start=0;    
                            }
                            else{
                                $start=($pageNum-1)*$pageSize;
                            }
                            while($row1=mysqli_fetch_array($result)){
                                if($dataCount>=$start){
                                    if($count<$pageSize){
                                        extract($row1);
                                        $reply=array(
                                            "id"=>$id,
                                           "matricNo"=>$matricNo,
                                           "reason"=>$reason,
                                           "date"=>$date,
                                           "time"=>$time,
                                           "status"=>$status
                                        );
                                        array_push($resultarr["data"],$reply);
                                        $count++;
                                    }  
                                } 
                                $dataCount++;  
                            }
                            echo json_encode($resultarr);
                        }
                        else{
                        echo json_encode(mysqli_error($link));
                        }
                    }
                    else{
                        echo json_encode(array("error"=>TRUE,"message"=>"You are not an admin user"));
                    }
                }
                else{
                    echo json_encode(array("error"=>TRUE,"message"=>"Could not get type"));
                }
            }
            else{
                echo json_encode(array('error'=>TRUE,'message'=>'You are not authenticated to perform this operation'));
            }

        }
        else{
            echo json_encode(array('error'=>TRUE,'message'=>'User does not exist'));
        }
    }
    else{
        echo json_encode(array('error'=>TRUE,'message'=>'Not a GET request'));
    }

?>