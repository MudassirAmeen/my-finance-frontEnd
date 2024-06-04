import React from "react";
import { Helmet } from "react-helmet";
import welcome from "../welcome.svg";
import Button from "../my_components/LinkTag";
import { Link } from "react-router-dom";

export default function Splash() {
    return (
        <div className="mainContent">
            <Helmet>
                <title>My Finance - Splash</title>
            </Helmet>
            <div className="content">
                <h1>Welcome to My Finance App</h1>
                <div className="firstImage">
                    <img src={welcome} alt="Welcome" width="390px" height="329" />
                </div>
                <p className="pageDescription">Start managing your money with ease and also keep track of your expenses. This is easy to use app. Just click on "Get Started" to register and start using the app.</p>
                <Button title="Get Started" href="/register" />
            </div>
        </div>
    );
}