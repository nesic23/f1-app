import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Loader from "../../Loader";
import "./raceWinners.css";

const RaceWinners = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    let mounted = true;
    axios
      .get(`https://ergast.com/api/f1/${props.seasonYear}/results/1.json`)
      .then((res) => {
        if (mounted) setIsLoaded(true);
        setResults(res.data.MRData.RaceTable.Races);
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
          <h1>{props.seasonYear} Race Winners</h1>
        </div>
        <div>
          <Table responsive className="raceTable">
            <thead>
              <tr>
                <th>Round</th>
                <th>Circuit</th>
                <th>Winner</th>
                <th>Constructor</th>
                <th>Laps</th>
                <th>Grid</th>
                <th>Time</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {results.map((race) => (
                <tr key={race.round}>
                  <td>{race.round}</td>
                  <td>
                    <img
                      src={require(`../../assets/flags/${race.Circuit.Location.country}.png`)}
                      alt="flag"
                    />
                    <a
                      href={race.Circuit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {race.raceName}
                    </a>
                  </td>
                  <td>
                    <a
                      href={race.Results[0].Driver.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      {race.Results[0].Driver.givenName}{" "}
                      {race.Results[0].Driver.familyName}
                    </a>
                  </td>
                  <td>
                    <a
                      href={race.Results[0].Constructor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {race.Results[0].Constructor.name}
                    </a>
                  </td>
                  <td>{race.Results[0].laps}</td>
                  <td>{race.Results[0].grid}</td>
                  <td>{race.Results[0].Time.time}</td>
                  <td>{race.Results[0].points}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
};

export default RaceWinners;
