import React from "react";

const RechargeNumber = ({ label, placeHolder }) => {
    return (
        <div class="form-group">
            <label for="phone">{label}</label>
            <input type="text" max={11} class="form-control" style={{width: '70%'}} id="phone" placeholder={placeHolder} />
        </div>
    )
}

export default RechargeNumber;
