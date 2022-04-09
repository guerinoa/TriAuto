const express = require("express");
const Router = express.Router();
const pool = require("../connection");
var status = 0
var frontEndSignal = 1
var visit = null


// Gets data collection signal from front end
Router.post('/collection', (req, res) => {
    visit = req.body.visitID;
    status = 1;
    
});

// Gets data collection signal from MCU
Router.post('/beginCollection', (req, res) => {
  // Sets frontEndSignal to 1
  frontEndSignal = 1
});

// Front end makes continuos get request to check if there is a start
Router.get('/beginCollectionFront', (req, res) => {
  if (frontEndSignal == 1) {
      // Good to go
      res.send('1')
  }
  else {
      //Wait
      res.send('0')
  }
});

Router.get("/vital/:ohip", (req, res) => {
    const OHIP =  req.params.ohip
    pool.getConnection(function(err, connection) {
      if (err) throw err; 
  
      connection.query(`SELECT PatientBloodPressure, PatientBloodOxygen, PatientHeartRate, PatientTemperature FROM visitation_information WHERE OHIP ='${OHIP}' ORDER BY arrivaldate DESC LIMIT 1`, (err, rows, fields)=>{
        if (!err){ 
          res.send(rows);
          connection.release();
        }
        else { 
          console.log(err); 
        }
      })
    });
  });

  // Router.post("/createvital",(req,res)=>{
  //   const OHIP = req.body.patientOhip
  //   pool.getConnection(function(err, connection){
  //       if (err) throw err;
    
  //       connection.query(`INSERT INTO visitation_information (OHIP,PatientBloodPressure, PatientBloodOxygen, PatientHeartRate, PatientTemperature, PatientRiskLevel) VALUES ('${OHIP}',0,0,0,0,0)`,
  //       (err,result) => {if (err) {console.log(err);} else {res.send("Values Inserted into Visitation_information")}}
  //       );
  //     })
  //   });

  Router.put("/vitalUpdate",(req,res)=>{
    const OHIP = req.body.ohipNum
    const PatientBloodPressure = req.body.vitalSigns.PatientBloodPressureSys + ',' + req.body.vitalSigns.PatientBloodPressureDia; 
    const PatientHeartRate = req.body.vitalSigns.PatientHeartRate;

    pool.getConnection(function(err, connection){
        if (err) throw err;
    
        connection.query(`UPDATE visitation_information AS v1, (SELECT visitid FROM visitation_information WHERE ohip = '${OHIP}' ORDER BY arrivaldate DESC LIMIT 1) AS v2
         SET PatientBloodPressure = '${PatientBloodPressure}', PatientHeartRate = '${PatientHeartRate}' WHERE v1.visitid = v2.visitid`,(err,result)=> {
            if (err) {console.log(err);} 
            else {
                res.send(result)
                console.log("vital signs updated")
            }} );
      })
});

Router.put("/riskLevelUpdate",(req,res)=>{
    const OHIP = req.body.OHIP
    const PatientRiskLevel = req.body.RiskLevel 

    pool.getConnection(function(err, connection){
        if (err) throw err;
    
        connection.query(`UPDATE visitation_information AS v1, (SELECT visitid FROM visitation_information WHERE ohip = '${OHIP}' ORDER BY arrivaldate DESC LIMIT 1) AS v2
         SET PatientRiskLevel= '${PatientRiskLevel}' WHERE v1.visitid = v2.visitid)`,(err,result)=> {
            if (err) {console.log(err);} 
            else {
                res.send(result)
                console.log("risk Level updated")
            }} );
      })
});

/*
Router.get("/details/:patient", (req, res) => {
    var ohip = req.params.patient;
    var sql = "SELECT patient_profile.ohip AS ohip, firstname, lastname, patientsex, patientdob, PatientPhoneNumber, PatientAddress, PatientEmail, PatientHeight, PatientWeight, PatientAllergies, PatientMedication, PatientExistingConditions, PatientBloodPressure, PatientBloodOxygen, PatientHeartRate, PatientTemperature, PatientRiskLevel, approval, ChiefComplaint, PatientComplaint,PatientPainLevel, PatientSymptomList, arrivaldate FROM patient_profile JOIN visitation_information ON patient_profile.ohip = visitation_information.ohip JOIN patient_complaint ON patient_complaint.ohip = visitation_information.ohip HAVING ohip='"+ohip+"' ORDER BY arrivaldate DESC LIMIT 1";
  
    pool.getConnection(function(err, connection){
      if (err) throw err;
  
      connection.query(sql, (err, rows, fields)=>{
        if (!err){
           res.send(rows);
           connection.release();
          }
        else { 
          console.log(err); 
        }
      })
    })
  });
  
Router.post('/approval', (req, res) => {
    let approvedRisk = req.body.risk;
    let ohip = req.body.ohip;
    let sql = "UPDATE visitation_information SET approval='True', patientrisklevel='" + approvedRisk + "' WHERE ohip='" + ohip + "' ORDER BY visitid DESC LIMIT 1;"
    
    pool.getConnection(function(err, connection){
      if (err) throw err;
  
      connection.query(sql, (err, rows, fields)=>{
        if (!err){
           res.send(rows);
           connection.release();
          }
        else { 
          console.log(err); 
        }
      })
    })
    
  }); */

  module.exports=Router;
