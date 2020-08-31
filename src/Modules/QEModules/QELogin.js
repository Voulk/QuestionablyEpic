
import React, { Component } from "react";
import QEHeader from "./QEHeader";
import Button from "@material-ui/core/Button";
import { Redirect, useHistory, useLocation } from "react-router-dom";

export function QELogin(props) {

    let history = useHistory()

    const outerDivStyle = {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
        width: '40%',
    } 

    const innerDivStyle = {
        
        display: 'block',
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
        //backgroundColor: 'purple',
        display: 'flex',
        justifyContent: 'center',
    } 

    const btnStyle = {
        display: 'inline-block',
        margin: '0px',
        marginTop: '12px',
        marginRight: '20px',
        marginLeft: '20px',
    }

    function handleClick(region) {
        props.setRegion(region)    
        history.push("/attemptlogin")

    }

    return(
        <div>
        <QEHeader />
        <div style={outerDivStyle}>
            
            <img src="https://bnetcmsus-a.akamaihd.net/cms/blog_header/ws/WS6KBZEZAFTA1502739438225.jpg" />
            <div style={innerDivStyle}>
                <Button variant="contained" color="primary" style={btnStyle} onClick={() => handleClick('us')}>US</Button>
                <Button variant="contained" color="primary" style={btnStyle} onClick={() => handleClick('eu')}>EU</Button>
                <Button variant="contained" color="primary" style={btnStyle} onClick={() => handleClick('apac')}>APAC</Button>
                <Button variant="contained" color="primary" style={btnStyle} onClick={() => handleClick('cn')}>CN</Button>
            </div>

        </div>
        </div>
    );

}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export function ConfirmLogin(props) { 
    let query = useQuery()
    fetch('https://questionablyepic.com/getTok.php?code=' + query.get("code"))
        .then(res => res.json())
        .then(
            (result) => {
                alert("Success") 
            },
            (error) => {
                alert("Error: " + error.message + ".")
            }
        );


    return (
        <div>
            <QEHeader />
            <p>{query.get("code")}</p>
        </div>
    )

}
