import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Network from "../components/Network";

const Provider = () => {

    const location = useLocation();
    const type = location.state.type;

    return (
        <div className="container-fluid ml-sm-3">
             <div>
                {
                    type === 'Airtime' ? (<div className="row no-gutters mt-5">
                    <div className="col-12">
                        <p>Select a Network</p>
                    </div>
                    <Link to="/selected-provider" state={{ networkName: "MTN", type: "Airtime" }}>
                        <Network name="MTN" image="/mtn.png" />
                    </Link>
                    <Link to="/selected-provider" state={{ networkName: "Airtel", type: "Airtime" }}>
                        <Network name="Airtel" image="/airtel.png" />
                    </Link>
                    <Link to="/selected-provider" state={{ networkName: "Glo", type: "Airtime" }}>
                        <Network name="Glo" image="/glo.png" />
                    </Link>
                    <Link to="/selected-provider" state={{ networkName: "9Mobile", type: "Airtime" }}>
                        <Network name="9 Mobile" image="/9mobile.png" />
                    </Link>
                </div>) : (<div className="row no-gutters mt-5">
                    <div className="col-12">
                        <p>Select a Provider</p>
                    </div>
                    <Link to="/selected-provider" state={{ networkName: "DSTV", type: "Bills" }}>
                        <Network name="DSTV" image="/dstv.png" />
                    </Link>
                    <Link to="/selected-provider" state={{ networkName: "GoTv", type: "Bills" }}>
                        <Network name="GoTV" image="/gotv.png" />
                    </Link>
                </div>)
                }
            </div>
        </div>
    )
}

export default Provider;
