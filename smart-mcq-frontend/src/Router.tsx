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
import QuestionList from "./questions/List";
import QuestionAddModify from "./questions/AddModify";
import QuestionPaperList from "./question-paper/List";
import QuestionPaperAddModify from "./question-paper/AddModify";
import ExamineeList from "./examinee-list/List";
import ExamineeListAddModify from "./examinee-list/AddModify";

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
                <Route path="/subjects" exact component={SubjectList} />

                <Route path="/subject/new" exact component={SubjectAddModify} />
                <Route path="/subject/:id" exact component={SubjectAddModify} />
                <Route path="/topics" exact component={TopicList} />
                <Route path="/topic/new" exact component={TopicAddModify} />
                <Route path="/topic/:id" exact component={TopicAddModify} />
                <Route
                    path="/topic/:topicId/question/new"
                    exact
                    component={QuestionAddModify}
                />
                <Route
                    path="/topic/:topicId/question/:id"
                    exact
                    component={QuestionAddModify}
                />
                <Route
                    path="/topic/:topicId/questions"
                    exact
                    component={QuestionList}
                />
                <Route
                    path="/question-papers"
                    exact
                    component={QuestionPaperList}
                />
                <Route
                    path="/question-paper/new"
                    exact
                    component={QuestionPaperAddModify}
                />
                 <Route
                    path="/question-paper/:id"
                    exact
                    component={QuestionPaperAddModify}
                />
                <Route
                    path="/examinee-lists"
                    exact
                    component={ExamineeList}
                />
                <Route
                    path="/examinee-list/new"
                    exact
                    component={ExamineeListAddModify}
                />
                 <Route
                    path="/examinee-list/:id"
                    exact
                    component={ExamineeListAddModify}
                />
                <Route path="*" component={Home} />
            </Switch>
        </BrowserRouter>
    );
}
