import { useEffect, useState } from "react";

// https://github.com/img-mapper/react-img-mapper
import ImageMapper from "react-img-mapper";
import { MAP } from "./AreaData";
import CardItem from "./CardItem";
import Button from '@mui/material/Button';
import { Head, Neck, Chest, Abdominal, HipGroin, LegFoot } from './BodyData';
import image from './humanbody.jpg'
import { useLocation } from 'react-router-dom';

export default function ImageMap(props) {
  const areas = MAP
  const [hoveredArea, setHoveredArea] = useState(null);
  const [areaClicked, setAreaClicked] = useState('');
  const location = useLocation()
  const patientComplaint = location.state.patientComplaint

  console.log("imagemap")
  const handleMouseEnterArea = (area, index, event) => {
    setHoveredArea(area);
    console.log(area.title)
  };
  const handleMouseLeaveArea = (area, index, event) => {
    setHoveredArea(null);
  };
  console.log(patientComplaint)
  const handleAreaClick = (area, index, event) => {
    setAreaClicked(area.title)
  };
  return (
    
    <div style = {{display:'flex', height: '90vh',flexDirection:'row',  alignItems:'center',justifyContent:'center',backgroundColor :'White'}}> 
    {areaClicked === '' && 
    <div  > 
        <div style={{display:'flex', alignItems:'center'}} > 
          <ImageMapper
            src={image}
            map={{
              name: "asdf",
              areas: areas
            }}
            stayMultiHighlighted
            onMouseEnter={handleMouseEnterArea}
            onMouseLeave={handleMouseLeaveArea}
            onClick={handleAreaClick}
           
          />

      <Button variant = "contained">Non Body Part </Button> 
      </div>
      </div>
     } 
      {areaClicked === 'Head' && <CardItem area = {Head}  patientComplaint = {patientComplaint}  />}
      {areaClicked === 'Neck' && <CardItem area = {Neck}   patientComplaint = {patientComplaint} />}
      {areaClicked === 'Chest' && <CardItem area = {Chest}  patientComplaint = {patientComplaint}  />}
      {areaClicked === 'Abdominal' && <CardItem area = {Abdominal }patientComplaint = {patientComplaint}  />}
      {areaClicked === 'HipGroin' && <CardItem area = {HipGroin}  patientComplaint = {patientComplaint}  />}
      {areaClicked === 'LegFoot' && <CardItem area = {LegFoot}  patientComplaint = {patientComplaint}  />}
   
    </div>  
  );
}
