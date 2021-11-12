import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import SetPassword from "./auth/SetPassword";
import ForgotPassword from "./auth/ForgotPassword";
import SignupConfirmation from "./auth/static/SignupConfirmation";
import SetPasswordConfirmation from "./auth/static/SetPasswordConfirmation";
import ForgotPasswordConfirmation from "./auth/static/ForgotPasswordConfirmation";

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
                <Route
                    path="/set-password-confirmation"
                    exact
                    component={SignupConfirmation}
                />
                <Route
                    path="/set-password-page"
                    exact
                    component={SetPasswordConfirmation}
                />
                <Route
                    path="/check-email-link"
                    exact
                    component={ForgotPasswordConfirmation}
                />
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
