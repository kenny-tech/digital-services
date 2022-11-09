import React from "react";
import { Link } from "react-router-dom";

import Provider from "../components/Provider";
import Phone from "../components/Phone";

const Network = () => {
    return (
        <div className="container-fluid ml-sm-3">
             <div>
                <div className="row mt-3">
                    <div className="col-12 col-sm-6">
                        <Phone />
                    </div>
                </div>
                <div className="row no-gutters mt-5">
                    <div className="col-12">
                        <p>Select a Network</p>
                    </div>
                    <Link to="/selected-network" state={{ networkName: "MTN" }}>
                        <Provider name="MTN" image="/mtn.png" />
                    </Link>
                    <Link to="/selected-network" state={{ networkName: "Airtel" }}>
                        <Provider name="Airtel" image="/airtel.png" />
                    </Link>
                    <Link to="/selected-network" state={{ networkName: "Glo" }}>
                        <Provider name="Glo" image="/glo.png" />
                    </Link>
                    <Link to="/selected-network" state={{ networkName: "9Mobile" }}>
                        <Provider name="9 Mobile" image="/9mobile.png" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Network;
