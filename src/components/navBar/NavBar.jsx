import React from "react";
import "./navBar.css";
import { NavLink } from "react-router-dom";
// import { Container, Row, Col } from "react-bootstrap";

const NavBar = () => {
  const activeStyle = { color: "rgb(240, 35, 35)" };
  return (
    <nav className="nav">
      <NavLink to="/" activeStyle={activeStyle} exact>
        Driver Standings
      </NavLink>

      <NavLink to="/constructorStandings" activeStyle={activeStyle}>
        Constructor Standings
      </NavLink>
      <NavLink to="/raceSchedule" activeStyle={activeStyle}>
        Race Schedule
      </NavLink>

      <NavLink to="/raceWinners" activeStyle={activeStyle}>
        Race Winners
      </NavLink>

      {/* <NavLink to="/raceResults" activeStyle={activeStyle}>
        Race Results
      </NavLink> */}
    </nav>
  );
};

export default NavBar;
