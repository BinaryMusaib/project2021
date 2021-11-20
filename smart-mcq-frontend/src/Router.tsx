import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import SetPassword from "./auth/SetPassword";
import ForgotPassword from "./auth/ForgotPassword";
import SignupConfirmation from "./auth/static/SignupConfirmation";
import SetPasswordConfirmation from "./auth/static/SetPasswordConfirmation";
import ForgotPasswordConfirmation from "./auth/static/ForgotPasswordConfirmation";
import SubjectList from "./questions/subject/List";
import SubjectAddModify from "./questions/subject/AddModify";
import TopicList from "./questions/topic/List";
import TopicAddModify from "./questions/topic/AddModify";

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
                <Route
                    path="/questions/subjects"
                    exact
                    component={SubjectList}
                />

                <Route
                    path="/questions/subject/new"
                    exact
                    component={SubjectAddModify}
                />
                <Route
                    path="/questions/subject/:id"
                    exact
                    component={SubjectAddModify}
                />
                <Route path="/questions/topics" exact component={TopicList} />
                <Route
                    path="/questions/topic/new"
                    exact
                    component={TopicAddModify}
                />
                <Route
                    path="/questions/topic/:id"
                    exact
                    component={TopicAddModify}
                />
                <Route path="*" component={Home} />
            </Switch>
        </BrowserRouter>
    );
}
