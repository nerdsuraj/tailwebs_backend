const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000;
const apiRoute = require('./router/index.route');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_URL).then(() => {
    console.log(`Db Connected Successfully`)
  }).catch((error) => {
    console.log("🚀 ~ mongoose.connect ~ error:", error)
    return {};
  })
app.use('/api', apiRoute);

app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
});