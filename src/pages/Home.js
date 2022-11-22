import React from "react";

import Airtime from "../components/Airtime";
import Bills from "../components/Bills";
import Navigation from "../components/Navigation";

const Home = () => {
    return (
        <div className="container-fluid">
            <Navigation />
            <div className="row no-gutters mt-4">
                <Airtime />
                <Bills />
            </div>
        </div>
    )
}

export default Home;
