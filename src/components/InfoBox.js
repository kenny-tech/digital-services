import React from "react";

const InfoBox = ({ title, content, image }) => {
    return (
        <div className="col-md-4 mt-3">
             <div class="card" style={{width: '24rem'}}>
                <div class="card-body text-center">
                    <img src={image} class="img-fluid rounded" alt="" />
                    <h5 class="card-title">{title}</h5>
                    <p class="card-text">{content}</p>
                </div>
            </div>
        </div>
    )
}

export default InfoBox;
