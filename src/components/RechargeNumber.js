import React, { useState } from "react";

const RechargeNumber = ({ label, placeHolder }) => {

    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <div class="form-group">
            <label for="phone">{label}</label>
            <input type="text" max={11} class="form-control" style={{width: '70%'}} id="phone" placeholder={placeHolder} onChange={e => setPhoneNumber(e.target.value)} />
        </div>
    )
}

export default RechargeNumber;
