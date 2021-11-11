import * as React from 'react';
import GuestLayout from "../components/GuestLayout";
import Button from "@mui/material/Button";
export default function StaticSetPassword() {
  return (
    <GuestLayout title="SignUp Completed">
    <div className= "staticSetPassword">
    
       <h3> Your password has been set. 
           Please click the button below to login with your new password. </h3>
      
    <div className = "loginbutton">
        <Button variant="contained" type="submit" href="./login">  
                    Login
         </Button>
    </div>
    </div>
    </GuestLayout>
    
  );
}