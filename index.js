const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 4001;              
const staffRoutes = require('./routes/Staff');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(staffRoutes)

// Start the server
app.listen(port, () => {
  console.log(`HealthCare API is running at http://localhost:${port}`);
});