import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from "@mui/icons-material/Place";
import { motion } from "framer-motion";
import "../design/InfoWeather.css";
import axios from "axios";

//store this json object.
//      `${api.base}weather?q=${inputValueLocation}&units=metric&appid=${api.key}`

function InfoWeather() {
  const [inputValueLocation, setInputValueLocation] = useState("");
  const [weather, setWeather] = useState({});

  const api = {
    key: import.meta.env.VITE_APP_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/api/",
  };

  //get the data from the server

  const searchLocation = () => {
    // fetch(
    //   `${api.base}weather?q=${inputValueLocation}&units=metric&appid=${api.key}`
    // )
    // axios
    //   .get(`${api.base}weather?q=${inputValueLocation}&units=metric`)
    //   .then((resp) => resp.json())
    //   .then((result) => {
    //     console.log(result.data);
    //     setWeather(result.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    axios
      .get(`/api/weather?q=${inputValueLocation}&units=metric`)
      .then((resp) => {
        setWeather(resp.data);
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setInputValueLocation("");
  };

  return (
    <main className="app">
      <div className="search">
        <form action="" onSubmit={onSubmitHandler} className="form">
          <input
            type="text"
            onChange={(e) => setInputValueLocation(e.target.value)}
            placeholder="Enter Location"
          />

          <button type="submit" onClick={searchLocation} className="button">
            <SearchIcon />
          </button>
        </form>
      </div>

      {typeof weather.main !== "undefined" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: "Tween",
            duration: 1,
            ease: "easeInOut",
            delay: 1.3,
          }}
          className="parent__container"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              type: "Tween",
              duration: 0.8,
              ease: "easeIn",
              delay: 1.5,
            }}
            className="top__portion"
          >
            <div className="location">
              <PlaceIcon className="icon" />
              <p>
                {weather.name}, {weather.sys.country}
              </p>
            </div>

            <div className="temperature">
              <h1>
                <img
                  src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                  alt=""
                />{" "}
                {parseInt(weather.main.temp)}°C
              </h1>
            </div>

            <div className="description">
              <p>{weather.weather[0].main}</p>
            </div>
          </motion.div>
          <motion.div
            className="bottom__portion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              type: "Tween",
              duration: 0.8,
              ease: "easeIn",
              delay: 1.8,
            }}
          >
            <div className="feels">
              <p className="bold">{parseInt(weather.main.feels_like)}°C</p>
              <p>Feels Like</p>
            </div>

            <div className="humidity">
              <p className="bold">{weather.main.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">{weather.wind.speed} MPH</p>
              <p>Wind Speed</p>
            </div>
          </motion.div>

          <motion.div
            className="bottom__portion2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              type: "Tween",
              duration: 0.8,
              ease: "easeIn",
              delay: 2.2,
            }}
          >
            <div className="presulre">
              <p className="bold">{parseInt(weather.main.pressure)} hPa</p>
              <p>Pressure</p>
            </div>

            <div className="visibility">
              <p className="bold">{parseFloat(weather.visibility)} km </p>
              <p>Visibility</p>
            </div>

            <div className="grd_level">
              <p className="bold">{parseInt(weather.main.grnd_level)} km </p>
              <p>Ground level</p>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeIn", delay: 1.3 }}
        >
          <p className="text">Weather News</p>
        </motion.div>
      )}
    </main>
  );
}

export default InfoWeather;
