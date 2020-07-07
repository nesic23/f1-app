import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../Loader";
import "./driverDetails.css";
import RaceResults from "../raceResults/RaceResults";

const DriverDetails = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [drivers, setDrivers] = useState([]);

  let { driverId } = props.location.state;

  useEffect(() => {
    axios
      .get(`http://ergast.com/api/f1/drivers/${driverId}.json`)
      .then((res) => {
        setIsLoaded(true);
        setDrivers(res.data.MRData.DriverTable.Drivers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [driverId]);

  if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <div>
        {drivers.map((driver) => (
          <div key={driver.driverId} className="driverDetail">
            <div className="content">
              <h3 className="header">
                {driver.givenName} {driver.familyName}
              </h3>
              <div className="meta">
                <h5>
                  Nationality: {driver.nationality}{" "}
                  <img
                    src={require(`../../assets/flags/${driver.nationality}.png`)}
                    alt="flag"
                  />
                </h5>
              </div>
              <div className="description">
                <h5>Born: {driver.dateOfBirth}</h5>
              </div>
            </div>
            <div className="extra content" style={{ paddingTop: "5px" }}>
              <a href={driver.url} target="_blank" rel="noopener noreferrer">
                <i className="linkify icon">BIOGRAPHY</i>
              </a>
            </div>
          </div>
        ))}
        <RaceResults driverId={driverId} seasonYear={props.seasonYear} />
      </div>
    );
  }
};

export default DriverDetails;
