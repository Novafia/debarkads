const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/teamSelection', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a User schema
const userSchema = new mongoose.Schema({
    name: String,
    team: String,
    tasks: [{ taskName: String, startTime: Date, endTime: Date, duration: Number, notes: String }]
});

const User = mongoose.model('User ', userSchema);

// API Endpoints
app.post('/api/users', async (req, res) => {
    const { name, team } = req.body;
    const newUser  = new User({ name, team });
    await newUser .save();
    res.status(201).send(newUser );
});

app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});