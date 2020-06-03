import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../Loader";
import Table from "react-bootstrap/Table";
import "./raceResults.css";

const RaceResults = (props) => {
  const [results, setResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(
        `http://ergast.com/api/f1/${props.seasonYear}/drivers/${props.driverId}/results.json`
      )
      .then((res) => {
        setIsLoaded(true);
        setResults(res.data.MRData.RaceTable.Races);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.driverId, props.seasonYear]);

  if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <div>
        <h1>{props.seasonYear} Season Results</h1>
        <Table className="raceTable">
          <thead>
            <tr>
              <th>Race</th>
              <th>Position</th>
              <th>Constructor</th>
              <th>Laps</th>
              {/* <th>Fastest lap</th> */}
              <th>Grid</th>
              {/* <th>Time</th> */}
              <th>Status</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.round}>
                <td>
                  <img
                    src={require(`./../../assets/flags/${result.Circuit.Location.country}.png`)}
                    alt="flag"
                  />
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {result.raceName}
                  </a>
                </td>
                <td>{result.Results[0].position}</td>
                <td>
                  <a
                    href={result.Results[0].Constructor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {result.Results[0].Constructor.name}
                  </a>
                </td>
                <td>{result.Results[0].laps}</td>
                {/* <td>{result.Results[0].FastestLap.Time.time}</td> */}
                <td>{result.Results[0].grid}</td>
                {/* {result.Results[0].Time.time ? (
                    <td>{result.Results[0].Time.time}</td>
                  ) : (
                    <td>{"/"}</td>
                  )} */}
                <td>{result.Results[0].status}</td>
                <td>{result.Results[0].points}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
};

export default RaceResults;
