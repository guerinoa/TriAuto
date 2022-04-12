import React from 'react'
import useForm from './useForm'
import validate from './validateInfo';
import './Form.css'

const FormSignUp = (submitForm) => {
    const {handleChange,values,handleSubmit, errors}=useForm(submitForm, validate);
    return (
        <div className = "form-content-right">
            
                <form  className="form" onSubmit={handleSubmit}>
                        <h1>Welcome, get started with Triage by filling out the information below.</h1>
                        <div className="form-inputs">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input 
                                        id = "username"
                                        type="text"
                                         name = "username" 
                                         className="form-input" 
                                         placeholder = "Enter your Name "
                                         value={values.username}
                                         onChange={handleChange}
                                          
                                         />
                                       
                        </div>

                        <div className="form-inputs">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input 
                                        id = "email "
                                        type="email"
                                         name = "email" 
                                         className="form-input" 
                                         placeholder = "Enter your email"
                                         value={values.email}
                                         onChange={handleChange}
                                         
                                         />
                                          {errors.email && <p> {errors.email} </p>}
                        </div>
                        
                        <div className="form-inputs">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input 
                                        id = "password "
                                        type="password"
                                         name = "password" 
                                         className="form-input" 
                                         placeholder = "Enter your password"
                                         value={values.password}
                                         onChange={handleChange}
                                         
                                         />{errors.password && <p> {errors.password} </p>}
                        </div>

                        <div className="form-inputs">
                                <label htmlFor="password2" className="form-label">
                                    Please confirm your password
                                </label>
                                <input 
                                        id = "password2 "
                                        type="password"
                                         name = "password2" 
                                         className="form-input" 
                                         placeholder = "Re-Enter your password"
                                         value={values.password2}
                                         onChange={handleChange}
                                         
                                         />{errors.password2 && <p> {errors.password2} </p>}
                        </div>
                        <div className="form-inputs">
                                <label htmlFor="password2" className="form-label">
                                    Date of Birth 
                                </label>
                                <input 
                                        id = "password2 "
                                        type="password"
                                         name = "password2" 
                                         className="form-input" 
                                         placeholder = "May/20/1896"
                                         value={values.password2}
                                         onChange={handleChange}
                                         
                                         />{errors.password2 && <p> {errors.password2} </p>}
                        </div>
                        <div className="form-inputs">
                                <label htmlFor="password2" className="form-label">
                                    Please enter your chief complaint
                                </label>
                                <input 
                                        id = "password2 "
                                        type="password"
                                         name = "password2" 
                                         className="textarea" 
                                         placeholder = "I have a sore throat, and a burning headache..."
                                         value={values.password2}
                                         onChange={handleChange}
                                         
                                         />
                        </div>
          
                        <button className="form-input-btn"
                        type = "submit">

                            Sign Up
                        </button>
                        <span className='form-input-login'>
                                Already have an account? Login <a href="#"> Here</a>
                        </span>
                </form>
        </div>
    )
}

export default FormSignUp
