import React from 'react'
import './Button.css';
import { Link } from 'react-router-dom';
import Axios from "axios"; 






const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium','btn--large'];

export const Button =(  {children, type, onClick, onPress, buttonStyle, buttonSize}  ) => { 
        const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]; 
        const checkButtonSize = SIZES.includes (buttonSize) ? buttonSize : SIZES[0];

        return (
            
                <button
                 className={`btn ${checkButtonStyle} ${checkButtonSize}`}
                 onClick ={onClick} // make this equal to whatever it was passed as aparameter 
                 onPress = {onPress}
                 type = {type}
                >
                    {children}
                </button>
                
        )


};
export const Button1 =(  {children, type, onClick, buttonStyle, buttonSize}  ) => { 
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]; 
    const checkButtonSize = SIZES.includes (buttonSize) ? buttonSize : SIZES[0];

    return (
           <button
             className={`btn ${checkButtonStyle} ${checkButtonSize}`}
             onClick ={onClick} 
             type = {type}
            >

                {children}
            </button> 
    
    )




};
export const Button2 =(  {children, type, onClick, buttonStyle, buttonSize}  ) => { 
  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]; 
  const checkButtonSize = SIZES.includes (buttonSize) ? buttonSize : SIZES[0];

  return (
       <button
           className={`btn ${checkButtonStyle} ${checkButtonSize}`}
           onClick ={onClick} 
           type = {type}
          >

              {children}
          </button> 
  
  )




};



