import React from "react";

import Airtime from "../components/Airtime";
import Bills from "../components/Bills";

const Home = () => {
    return (
        <div className="row">
            <Airtime />
            <Bills />
        </div>
    )
}

export default Home;
