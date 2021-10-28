import GuestLayout from "./components/GuestLayout";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import { LoginData } from "./login-data.dto";
import { authenticate } from "./login.service";
import { Link } from "react-router-dom";

function initLoginData(): LoginData {
  return {
    email: "",
    password: "",
  };
}

export default function Login() {
  const [loginData, setLoginData] = React.useState<LoginData>(initLoginData());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authenticate(loginData)
      .then(() => alert("Your login was successful"))
      .catch(() => alert("Unsuccessful login"));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;

    function changeLoginData(data: LoginData) {
      return { ...data, [key]: e.target.value };
    }
    setLoginData(changeLoginData);
  };

  return (
    <GuestLayout title="Login">
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

        <div className="form-control">
          <TextField
            name="password"
            type="password"
            label="Password"
            variant="filled"
            fullWidth
            value={loginData.password}
            onChange={handleChange}
          />
        </div>
        <div className="button-panel">
          <div className="button-signin">
            <Button variant="contained" type="submit">
              Login
            </Button>
          </div>
          <div className="button-signup">
            <Button variant="contained" color="success" href="./signup">
              Sign Up
            </Button>
          </div>
        </div>
        <div className="forgot">
          <p>
            <Link to="/forgot">Forgot Password</Link>
          </p>
        </div>
      </form>
    </GuestLayout>
  );
}
