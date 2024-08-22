// code of upload.js middleware

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dyvoxcqpt',
  api_key: '531256787311845',
  api_secret: 'PqWTxeO6qWUugg7380bVOAlIswg',
  secure: true,
});

const uploadVideo = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { resource_type: "video" });
    return result;
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
};

module.exports = {
  uploadVideo
};
