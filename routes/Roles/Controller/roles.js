const { Client } = require('pg');
const config = require('../../../config'); // Ensure this path is correct relative to this file

// Corrected: Use PGDbDetails (with capital D) to match your config file
let pgclient = new Client(config.PGDbDetails);
pgclient.connect()
    .then(() => console.log('PostgreSQL connected successfully!'))
    .catch(err => console.error('PostgreSQL connection error:', err)); // Added error handling for connection

let self = module.exports = { 
    CreateRole:async(req,res)=>{
        let {role_name}=req.body;
        try{
            let query = `INSERT INTO roles (role_name) VALUES ($1) RETURNING *`;
            let values = [role_name];
            let result = await pgclient.query(query, values);
            res.send(result.rows[0]); // Return the newly created role
        }
        catch (error) {
            console.error("Error in CreateRole:", error); // Use console.error for errors
            res.status(500).send("Failed to create role"); // Send a more specific status code
        }
    },
    getRolesList: async (req, res) => {
        try {
            let query = `SELECT * FROM roles`;
            let result = await pgclient.query(query);
            if (result.rows.length > 0) {
                res.send(result.rows);
            } else {
                res.send("No roles found");
            }
        } catch (error) {
            console.error("Error in getRolesList:", error); // Use console.error for errors
            res.status(500).send("Failed to retrieve roles list"); // Send a more specific status code
        }
    }
}