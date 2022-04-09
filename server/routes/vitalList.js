const express = require("express");
const Router = express.Router();
const pool = require("../connection");

Router.get("/vital/:ohip", (req, res) => {
    const OHIP =  req.params.ohip
    pool.getConnection(function(err, connection) {
      if (err) throw err; 
  
      connection.query(`SELECT PatientBloodPressure, PatientBloodOxygen, PatientHeartRate, PatientTemperature FROM visitation_information WHERE OHIP ='${OHIP}'`, (err, rows, fields)=>{
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

  Router.post("/createvital",(req,res)=>{
    const OHIP = req.body.patientOhip
    pool.getConnection(function(err, connection){
        if (err) throw err;
    
        connection.query(`INSERT INTO visitation_information (OHIP,PatientBloodPressure, PatientBloodOxygen, PatientHeartRate, PatientTemperature, PatientRiskLevel) VALUES ('${OHIP}',0,0,0,0,0)`,
        (err,result) => {if (err) {console.log(err);} else {res.send("Values Inserted into Visitation_information")}}
        );
      })
    });

  Router.put("/vitalUpdate",(req,res)=>{
    const OHIP = req.body.ohipNum
    const PatientBloodPressure = req.body.vitalSigns.PatientBloodPressureSys + ',' + req.body.vitalSigns.PatientBloodPressureDia; 
    const PatientBloodOxygen = req.body.vitalSigns.PatientBloodOxygen;
    const PatientHeartRate = req.body.vitalSigns.PatientHeartRate;
    const PatientTemperature = req.body.vitalSigns.PatientTemperature

    pool.getConnection(function(err, connection){
        if (err) throw err;
    
        connection.query(`UPDATE visitation_information SET PatientBloodPressure = '${PatientBloodPressure}', PatientBloodOxygen = '${PatientBloodOxygen}',PatientHeartRate = '${PatientHeartRate}', PatientTemperature = '${PatientTemperature}' WHERE OHIP = '${OHIP}'`,(err,result)=> {
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
    
        connection.query(`UPDATE visitation_information SET PatientRiskLevel= '${PatientRiskLevel}' WHERE OHIP = '${OHIP}'`,(err,result)=> {
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
