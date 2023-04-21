import React from "react";

import Airtime from "../components/Airtime";
import Bills from "../components/Bills";
import Electricity from "../components/Electricity";
import Wifi from "../components/Wifi";
import Navigation from "../components/Navigation";

const Home = () => {
    return (
        <div className="container-fluid">
            <Navigation />
            <div className="row mt-4">
                <Airtime />
                <Bills />
                <Electricity />
                <Wifi />
            </div>
        </div>
    )
}

export default Home;
