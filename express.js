const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Project = require('./models/mongo');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://yoursvishnation:15P13al23V92u@vishnu.4afqs.mongodb.net/Rescource', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (if you have any)
app.use(express.static('public'));

// Handle form submission and save to database
app.post('/add_to_db', async (req, res) => {
    const { project_name, project_description, response, response2, response3, response4 } = req.body;

    try {
        const project = new Project({
            projectName: project_name,
            projectDesc: project_description,
            cost: response,
            time: response2,
            manPower: response3,
            involvedDepts: response4
        });

        await project.save();
        res.sendFile(path.join(__dirname, '/templates/index.html')); // Replace with the actual path
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving to database');
    }
});

// Route to get all projects from the database
app.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find(); // Retrieve all projects from the database
        res.json(projects); // Send the retrieved data as JSON response
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data from database');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
