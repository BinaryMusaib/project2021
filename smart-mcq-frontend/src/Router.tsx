import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import SetPassword from "./auth/SetPassword";
import ForgotPassword from "./auth/ForgotPassword";
import Staticsignup from "./auth/staticsignup";
import Staticsetpassword from "./auth/staticsetpassword";
import Staticforgotpassword from "./auth/staticforgotpassword";

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
                <Route path='/set-password-confirmation' exact component={Staticsignup} />
                <Route path="/set-password-page" exact component={Staticsetpassword} />
                <Route path="/check-email-link" exact component={Staticforgotpassword} />
                <Route 
                    path="/set-password/:otp"
                    exact
                    component={SetPassword}
                />
                <Route
                    path="/forgot-password"
                    exact
                    component={ForgotPassword}
                />
                <Route path="/" component={Home} />
                
            </Switch>
        </BrowserRouter>
    );
}
