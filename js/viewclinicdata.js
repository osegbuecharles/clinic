$(document).ready(async function(){
    var clinic= await getClinicData();
    if(clinic.error==true){
      $(".noclinicdata").show();
      $(".noclinicdata p").html(clinic.message);
    }
    else{
      $(".clinicdata").show();
      $(".bloodgroup").html(`<span class="bloodgroup_label clinicdata_label">BloodGroup: </span>`+clinic.data.bloodgroup);
      $(".genotype").html(`<span class="genotype_label clinicdata_label">Genotype: </span>`+clinic.data.genotype);
      $(".pmc").html(`<span class="pmc_label clinicdata_label">Pre-existing Medical Conditions: </span>`+clinic.data.pmc);
      $(".height").html(`<span class="height_label clinicdata_label">Height: </span>`+clinic.data.height+`cm`);
      $(".weight").html(`<span class="weight_label clinicdata_label">Weight: </span>`+clinic.data.weight+`kg`);
      $(".allergies").html(`<span class="allergiesgroup_label clinicdata_label">Allergies: </span>`+clinic.data.allergies);
      $(".surgeries").html(`<span class="surgeriesgroup_label clinicdata_label">Surgeries: </span>`+clinic.data.surgeries);
      if(clinic.data.bmi<19){
        $(".bmi").html(`<span class="bmi_label clinicdata_label">BodyMassIndex(BMI): </span><span class="bmi_data" style="color:rgb(13, 163, 223)">`+clinic.data.bmi+`(Underweight)</span`);
      }
      if(clinic.data.bmi>=19 && clinic.data.bmi<25){
        $(".bmi").html(`<span class="bmi_label clinicdata_label">BodyMassIndex(BMI): </span><span class="bmi_data" style="color:lime">`+clinic.data.bmi+`(Healthy)</span`);
      }
      if(clinic.data.bmi>=25 && clinic.data.bmi<30){
        $(".bmi").html(`<span class="bmi_label clinicdata_label">BodyMassIndex(BMI): </span><span class="bmi_data" style="color:yellow">`+clinic.data.bmi+`(Overweight)</span`);
      }
      if(clinic.data.bmi>=30 && clinic.data.bmi<40){
        $(".bmi").html(`<span class="bmi_label clinicdata_label">BodyMassIndex(BMI): </span><span class="bmi_data" style="color:orangered">`+clinic.data.bmi+`(Obese)</span`);
      }
      if(clinic.data.bmi>=40){
        $(".bmi").html(`<span class="bmi_label clinicdata_label">BodyMassIndex(BMI): </span><span class="bmi_data" style="color:red">`+clinic.data.bmi+`(Extremely Obese)</span`);
      }
      $(".bmi_range").val(clinic.data.bmi);
    }
});



function getClinicData(){
    param={
      matricNo:sessionStorage.getItem("username"),
      password:sessionStorage.getItem("password")
    };
    return new Promise(resolve => {
      $.get("../API/getClinicData",param, function(data, status){
        resolve(data);
      });
    });
}