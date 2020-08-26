import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';



export default class LegendaryObject extends Component {
    render() {
        return(
            <div className="lego">
            <div style={{height: "15%", borderWidth: "0 0 2px 0", borderStyle: "solid", borderColor: "black"}}>
                <p style={{fontSize: "16px", margin: "1px", marginLeft: "auto", marginRight: "auto", textAlign: "center", fontWeight: "bold"}}>{this.props.name}</p>
            </div>
            <div style={{height: "40%", borderWidth: "0 0 2px 0", borderStyle: "solid", borderColor: "black"}}>
                <p>Legendary Info</p>

            </div>
            <div>
                <p style={{fontSize: "16px", margin: "1px", marginLeft: "auto", marginRight: "auto", textAlign: "center", fontWeight: "bold"}}>Expected HPS: {this.props.hps}</p>
            </div>
        </div>



        )
    }


}