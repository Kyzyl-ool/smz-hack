import React from "react";
import { NavLink } from "react-router-dom";

export const withLink = (YourComponent, location) => {
  return <NavLink to={location} style={{textDecoration: 'none'}}>
    {YourComponent}
  </NavLink>
}
