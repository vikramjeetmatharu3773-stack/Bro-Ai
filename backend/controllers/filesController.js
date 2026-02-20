const multer = require('multer');
const AWS = require('aws-sdk');
const File = require('../models/File');
const Log = require('../models/Log');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const upload = multer({ storage: multer.memoryStorage() });

exports.uploadFile = [
  upload.single('file'),
  async (req, res) => {
    try {
      const { userId } = req.body;
      const file = req.file;

      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: `${userId}/${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read'
      };

      const uploadResult = await s3.upload(params).promise();

      const newFile = new File({
        userId,
        filename: uploadResult.Key,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        url: uploadResult.Location
      });
      await newFile.save();

      // Log
      await Log.create({ userId, action: 'file_upload', details: { filename: file.originalname } });

      res.json({ file: newFile });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.getFiles = async (req, res) => {
  try {
    const { userId } = req.params;
    const files = await File.find({ userId });
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};