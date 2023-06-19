import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

export default function ReportRoute(props) {
    const report = props.report;
    //const player = props.player;
   
    return <Route {...props} />
    /*if(/*player !== undefined && player !== null && report !== undefined && report !== null ) {
       
    }
    return <Redirect to='/' /> */
 }