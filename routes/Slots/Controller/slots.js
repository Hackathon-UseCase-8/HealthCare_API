const { Client } = require('pg');
const config = require('../../../config'); // Ensure this path is correct relative to this file

// Corrected: Use PGDbDetails (with capital D) to match your config file
let pgclient = new Client(config.PGDbDetails);
pgclient.connect()
    .then(() => console.log('PostgreSQL connected successfully!'))
    .catch(err => console.error('PostgreSQL connection error:', err)); // Added error handling for connection

let self = module.exports = { 
 
    CreateSlot:async(req, res) => {
        let { shift_id, start_time, end_time, status } = req.body;
        try {
            let query = `INSERT INTO slots (shift_id, start_time, end_time) 
                         VALUES ($1, $2, $3) RETURNING *`;
            let values = [slot_id, start_time, end_time];
            let result = await pgclient.query(query, values);
            res.send(result.rows[0]); // Return the newly created slot
        } catch (error) {
            console.error("Error in CreateSlot:", error); // Use console.error for errors
            res.status(500).send("Failed to create slot"); // Send a more specific status code
        }
    },
    getSlots:async(req, res) => {
        try {
            let query = `SELECT * FROM slots`;
            let result = await pgclient.query(query);
            if (result.rows.length > 0) {
                res.send(result.rows);
            } else {
                res.send("No slots found");
            }
        } catch (error) {
            console.error("Error in getSlots:", error); // Use console.error for errors
            res.status(500).send("Failed to retrieve slots"); // Send a more specific status code
        }
    }
}