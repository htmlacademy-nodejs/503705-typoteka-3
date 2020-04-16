'use strict';

const express = require(`express`);
const path = require(`path`);

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;

const app = express();

const mainRoutes = require(`./routes/main-routes.js`);
const myRoutes = require(`./routes/my-routes.js`);
const articlesRoutes = require(`./routes/articles-routes.js`);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);

app.listen(DEFAULT_PORT);