import GuestLayout from "./components/GuestLayout";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import { SignupData } from "./signup-data.dto";
import { authenticate } from "./signup.service";

function initSignupData(): SignupData {
  return {
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirm_password: "",
  };
}

export default function Signup() {
  const [signupData, setSignupData] = React.useState<SignupData>(initSignupData());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authenticate(signupData)
        .then(() => {
          alert('You have registered successfully');
        })
        .catch(() => alert('Registration Failed'));
    
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;

    function changeSignupData(data: SignupData) {
      return ({ ...data, [key]: e.target.value });
    }
    setSignupData(changeSignupData);
  };

  return (
    <GuestLayout title="Sign Up">
      <form onSubmit={handleSubmit}>
      <div>
          <TextField
            name="fname"
            type="text"
            label="First Name"
            variant="filled"
            fullWidth
            value={signupData.fname}
            onChange={handleChange}
          />
           <TextField
            name="lname"
            type="text"
            label="Last Name"
            variant="filled"
            fullWidth
            value={signupData.lname}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <TextField
            name="email"
            type="email"
            label="Email"
            variant="filled"
            fullWidth
            value={signupData.email}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-control">
          <TextField
            name="password"
            type="password"
            label="Password"
            variant="filled"
            fullWidth
            value={signupData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <TextField
            name="confirm_password"
            type="password"
            label="Confirm Password"
            variant="filled"
            fullWidth
            value={signupData.confirm_password}
            onChange={handleChange}
          />
        </div>
        <div className="button-panel">
          <Button variant="contained" type="submit">
            Register
          </Button>
        </div>
      </form>
    </GuestLayout>
    
  );
}
