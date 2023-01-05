import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

export default function CustomRoute(props) {
    const player = props.player;
    
    if(player !== undefined && player !== null) {
       return <Route {...props} />
    }
    return <Redirect to='/' />
 }