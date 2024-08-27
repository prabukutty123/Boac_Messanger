const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
app.use(bodyParser.json());

const SECRET_KEY = 'bxctasRA5j3ZK7E67oljevClO5j8QilVEaf6eGLXMErbRZ3toiCa2QXbFjg4'; // Use a strong, unique key
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myfast', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}) .then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));
// OTP Schema
const otpSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, expires: 300, default: Date.now }  // OTP expires in 5 minutes
});

const Otp = mongoose.model('Otp', otpSchema);
const userSchema = new mongoose.Schema({
  phoneNumber: String,
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);
const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  timestamp: { type: Date, default: Date.now },
});
const Message = mongoose.model('Message', messageSchema);


const FAST2SMS_API_KEY = 'bxctasRA5j3ZK7E67oljevClO5j8QilVEaf6eGLXMErbRZ3toiCa2QXbFjg4';

let otpStore = {}; // This is a temporary storage, ideally, use a database

// Endpoint to send OTP
app.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ success: false, message: 'Phone number is required' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await new Otp({ phoneNumber, otp }).save();

    const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
      route: 'otp',
      sender_id: 'FSTSMS',
      message: `Your OTP code is {{otp}}`,
      variables_values: otp,
      language: 'english',
      flash: '0',
      numbers: phoneNumber,
    }, {
      headers: {
        'authorization': FAST2SMS_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (response.data.return) {
      res.json({ success: true, message: 'OTP sent successfully' });
      console.log("OTP sent successfully");
    } else {
      res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Error sending OTP', error: error.message });
  }
});
// Endpoint to verify OTP and register/login user
// Verify OTP Endpoint
app.post('/verify-otp', async (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res.status(400).json({ success: false, message: 'Phone number and OTP are required' });
  }

  try {
    const record = await Otp.findOne({ phoneNumber, otp });

    // Log phone number and OTP for verification
    console.log('Phone number:', phoneNumber);
    console.log('Entered OTP:', otp);

    if (record) {
      // Check if the user already exists
      let user = await User.findOne({ phoneNumber });

      if (!user) {
        // If the user doesn't exist, create a new user
        user = new User({ phoneNumber });
        await user.save();
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

      res.json({ success: true, message: 'OTP verified successfully', token });
      console.log('Verification successful, token generated:', token);
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP' });
      console.log('Invalid OTP');
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Error verifying OTP', error: error.message });
  }
});


// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.user = user;
    next();
  });
};
// Update profile endpoint
app.post('/update-profile', authenticateToken, async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, email },
      { new: true }
    );

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error });
  }
});

// Endpoint to fetch user list excluding the logged-in user
app.get('/user-list', authenticateToken, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.userId } });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user list', error });
  }
});

// Middleware to authenticate token (placeholder)
app.use((req, res, next) => {
  // Simulate setting req.user.userId from token
  req.user = { userId: '60c72b2f9b1e8b3f20d3e3a7' }; // Example user ID
  next();
});



app.post('/send-message', authenticateToken, async (req, res) => {
  const { receiverId, message } = req.body;
  try {
    const newMessage = new Message({
      sender: req.user.userId,
      receiver: receiverId,
      message,
    });
    await newMessage.save();
    res.status(200).json({ message: 'Message sent successfully', newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message', error });
  }
});

// Endpoint to get messages between two users
app.get('/get-messages/:receiverId', authenticateToken, async (req, res) => {
  const { receiverId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.userId, receiver: receiverId },
        { sender: receiverId, receiver: req.user.userId },
      ],
    }).sort('timestamp');
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages', error });
  }
});
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
