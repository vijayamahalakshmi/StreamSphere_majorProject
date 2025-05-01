const express = require("express");
const app = express();
const PORT = 8000;
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000', // Your React app's URL
    credentials: true
  }))
app.use(express.json());
app.use(cookieParser());
dotenv.config()
require('./config/db');

const AuthRoutes = require('./routes/user');
const VideoRoutes = require('./routes/video');
const CommentRoutes = require('./routes/comment');

app.use('/auth',AuthRoutes)
app.use('/api',VideoRoutes);
app.use('/api/video',VideoRoutes);
app.use('/commentApi',CommentRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))