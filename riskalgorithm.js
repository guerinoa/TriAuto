

//Input variables
var age = 31;
var complaintCTAS = 5;
var complaintID = 401;

//Sensor Output
var bloodoxygen = 98;
var heartrate = 85;
var temp = 40;
var sysbloodpressure = 110;
var diabloodpressure = 80;

var SIRS = 0;

//Modifier Variables
var CTAS_BO;
var CTAS_temp;
var CTAS_HR;
var CTAS_BP;
var CTAS;

//Calculate risk level
exports.myRiskLevel = function(){
  //Check Vitals
  BOcheck(bloodoxygen);
  Tempcheck(temp, heartrate, complaintID);
  HRcheck(age, heartrate, complaintID);
  BPcheck(age,sysbloodpressure, diabloodpressure);

  //Calculate Risk Level
  CTAS = Math.min(complaintCTAS, CTAS_BO, CTAS_HR, CTAS_temp, CTAS_BP);

  return CTAS;
};

function BOcheck(bloodoxygen){
  //As defined by the CTAS guidelines
  if(bloodoxygen < 90){ //less than 90
    CTAS_BO = 1;
  } else if(bloodoxygen < 92){ //less than 92
    CTAS_BO = 2;
  } else if(bloodoxygen > 92 && bloodoxygen < 94){ //between 92 - 94
    CTAS_BO = 3;
  }else{
    CTAS_BO = 5;
  }
  return CTAS_BO;
};

function Tempcheck(){
  if(temp >= 38.5){ //High temperature
    SIRS = SIRS + 1;
    
      //Count SIRS Criteria
     if(heartrate >= 90){ //High Heart Rate
      SIRS = SIRS + 1;
     }

     if(complaintID >= 651 && complaintID <= 660){ //Respiratory Complaint
      SIRS = SIRS + 1;
     }

     //Assign CTAS Levels
     if(SIRS >= 3){ //3 SIRS Criteria
       CTAS_temp = 2;
     } else if(SIRS < 3 && SIRS >= 2){ //2 SIRS Criteria
       CTAS_temp = 3;
     } else if(SIRS < 2 && SIRS >= 1){ //1 SIRS Criteria
       CTAS_temp = 4;
     }

  } else{
    CTAS_temp = 5;
  }

  return CTAS_temp;
};

function HRcheck(age, heartrate, complaintID){
  //Define variables
  var HRaverage;
  var HRstdev;

  //Heart Rate Averages & standard deviation by age
  if(age >= 10 && age <= 19){
    HRaverage = 80;
    HRstdev = 10;
  } else if(age >= 20 && age <= 29){
    HRaverage = 79;
    HRstdev = 10;
  } else if(age >= 30 && age <= 39){
    HRaverage = 78;
    HRstdev = 7;
  } else if(age >= 40 && age <= 49){
    HRaverage = 78;
    HRstdev = 7;
  } else if(age >= 50 && age <= 59){
    HRaverage = 76;
    HRstdev = 9;
  } else if(age >= 60 && age <= 69){
    HRaverage = 77;
    HRstdev = 9;
  }else if(age >= 70 && age <= 79){
    HRaverage = 72;
    HRstdev = 9;
  }else if(age >= 80){
    HRaverage = 73;
    HRstdev = 10;
  };
  
  //Check if heart rate is out of range by 1 to 2 standard deviations
  if(heartrate >= HRaverage + (2 * HRstdev) || heartrate <= HRaverage - (2 * HRstdev)){
    //Check if complaint is respiratory
    if((complaintID >= 1 && complaintID <= 12) || complaintID == 401 || complaintID == 402 || complaintID == 408 || complaintID == 409){
      CTAS_HR = 1;
    } else{
      CTAS_HR = 2;
    }
  } else if((heartrate >= HRaverage + HRstdev && heartrate <= HRaverage + (2 * HRstdev)) || (heartrate <= HRaverage - HRstdev && heartrate >= HRaverage - (2 * HRstdev))){
    CTAS_HR = 3;
  } else{
    CTAS_HR = 5;
  };


  return HRaverage;

};

function BPcheck(){
  //Define variables
  var SYSBPaverage;
  var SYSBPstdev;
  var SYSDIaverage;
  var SYSDIstdev;

  //Blood pressure check
  if(sysbloodpressure >= 220 || diabloodpressure >= 130){
      if((complaintID >= 1 && complaintID <= 12) || complaintID == 401 || complaintID == 402 || complaintID == 408 || complaintID == 409){
        CTAS_BP = 2;
      } else{
        CTAS_BP = 3;
      }
  } else if((sysbloodpressure >= 200 && sysbloodpressure < 220)|| (diabloodpressure >= 110 && diabloodpressure < 130)){
      if((complaintID >= 1 && complaintID <= 12) || complaintID == 401 || complaintID == 402 || complaintID == 408 || complaintID == 409){
        CTAS_BP = 3;
      } else{
        CTAS_BP = 4;
      }
  } else{
    CTAS_BP = 5;
  };

  return CTAS_BP;
};