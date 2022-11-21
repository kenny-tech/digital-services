import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Network from "../components/Network";
import Faq from "../components/Faq";
import InfoBox from "../components/InfoBox";

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
                    <Faq />
                     <div className="row"> 
                        <InfoBox title="Prompt digital delivery" content="With just a few clicks, you'll have access to your digital credit." />
                        <InfoBox title="Excellent ratings and reviews" content="Our customers have provided us with over 1 million excellent ratings and reviews." />
                        <InfoBox title="We are trusted, Pay safely & securely" content="Your Order gets you in seconds using your favourite payment option." />
                    </div>
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