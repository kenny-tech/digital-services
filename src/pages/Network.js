import React from "react";

import Provider from "../components/Provider";
import Phone from "../components/Phone";

const Network = () => {
    return (
        <div className="container">
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
                    <Provider name="MTN" image="/mtn.png" />
                    <Provider name="Airtel" image="/airtel.png" />
                    <Provider name="Glo" image="/glo.png" />
                    <Provider name="9 Mobile" image="/9mobile.png" />
                </div>
            </div>
        </div>
    )
}

export default Network;
