import React from "react";

const Phone = () => {
    return (
        <div class="form-group">
            <label for="phone">Phone Number</label>
            <input type="text" max={11} class="form-control" style={{width: '80%'}} id="phone" placeholder="Enter your Phone Number" />
        </div>
    )
}

export default Phone;
