import React from "react";
import { Link } from "react-router-dom";

export default function LinkTag({href, title}) {
    return (
        <>
            <Link to={href} className="defaultButton" >{title}</Link>
        </>
    );
}