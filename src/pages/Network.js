import React from "react";

import Provider from "../components/Provider";

const Network = () => {
    return (
        <div className="container">
             <div className="row no-gutters mt-5">
                <p>Select the Network you want</p>
                <div className="row">
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
