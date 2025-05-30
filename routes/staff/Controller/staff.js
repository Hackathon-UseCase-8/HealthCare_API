const { Client } = require('pg');
const config = require('../../../config'); // Ensure this path is correct relative to this file

// Corrected: Use PGDbDetails (with capital D) to match your config file
let pgclient = new Client(config.PGDbDetails);
pgclient.connect()
    .then(() => console.log('PostgreSQL connected successfully!'))
    .catch(err => console.error('PostgreSQL connection error:', err)); // Added error handling for connection

let self = module.exports = {
    getStaffList: async (req, res) => {
        try {
            let query = `SELECT * FROM staff`;
            let result = await pgclient.query(query);
            if (result.rows.length > 0) {
                res.send(result.rows);
            } else {
                res.send("No data found");
            }
        } catch (error) {
            console.error("Error in getStaffList:", error); // Use console.error for errors
            res.status(500).send("Failed to retrieve staff list"); // Send a more specific status code
        }
    }
};