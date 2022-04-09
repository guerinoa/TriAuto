export default function validateInfo(values){
    let errors = {}
    if(!values.username.trim()){
        errors.username="Username Required";
    }

    if(!values.email){
        errors.email="Email required";
    }

    if(!values.password){
        errors.password="Password required";
    }
    else if(values.password.length<6) {
        errors.password = "Password needs to be 6 characters or more";
    }

    
    if(!values.password2){
        errors.password2="Password is required";
    }    else if(values.password!==values.password) {
        errors.password2 = "Passwords do not match ";
    }
return errors; 
}