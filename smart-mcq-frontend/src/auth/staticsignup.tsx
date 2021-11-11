import * as React from 'react';
import GuestLayout from "../components/GuestLayout";

export default function StaticSignUp() {
  return (
    <GuestLayout title="Check Email">
    <div className= "staticSignUp">
    
       <h3> Thanks for signing up.
         Please check your email to complete the signup process. </h3>    
    </div>
    </GuestLayout>
  );
}