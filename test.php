<?php
echo md5("chiamaka");
$time="04:15pm";
$date="2020-03-19";
echo "date= ".date("Y-m-d")."      ".date("h:ia")."<br/>";
echo "time= ".$date."     ".$time."<br/>";
$valid="less";
if($date>date("Y-m-d")){
    $valid="greater1";
}
elseif($date==date("Y-m-d")){
    if( strtotime($time)>=strtotime(date("h:ia"))){
        $valid="greater2";
    }
}

echo $valid;

?>

<form method="post" action="https://augustineuniversity.edu.ng/ResultVerificationView">
<input name="matricno"/> <br/>
<input name="guiphone"/><br/>
<input name="academic_session"/><br/>
<input type="submit"/><br/>
</form>