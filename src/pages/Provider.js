import React from "react";
import { Link } from "react-router-dom";

import Network from "../components/Network";
import Phone from "../components/Phone";

const Provider = () => {
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
                    <Link to="/selected-provider" state={{ networkName: "MTN" }}>
                        <Network name="MTN" image="/mtn.png" />
                    </Link>
                    <Link to="/selected-provider" state={{ networkName: "Airtel" }}>
                        <Network name="Airtel" image="/airtel.png" />
                    </Link>
                    <Link to="/selected-provider" state={{ networkName: "Glo" }}>
                        <Network name="Glo" image="/glo.png" />
                    </Link>
                    <Link to="/selected-provider" state={{ networkName: "9Mobile" }}>
                        <Network name="9 Mobile" image="/9mobile.png" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Provider;
