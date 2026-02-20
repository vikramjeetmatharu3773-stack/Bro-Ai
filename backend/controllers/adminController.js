const User = require('../models/User');
const Log = require('../models/Log');
const File = require('../models/File');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await Log.find().populate('userId', 'name email');
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const files = await File.find().populate('userId', 'name email');
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const logCount = await Log.countDocuments();
    const fileCount = await File.countDocuments();
    res.json({ userCount, logCount, fileCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};