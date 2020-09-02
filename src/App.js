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
  const [loading, setLoading] = useState(false);
  const [launch_year, setLaunchYear] = useState("");
  const [susslaunch, setSussLaunch] = useState("");
  const [susslanding, setSusslanding] = useState("");

  useEffect(() => {
    setLoading(true);
    function spacex() {
      fetch(`https://api.spacexdata.com/v3/launches?limit=100`)
        .then(resp => resp.json())
        .then(function(data) {
          setFlightData(data);
          setLoading(false);
        });
    }
    spacex();
  }, []);

  //filter year
  const launchYear = param => () => {
    setLaunchYear(param);
    const query_str = `&launch_year=${param}&land_success=${susslanding}&launch_success=${susslaunch}`;

    setLoading(true);
    fetch(`https://api.spacexdata.com/v3/launches?limit=100${query_str}`)
      .then(resp => resp.json())
      .then(function(data) {
        setFlightData(data);
        setLoading(false);
      });
  };
  useEffect(() => {
    launchYear();
  }, [launchYear]);

  // filter launchSuccess true/false
  const launchSuccess = param => e => {
    setSussLaunch(param);
    const query_str = `&launch_year=${launch_year}&land_success=${susslanding}&launch_success=${param}`;
    setLoading(true);
    fetch(`https://api.spacexdata.com/v3/launches?limit=100${query_str}`)
      .then(resp => resp.json())
      .then(function(data) {
        setFlightData(data);
        setLoading(false);
      });
  };
  useEffect(() => {
    launchSuccess();
  }, [launchSuccess]);

  // filter change landing true/false
  const changeLading = param1 => e => {
    setSusslanding(param1);
    const query_str = `&launch_year=${launch_year}&land_success=${param1}&launch_success=${susslaunch}`;

    setLoading(true);
    fetch(`https://api.spacexdata.com/v3/launches?limit=100${query_str}`)
      .then(resp => resp.json())
      .then(function(data) {
        setFlightData(data);
        setLoading(false);
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
                <li
                  key={res}
                  onClick={launchYear(res)}
                  className={launch_year === res ? "highlited_color" : ""}
                >
                  {res}
                </li>
              );
            })}
          </ul>
          <div style={{ clear: "both" }}></div>
          <div style={{ textAlign: "center" }}>Successful Launch</div>
          <hr />
          <ul>
            <li
              onClick={launchSuccess("true")}
              className={susslaunch === "true" ? "highlited_color" : ""}
            >
              True
            </li>
            <li
              onClick={launchSuccess("false")}
              className={susslaunch === "false" ? "highlited_color" : ""}
            >
              False
            </li>
          </ul>
          <div style={{ clear: "both" }}></div>
          <div style={{ textAlign: "center" }}>Successful Landing</div>
          <hr />
          <ul>
            <li
              onClick={changeLading("true")}
              className={susslanding === "true" ? "highlited_color" : ""}
            >
              True
            </li>
            <li
              onClick={changeLading("false")}
              className={susslanding === "false" ? "highlited_color" : ""}
            >
              False
            </li>
          </ul>
        </div>

        <div className="col-9">
          <div className="row">
            {loading ? <h3>Loading....</h3> : ""}
            {!loading && flightData.length == 0 && <h4>No Records found!</h4>}
            {flightData.length > 0 &&
              !loading &&
              flightData.map((res, index) => {
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
                  <div className="col-3 card" key={`${flight_number}${index}`}>
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
