import { useEffect, useState } from "react";

// https://github.com/img-mapper/react-img-mapper
import ImageMapper from "react-img-mapper";
import { MAP } from "./AreaData";
import CardItem from "./CardItem";
import Button from '@mui/material/Button';
import { Head, Neck, Chest, Abdominal, HipGroin, LegFoot } from './BodyData';
import image from './humanbody.jpg'


export default function ImageMap(props) {
  const areas = MAP
  const [hoveredArea, setHoveredArea] = useState(null);
  const [areaClicked, setAreaClicked] = useState('');

  const handleMouseEnterArea = (area, index, event) => {
    setHoveredArea(area);
    console.log(area.title)
  };
  const handleMouseLeaveArea = (area, index, event) => {
    setHoveredArea(null);
  };
  console.log(props.patientComplaint)
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
      {areaClicked === 'Head' && <CardItem area = {Head}  patientComplaint = {props.patientComplaint} setChangeMade = {props.setChangeMade} />}
      {areaClicked === 'Neck' && <CardItem area = {Neck}   patientComplaint = {props.patientComplaint} setChangeMade = {props.setChangeMade} />}
      {areaClicked === 'Chest' && <CardItem area = {Chest}  patientComplaint = {props.patientComplaint} setChangeMade = {props.setChangeMade} />}
      {areaClicked === 'Abdominal' && <CardItem area = {Abdominal }patientComplaint = {props.patientComplaint} setChangeMade = {props.setChangeMade} />}
      {areaClicked === 'HipGroin' && <CardItem area = {HipGroin}  patientComplaint = {props.patientComplaint} setChangeMade = {props.setChangeMade} />}
      {areaClicked === 'LegFoot' && <CardItem area = {LegFoot}  patientComplaint = {props.patientComplaint} setChangeMade = {props.setChangeMade} />}
   
    </div>  
  );
}
