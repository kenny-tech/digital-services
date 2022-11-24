import React from "react";

const Error = ({ message }) => {
    return (
        <>
            <li className="text-danger">{message}</li>
        </>
    );
}

export default Error;
