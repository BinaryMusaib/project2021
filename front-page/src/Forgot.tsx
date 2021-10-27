import React from "react";
import GuestLayout from "./components/GuestLayout";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { LoginData } from "./login-data.dto";
import axios from 'axios';

function initLoginData(): LoginData {
  return {
    email: "",
    password: "",
  };
}


export default function Forgot(){
  const [loginData, setLoginData] = React.useState<LoginData>(initLoginData());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('forgot').then(
      res => {
        console.log(res);
      }
    ).catch(
      err => {
        console.log(err);
      }
    )
  };

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const key = e.target.name;

  function changeLoginData(data: LoginData) {
    return ({ ...data,[key]: e.target.value });
  }
  setLoginData(changeLoginData);
};




return (
    <GuestLayout title="Forgot Password">
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <TextField
            name="email"
            type="email"
            label="Email"
            variant="filled"
            fullWidth
            value={loginData.email}
            onChange={handleChange}
          />
        </div>
        
        <div className="button-panel">
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </GuestLayout>    
  );
}