const express = require("express");
const needle = require("needle");
const url = require("url");
const api_cache = require("apicache");
const router = express.Router();

const API_BASE_URL = process.env.APP_URL_BASE;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY = process.env.VITE_APP_API_KEY;

//init the cache

let cache = api_cache.middleware;

router.get("/", cache("3 minutes"), async (req, resp) => {
  //   resp.json({ success: true });
  // resp.send("Hello");

  try {
    //add app_key_name as key of the object
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY,
      ...url.parse(req.url, true).query,
    });

    // attach as query params
    const apiResponse = await needle("get", `${API_BASE_URL}?${params}`);
    const data = apiResponse.body;

    //if its not in production (what is being called (requested)), log the request to the public api
    if (process.env.NODE_ENV != "production") {
      console.log(`REQUEST: ${API_BASE_URL}?${params}`);
    }
    resp.status(200).json(data);
  } catch (error) {
    console.log("Error: " + error);
    resp.status(500).json(error);
  }
});

module.exports = router;
