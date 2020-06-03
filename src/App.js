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
  const [seasonYear, setSeasonYear] = useState("2019");
  const [driverId] = useState("");

  const handleYearChange = (event) => {
    setSeasonYear(event.target.value);
  };

  const getYears = () => {
    const years = [];
    for (let year = 2019; year >= 1950; year--) years.push(year);
    return years;
  };

  return (
    <Container>
      <div className="App container-fluid">
        <Row>
          <Col xs={12} sm={8} lg={3}>
            {" "}
            <img
              src="https://purepng.com/public/uploads/medium/purepng.com-formula-1-logoformula-1logonew2018-21529676510lxzg5.png"
              alt="logo"
              id="logo"
            />
          </Col>
          <Col xs={12} sm={10} lg={6}>
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
            <Col xs={12} sm={10} md={8} lg={10}>
              <NavBar />
            </Col>
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
      </div>
    </Container>
  );
};

export default App;
