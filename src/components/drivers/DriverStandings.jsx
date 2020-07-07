import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../Loader";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import "./driverStandings.css";

const DriverStandings = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    axios
      .get(`https://ergast.com/api/f1/current/driverStandings.json`)
      .then((res) => {
        setStandings(
          res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
        );
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let mounted = true;
    axios
      .get(`https://ergast.com/api/f1/${props.seasonYear}/driverStandings.json`)
      .then((res) => {
        if (mounted) setIsLoaded(true);
        setStandings(
          res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
        );
      })
      .catch((err) => {
        console.log(err);
      });
    return () => (mounted = false);
  }, [props.seasonYear]);

  if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <div>
        <div>
          <h1>{props.seasonYear} Drivers Standings</h1>
        </div>
        <div>
          <Table responsive className="driversTable">
            <thead>
              <tr>
                <th>Position</th>
                <th>Driver</th>
                <th>Nationality</th>
                <th>Car</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((standing) => (
                <tr key={standing.Driver.driverId}>
                  <td>{standing.position}</td>
                  <td>
                    <Link
                      to={{
                        pathname: "/driverDetails",
                        state: { driverId: standing.Driver.driverId },
                      }}
                    >
                      {standing.Driver.givenName} {standing.Driver.familyName}
                    </Link>
                  </td>
                  <td>
                    {" "}
                    <img
                      src={require(`./../../assets/flags/${standing.Driver.nationality}.png`)}
                      alt="flag"
                    />
                    {standing.Driver.nationality}
                  </td>
                  <td>
                    <a
                      href={standing.Constructors[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {standing.Constructors[0].name}
                    </a>
                  </td>
                  <td>{standing.points}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
};

export default DriverStandings;
