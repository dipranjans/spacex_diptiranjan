import React, { useState, useEffect } from "react";
const lunchYear = [
  2006,
  2007,
  2008,
  2009,
  2010,
  2011,
  2012,
  2013,
  2014,
  2015,
  2016,
  2017,
  2018,
  2019,
  2020
];

const App = () => {
  const [flightData, setFlightData] = useState([]);

  useEffect(() => {
    function spacex() {
      fetch(`https://api.spacexdata.com/v3/launches?limit=100`)
        .then(resp => resp.json())
        .then(function(data) {
          setFlightData(data);
        });
    }
    spacex();
  }, []);

  //filter year
  const launchYear = param => () => {
    fetch(
      `https://api.spacexdata.com/v3/launches?limit=100&launch_year=${param}`
    )
      .then(resp => resp.json())
      .then(function(data) {
        setFlightData(data);
      });
  };
  useEffect(() => {
    launchYear();
  }, [launchYear]);

  // filter launchSuccess true/false
  const launchSuccess = param => e => {
    fetch(
      `https://api.spacexdata.com/v3/launches?limit=100&launch_success=${param}`
    )
      .then(resp => resp.json())
      .then(function(data) {
        console.log("dipranjan", data);
        setFlightData(data);
      });
  };
  useEffect(() => {
    launchSuccess();
  }, [launchSuccess]);

  // filter change landing true/false
  const changeLading = param1 => e => {
    fetch(
      `https://api.spacexdata.com/v3/launches?limit=100&land_success=${param1}`
    )
      .then(resp => resp.json())
      .then(function(data) {
        console.log("dipranjan1", data);
        setFlightData(data);
      });
  };
  useEffect(() => {
    changeLading();
  }, [changeLading]);

  return (
    <>
      <div className="header">
        <h3>SpaceX lunch program</h3>
      </div>
      <div className="row">
        <div className="col-3 menu">
          Filters
          <div style={{ textAlign: "center" }}>Launch Year</div>
          <hr />
          <ul>
            {lunchYear.map(res => {
              return (
                <li key={res} onClick={launchYear(res)}>
                  {res}
                </li>
              );
            })}
          </ul>
          <div style={{ clear: "both" }}></div>
          <div style={{ textAlign: "center" }}>Successful Launch</div>
          <hr />
          <ul>
            <li onClick={launchSuccess("true")}>True</li>
            <li onClick={launchSuccess("false")}>False</li>
          </ul>
          <div style={{ clear: "both" }}></div>
          <div style={{ textAlign: "center" }}>Successful Landing</div>
          <hr />
          <ul>
            <li onClick={changeLading("true")}>True</li>
            <li onClick={changeLading("false")}>False</li>
          </ul>
        </div>

        <div className="col-9">
          <div className="row">
            {flightData.map(res => {
              const {
                links,
                mission_name,
                flight_number,
                mission_id,
                launch_year,
                launch_success,
                rocket: { first_stage }
              } = res;
              return (
                <div className="col-3 card" key={flight_number}>
                  <img
                    src={links.mission_patch_small}
                    alt="Avatar"
                    style={{ width: "100%" }}
                  />
                  <div className="container">
                    <h4>
                      <strong>{mission_name}</strong> #{" "}
                      <strong>{flight_number}</strong>
                    </h4>
                    <h5>MissionIds :{mission_id}</h5>
                    <h5>Launch Year: {launch_year}</h5>
                    <h5>
                      Successful Lunch:{" "}
                      {launch_success === true ? "true" : "false"}
                    </h5>
                    <h5>
                      Successful Landing:{" "}
                      {first_stage.cores[0].land_success === true
                        ? "true"
                        : "false"}
                    </h5>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <footer>Developed by: Diptiranjan</footer>
    </>
  );
};
export default App;
