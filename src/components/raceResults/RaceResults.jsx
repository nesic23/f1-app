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
        <Table responsive className="raceTable">
          <thead>
            <tr>
              <th>Round</th>
              <th>Race</th>
              <th>Position</th>
              <th>Constructor</th>
              <th>Laps</th>
              <th>Grid</th>
              <th>Status</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) =>
              result.length === 0 ? (
                <div>
                  <h1>No data for that year!</h1>
                </div>
              ) : (
                <tr key={result.round}>
                  <td>{result.round}</td>
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
                  <td>{result.Results[0].grid}</td>
                  <td>{result.Results[0].status}</td>
                  <td>{result.Results[0].points}</td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>
    );
  }
};

export default RaceResults;
