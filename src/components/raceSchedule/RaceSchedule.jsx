import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../Loader";
import Table from "react-bootstrap/Table";
import "./raceSchedule.css";

const RaceSchedule = (props) => {
  const [races, setRaces] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`http://ergast.com/api/f1/current.json`)
      .then((res) => {
        setRaces(res.data.MRData.RaceTable.Races);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let mounted = true;
    axios
      .get(`http://ergast.com/api/f1/${props.seasonYear}.json`)
      .then((res) => {
        if (mounted) setIsLoaded(true);
        setRaces(res.data.MRData.RaceTable.Races);
        setIsLoaded(true);
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
          <h1>{props.seasonYear} Race Schedule</h1>
        </div>
        <div>
          <Table className="raceTable">
            <thead>
              <tr>
                <th>Round</th>
                <th>Race</th>
                <th>Date</th>
                <th>Circuit</th>
                <th>Locality</th>
                <th>Country</th>
                <th>Info</th>
              </tr>
            </thead>
            <tbody>
              {races.map((race) => (
                <tr key={race.round}>
                  <td>{race.round}</td>
                  <td>
                    <img
                      src={require(`./../../assets/flags/${race.Circuit.Location.country}.png`)}
                      alt="flag"
                    />
                    <a
                      href={race.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {race.raceName}
                    </a>
                  </td>
                  <td>{race.date}</td>
                  <td>{race.Circuit.circuitName}</td>
                  <td>{race.Circuit.Location.locality}</td>
                  <td>{race.Circuit.Location.country}</td>
                  <td>
                    {
                      <a
                        href={race.Circuit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Details
                      </a>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
};

export default RaceSchedule;
