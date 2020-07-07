import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import "./App.css";

import NavBar from "./components/navBar/NavBar";
import DriverStandings from "./components/drivers/DriverStandings";
import ConstructorStandings from "./components/constructorStandings/ConstructorStandings";
import RaceWinners from "./components/raceWinners/RaceWinners";
import RaceSchedule from "./components/raceSchedule/RaceSchedule";
import RaceResults from "./components/raceResults/RaceResults";
import DriverDetails from "./components/drivers/DriverDetails";
import PageNotFound from "./PageNotFound";

const App = () => {
  const [seasonYear, setSeasonYear] = useState("2020");
  const [driverId] = useState("");

  const handleYearChange = (event) => {
    setSeasonYear(event.target.value);
  };

  const getYears = () => {
    const years = [];
    for (let year = 2020; year >= 1950; year--) years.push(year);
    return years;
  };

  return (
    <div>
      <Container>
        <Row>
          <Col xs={2} sm={4} lg={12}>
            {" "}
            <img src={require("./assets/logo.png")} alt="logo" id="logo" />
          </Col>
        </Row>
        <Row>
          <Col xs={10} sm={12} md={12} lg={12}>
            <form className="yearSelect">
              <select size="2" value={seasonYear} onChange={handleYearChange}>
                {getYears().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </form>
          </Col>
        </Row>
        <Row>
          <main>
            <NavBar />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <DriverStandings
                    {...props}
                    seasonYear={seasonYear}
                    driverId={props.driverId}
                  />
                )}
              />
              <Route
                path="/constructorStandings"
                render={(props) => (
                  <ConstructorStandings {...props} seasonYear={seasonYear} />
                )}
              />
              <Route
                path="/raceSchedule"
                render={(props) => (
                  <RaceSchedule {...props} seasonYear={seasonYear} />
                )}
              />
              <Route
                path="/raceWinners"
                render={(props) => (
                  <RaceWinners {...props} seasonYear={seasonYear} />
                )}
              />
              <Route
                path="/raceResults"
                render={(props) => (
                  <RaceResults {...props} seasonYear={seasonYear} />
                )}
              />

              <Route
                path="/driverDetails"
                render={(props) => (
                  <DriverDetails
                    {...props}
                    seasonYear={seasonYear}
                    driverId={driverId}
                  />
                )}
              />
              <Route component={PageNotFound} />
            </Switch>
          </main>
        </Row>
      </Container>
    </div>
  );
};

export default App;
