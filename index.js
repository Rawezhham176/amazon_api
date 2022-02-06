require("dotenv").config();

const express = require("express");
const request = require("request-promise");

const app = express();

const PORT = process.env.PORT || 5000;

const getApiKey = (api_key = process.env.SCRAPER_API) =>
  `http://api.scraperapi.com?api_key=${api_key}&autoparse=true`;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running");
  console.log(process.env.SCRAPER_API);
});

// get a product with the product id
app.get("/amazon/:productId", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${getApiKey(api_key)}&url=https://www.amazon.de/dp/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// get a product review with the product id
app.get("/amazon/review/:productId", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${getApiKey(
        api_key
      )}&url=https://www.amazon.de/product-reviews/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// get a product offers with the product id
app.get("/amazon/offer/:productId", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${getApiKey(
        api_key
      )}&url=https://www.amazon.de/gp/offer-listing/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// get a product search with the product id
app.get("/amazon/search/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${getApiKey(api_key)}&url=https://www.amazon.de/s?k=${searchQuery}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.listen(PORT, () =>
  console.log(`The server has been running on port ${PORT}`)
);
