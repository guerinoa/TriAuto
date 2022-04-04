import { useEffect, useState } from "react";

// https://github.com/img-mapper/react-img-mapper
import ImageMapper from "react-img-mapper";
import { MAP } from "./AreaData";
import CardItem from "./CardItem";
import Button from '@mui/material/Button';
import { Head, Neck, Chest, Abdominal, HipGroin, LegFoot } from './BodyData';
import image from './humanbody.jpg'
import { useLocation } from 'react-router-dom';
import humansvg1 from '../../img/Cards/humansvg1.svg';
import './imagemap.css';

export default function ImageMap(props) {
  const areas = MAP
  const [hoveredArea, setHoveredArea] = useState(null);
  const [areaClicked, setAreaClicked] = useState('');
  const location = useLocation()
  const patientComplaint = location.state.patientComplaint
  const [fillcolor,setColor]= useState(location.state.fillcolor)
  const fillcolors = ['#eab54d4d','#00ff194c']

  useEffect(() => {
    setColor('#eab54d4d')
  }, [])

  const handleMouseEnterArea = (area, index, event) => {
    setColor('#eab54d4d')
    setHoveredArea(area);
    console.log(area.title)
    console.log(area)
  };
  const handleMouseLeaveArea = (area, index, event) => {
    setHoveredArea(null);
  };
  console.log(patientComplaint)
  const handleAreaClick = (area, index, event) => {
    setAreaClicked(area.title)
  };

  return (
    <>
        {areaClicked === '' && 
        <> 
        <div className = "image" >
         <ImageMapper
            src={image}
            map={{
              name: "asdf",
              areas: areas
            }}
            stayMultiHighlighted
            fillColor= {fillcolor}
            onMouseEnter={handleMouseEnterArea}
            onMouseLeave={handleMouseLeaveArea}
            onClick={handleAreaClick}
          />
            <Button  variant = "contained">Non Body Part </Button> 
            </div>
      </>
       }
    <div style = {{display:'flex', height: '90vh',flexDirection:'row',  alignItems:'center',justifyContent:'center',backgroundColor :'White'}}> 
     
      {areaClicked === 'Head' && <CardItem area = {Head}  patientComplaint = {patientComplaint}  />}
      {areaClicked === 'Neck' && <CardItem area = {Neck}   patientComplaint = {patientComplaint} />}
      {areaClicked === 'Chest' && <CardItem area = {Chest}  patientComplaint = {patientComplaint}  />}
      {areaClicked === 'Abdominal' && <CardItem area = {Abdominal }patientComplaint = {patientComplaint}  />}
      {areaClicked === 'HipGroin' && <CardItem area = {HipGroin}  patientComplaint = {patientComplaint}  />}
      {areaClicked === 'LegFoot' && <CardItem area = {LegFoot}  patientComplaint = {patientComplaint}  />}
   
    </div>  
    </>
  );
}
