import "./App.css";

import { Card, Progress } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [ccu, setCcu] = useState([]);
  const MINUTE_MS = 30000;
  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.bombcrypto.io/ccu",
    })
      .then((response) => {
        setCount(response.data.message.details.length);
        setData(response.data.message.details);
        setCcu(response.data.message);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      axios({
        method: "get",
        url: "https://api.bombcrypto.io/ccu",
      })
        .then((response) => {
          setCount(response.data.message.details.length);
          setData(response.data.message.details);
          setCcu(response.data.message);
        })
        .catch((err) => {
          console.error(err);
        });
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);
  const gridStyle = {
    width: "20%",
  };
  const red = {
    width: "20%",
    color: "white",
    backgroundColor: "#DE3163",
  };
  return (
    <>
      <Card title="Bomb Crypto Server Status PowerBy XapaNFT">
        <h1 className="card-text" style={{ marginLeft: "35px" }}>
          AllServer: {Number(count).toLocaleString("en")}
        </h1>
        <h1 className="card-text" style={{ marginLeft: "35px" }}>
          Total ID: {Number(ccu.ccu).toLocaleString("en")}
        </h1>
        <h1 className="card-text" style={{ marginLeft: "35px" }}>
          Max ID: {Number(ccu.maxCcu).toLocaleString("en")}
        </h1>

        <h1 className="card-text" style={{ marginLeft: "35px" }}>
          <Progress
            className="card-text"
            strokeLinecap="square"
            percent={parseFloat((ccu.ccu * 100) / ccu.maxCcu).toFixed(2)}
            style={{ width: "50%" }}
            strokeColor={{
              "0%": "#9FE2BF",
              "50%": "#FFBF00",
              "100%": "#DE3163",
            }}
          />
        </h1>

        {data?.map((props, index) => {
          return (
            <Card.Grid
              key={index + 1}
              sm={6}
              md={3}
              className="mt-3"
              style={props[0] == 0 ? red : gridStyle}
            >
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h2 className="card-text">Server: {index + 1}</h2>
                  <p className="card-text">
                    Total ID:{Number(props[0]).toLocaleString("en")}
                  </p>
                  <p className="card-text">
                    Max ID: {Number(props[1]).toLocaleString("en")}
                  </p>
                  <Progress
                    className="card-text"
                    strokeLinecap="square"
                    percent={
                      props[0] == 0
                        ? 0
                        : parseFloat((props[0] * 100) / props[1]).toFixed(2)
                    }
                    strokeColor={{
                      "0%": "#9FE2BF",
                      "50%": "#FFBF00",
                      "100%": "#DE3163",
                    }}
                    style={{ width: "80%" }}
                  />
                </div>
              </div>
            </Card.Grid>
          );
        })}
      </Card>
    </>
  );
}

export default App;
