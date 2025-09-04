import { Client } from 'pg';
import express from 'express';
const client = new Client("postgresql://neondb_owner:npg_5TlhJLw2UHAV@ep-icy-dust-adj47zfy-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'");
const app = express();
app.use(express.json());
const connectDB = async () => {
    try {
        await client.connect();
        console.log("Connected to the database");
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
    }
};
app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const city = req.body.city;
    const country = req.body.country;
    const pincode = req.body.pincode;
    const street = req.body.street;
    try {
        client.query("BEGIN;");
        const result = await client.query(`INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id;`, [username, email, password]);
        const user_id = result.rows[0].id;
        const addressQuery = `INSERT INTO addresses (user_id, city, country, pincode, street) VALUES ($1, $2, $3,$4, $5);`;
        const addressesInputres = await client.query(addressQuery, [user_id, city, country, pincode, street]);
        console.log(addressesInputres);
        await client.query("COMMIT;");
        res.json({
            "message": "User created successfully",
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            "message": "Error creating user",
        });
    }
});
app.get("/metadata", async (req, res) => {
    const id = req.query.id;
    const query1 = `SELECT username, email, id FROM users WHERE id = $1;`;
    const query2 = `SELECT city, country, pincode, street FROM addresses WHERE user_id = $1;`;
    const result1 = await client.query(query1, [id]);
    const result2 = await client.query(query2, [id]);
    res.json({
        "user": result1.rows[0],
        "address": result2.rows[0],
    });
});
app.get("/better-metadata", async (req, res) => {
    const id = req.query.id;
    const query = ` SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
            FROM users u
            JOIN addresses a ON u.id = a.user_id
            WHERE u.id = $1;`;
    // if the user don't had addresses then the join return nothing to overcome that we use left join or right join 
    try {
        const result = await client.query(query, [id]);
        res.json(result.rows[0]);
    }
    catch (error) {
        console.log(error);
        res.json({
            "message": "Error fetching metadata",
        });
    }
});
connectDB();
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=index.js.map