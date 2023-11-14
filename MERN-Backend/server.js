require('dotenv').config();
const { createServer } = require('http');
const { Server: WebSocketServer } = require('ws');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const client = require('mongodb').MongoClient;



const port = process.env.PORT || 5000;

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// middleware for handling CORS policy
app.use(cors());

// routes
const authRoutes = require('./routes/notes');
const { getRfidCard } = require('./controllers/noteController');
app.use('/auth', authRoutes);



const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/socket' });


wss.on('connection', (ws) => {
    ws.on('message', (data) => {
      // Handle incoming messages from clients if needed
    });
  
    ws.send('Welcome to the WebSocket server');
  });

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  server.listen(port, () => {
    console.log('Server is running on port', port);
  });
  console.log('Connected to db');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});



app.post('/getRfidCard', (req, res) => {
    
    getRfidCard(req, res, wss);
 
  });




module.exports = { };