import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "../page/auth/Login";
import Register from "../page/auth/Register";
import Home from "../page/Home";
import Root from "../page/Root";


const Router = () => {
    const router = createBrowserRouter([
      {
          path: "/", element: <Root />, errorElement: <Error />,
          children: [
              { index: true, element: <Home />},
              { path: "login", element: <Login />},
              { path: "register", element: <Register />},
            //   { path: "countries", element: <CountryRoot />, children: [
            //     {index: true, element: <Countries />},
            //     { path: ":countryId" , element: <CountryDetail />},
            //     { path: "add" , element: <AddCountry />},
            //   ]},
          ],  
  
      }
    ]);
  
    return ( 
      <RouterProvider router={router} />
    )
  }
  
  export default Router