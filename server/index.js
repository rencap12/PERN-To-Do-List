const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require('path');
const bodyParser = require('body-parser');

// Middleware
app.use(cors());
app.use(express.json()); // Gives access to request body
app.use(bodyParser.json());

// Routes

// Create a todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const result = await pool.query("INSERT INTO todo (description) VALUES($1)", [description]);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a todo
app.delete("/todos/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const queryText = 'DELETE FROM todo WHERE todo_id = $1';
        await pool.query(queryText, [id]);
        
        // Send a success response
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, '..', 'build')));

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
