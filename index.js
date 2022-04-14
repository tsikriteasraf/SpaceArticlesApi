const PORT =process.env.PORT|| 9000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const { response } = require("express");
const res = require("express/lib/response");

const app = express();
const newspapers = [
  {
    name: "space.com",
    address:
      "https://www.space.com/news",
    base:"",
  },
  {
      name:"livescience",
      address:"https://www.livescience.com/space",
      base:"",
  },
  {
      name:"sciencenews",
      address:"https://www.sciencenews.org/topic/astronomy",
      base:"",
  },
  {
      name:"astronomynow",
      address:"https://astronomynow.com/",
      base:"",
  },
  {
      name:"zeenews",
      address:"https://zeenews.india.com/space",
      base:"https://zeenews.india.com",
  },
  {
      name:"sci-news",
      address:"http://www.sci-news.com/news/space",
      base:"",
  },
  {
      name:"nytimes",
      address:"https://www.nytimes.com/section/science/space",
      base:"https://www.nytimes.com",
  },
  {
      name:"independent",
      address:"https://www.independent.co.uk/topic/space",
      base:"https://www.independent.co.uk",
  },
  {
      name:"abc",
      address:"https://www.abc.net.au/news/science/space/?nw=0",
      base:"https://www.abc.net.au",
  },
  {
      name:"news",
      address:"https://www.news.com.au/technology/science/space",
      base:"",
  },
  {
      name:"foxnews",
      address:"https://www.foxnews.com/category/science/air-and-space",
      base:"https://www.foxnews.com",
  },
];
const articles = [];
newspapers.forEach((newspaper) => {
  axios
    .get(newspaper.address)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      $('a:contains("space")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");
        articles.push({
          title,
          url: newspaper.base + url,
          source: newspaper.name,
        });
      });
      $('a:contains("moon")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");
        articles.push({
          title,
          url: newspaper.base + url,
          source: newspaper.name,
        });
      });
      $('a:contains("comet")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");
        articles.push({
          title,
          url: newspaper.base + url,
          source: newspaper.name,
        });
      });
      $('a:contains("planets")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");
        articles.push({
          title,
          url: newspaper.base + url,
          source: newspaper.name,
        });
      });
      $('a:contains("rocket")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");
        articles.push({
          title,
          url: newspaper.base + url,
          source: newspaper.name,
        });
      });
      $('a:contains("asteroid")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");
        articles.push({
          title,
          url: newspaper.base + url,
          source: newspaper.name,
        });
      });
    })
    .catch((err) => console.log(err));
});
app.get("/", (req, res) => {
  res.json("Welcome to my Space News API");
});
app.get("/news", (req, res) => {
  res.json(articles);
});

app.get("/news/:newspaperId", async (req, res) => {
  const newspaperId = req.params.newspaperId;
  const newspaperAddress = newspapers.filter(
    (newspaper) => newspaper.name == newspaperId
  )[0].address;
  const newspaperBase = newspapers.filter(
    (newspaper) => newspaper.name == newspaperId
  )[0].base;
  axios
    .get(newspaperAddress)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const specificArticles = [];

      $('a:contains("space")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");
        specificArticles.push({
          title,
          url: newspaperBase + url,
          source: newspaperId,
        });
      });
      res.json(specificArticles);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));