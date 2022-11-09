import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import Home from './pages/Home';
import Network from './pages/Network';
import SelectedNetwork from './pages/SelectedNetwork';

const Route = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/network",
    element: <Network/>,
  },
  {
    path: "/selected-network",
    element: <SelectedNetwork/>,
  },
]);

export default Route