const { Client } = require('pg');
const config = require('../../../config'); // Ensure this path is correct relative to this file

// Corrected: Use PGDbDetails (with capital D) to match your config file
let pgclient = new Client(config.PGDbDetails);
pgclient.connect()
    .then(() => console.log('PostgreSQL connected successfully!'))
    .catch(err => console.error('PostgreSQL connection error:', err)); // Added error handling for connection

let self = module.exports = { 
 
    CreateSchedule: async (req, res) => {
        let { staff_id, shift_id, slot_ids=[] } = req.body;
        try {
            //slot_ids datatype is integer[] on postgres
           let query = `INSERT INTO schedules (staff_id, shift_id, slot_ids)
                         VALUES ($1, $2, $3) RETURNING *`;
            let values = [staff_id, shift_id, slot_ids];
            let result = await pgclient.query(query, values);
            res.send(result.rows[0]); // Return the newly created schedule  
        } catch (error) {
            console.error("Error in CreateSchedule:", error); // Use console.error for errors
            res.status(500).send("Failed to create schedule"); // Send a more specific status code
        }
    },
    getSchedules:async(req, res) => {
        try {
            let query = `SELECT * FROM schedules`;
            let result = await pgclient.query(query);
            if (result.rows.length > 0) {
                res.send(result.rows);
            } else {
                res.send("No schedules found");
            }
        } catch (error) {
            console.error("Error in getSchedules:", error); // Use console.error for errors
            res.status(500).send("Failed to retrieve schedules"); // Send a more specific status code
        }
    }
}