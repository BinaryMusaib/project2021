import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Forgot from './Forgot';
import Signup from './Signup';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch> 
        <Route path="/login" component={Login} />
        <Route path="/forgot" component={Forgot}/>
        <Route path="/signup" component={Signup}/>
        <Route path="*" component={Home}/>
      </Switch>
    </BrowserRouter>
  );
}
