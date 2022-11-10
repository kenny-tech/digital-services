import React from "react";

import '../css/Network.css';

const Network = ({ name, image }) => {
    return (
        <div className="col-md-3 col-6">
            <div className="card mr-5 mb-3 bg-light border-0 networkCard">
                <div className="card-body d-block justify-content-center align-items-center">
                    <div className="mx-auto text-center">
                        <img src={image} class="img-fluid mx-auto rounded" />
                        <h6 className="text-center mt-2">{name}</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Network;
