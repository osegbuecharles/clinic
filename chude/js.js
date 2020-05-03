$(document).ready(function(){

    $("#form").submit(async function(e){
        e.preventDefault();
        var name= $("#nameinput").val();
        var result= await send(name);
        if(result.error==false){
            console.log(result)
            alert(result.name);
        }
    });
});

function send(name){
    param={
        name:name
    };
    return new Promise(resolve=>{
        $.post("api.php",param,function(data,status){
            resolve(data);
        });
    });
}