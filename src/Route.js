import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import Home from './pages/Home';
import Network from './pages/Network';

const Route = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/network",
    element: <Network/>,
  },
]);

export default Route