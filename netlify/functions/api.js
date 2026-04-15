// netlify/functions/api.js

const express = require('express');
const serverless = require('serverless-http');

const cors = require('../../middleware/cors');
const classifyRoutes = require('../../routes/classify');

const app = express();

app.use(cors);
app.use('/.netlify/functions/api', classifyRoutes);

module.exports.handler = serverless(app);