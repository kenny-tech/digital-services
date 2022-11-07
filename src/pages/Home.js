import React from "react";

import Airtime from "../components/Airtime";
import Bills from "../components/Bills";

import Network from "./Network";

const Home = () => {
    return (
        <div className="row no-gutters mt-5">
            <Airtime />
            <Bills />
            {/* <Network/> */}
        </div>
    )
}

export default Home;
