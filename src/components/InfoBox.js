import React from "react";

const InfoBox = ({ title, content, image }) => {
    return (
        <div className="col-md-4 mt-3">
             <div className="card" style={{width: '24rem'}}>
                <div className="card-body text-center">
                    <img src={image} className="img-fluid rounded" alt="" />
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{content}</p>
                </div>
            </div>
        </div>
    )
}

export default InfoBox;
