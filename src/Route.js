import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import Home from './pages/Home';
import Provider from './pages/Provider';
import SelectedProvider from './pages/SelectedProvider';
import Login from './pages/Login';

const Route = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/provider",
    element: <Provider/>,
  },
  {
    path: "/selected-provider",
    element: <SelectedProvider/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

export default Route