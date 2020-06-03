import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../Loader";
import Table from "react-bootstrap/Table";
import "./constructorStandings.css";

const ConstructorStandings = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    axios
      .get(`https://ergast.com/api/f1/current/constructorStandings.json`)
      .then((res) => {
        setStandings(
          res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
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
      .get(
        `https://ergast.com/api/f1/${props.seasonYear}/constructorStandings.json`
      )
      .then((res) => {
        if (mounted) setIsLoaded(true);
        setStandings(
          res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
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
          <h1>{props.seasonYear} Constructor Standings</h1>
        </div>
        <div>
          <Table className="consTable">
            <thead>
              <tr>
                <th>Position</th>
                <th>Team</th>
                <th>Points</th>
                <th>Wins</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((standing) => (
                <tr key={standing.Constructor.constructorId}>
                  <td>{standing.position}</td>
                  <td>
                    <a
                      href={standing.Constructor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={require(`../../assets/flags/${standing.Constructor.nationality}.png`)}
                        alt="logo"
                      />
                      {standing.Constructor.name}
                    </a>
                  </td>
                  <td>{standing.points}</td>
                  <td>{standing.wins}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
};

export default ConstructorStandings;
