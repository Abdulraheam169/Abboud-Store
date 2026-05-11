import React from "react";
import { Link } from "react-router";

export default function Home(){

    return <>
        <h1>Hi There, This is Abdulraheam's Fake Store!</h1>
        <h2>Please Be Comfort, We Don't Want Your Money</h2>
        <div>Do You Want To Take A look ? Go <Link to='products'>Here</Link></div>
    
    </>

}