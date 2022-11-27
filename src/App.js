import React from 'react';
import { RouterProvider } from "react-router-dom";

import { Route } from './Route';

const App = () => {
  return (
    <RouterProvider router={Route} />
  )
}

export default App; 

