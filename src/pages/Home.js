import React from "react";

import Airtime from "../components/Airtime";
import Bills from "../components/Bills";

const Home = () => {
    return (
        <div className="container-fluid">
            <div className="row no-gutters mt-5">
                <Airtime />
                <Bills />
            </div>
        </div>
    )
}

export default Home;
