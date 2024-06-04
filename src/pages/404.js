import React from "react";
import { Helmet } from "react-helmet";
import NotFound404 from "../404.svg";

export default function PageNotFound() {
    return (
        <div className="mainContent">
            <Helmet>
                <title>My Finance - 404</title>
            </Helmet>
            <div className="content">
                <div className="firstImage">
                    <img src={NotFound404} alt="404" width="390px" height="329" />
                </div>
                <h1>404 - Page Not Found</h1>
            </div>
        </div>
    );
}