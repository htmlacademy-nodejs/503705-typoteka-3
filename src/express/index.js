'use strict';

const express = require(`express`);
const DEFAULT_PORT = 8080;
const app = express();

const mainRoutes = require(`./routes/main-routes.js`);
const myRoutes = require(`./routes/my-routes.js`);
const articlesRoutes = require(`./routes/articles-routes.js`);

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);

app.listen(DEFAULT_PORT);