import React from "react";

const InfoBox = ({ title, content }) => {
    return (
        <div className="col-md-4">
             <div class="card" style={{width: '18rem'}}>
                <div class="card-body">
                    <h5 class="card-title">{title}</h5>
                    <p class="card-text">{content}</p>
                </div>
            </div>
        </div>
    )
}

export default InfoBox;
