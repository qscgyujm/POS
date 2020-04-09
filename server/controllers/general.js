import fs from 'fs';
import AWS from 'aws-sdk';

export const fileUpload = async (req, res) => {
  if (!req.file) {
    return res.sendStatus(404);
  }

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: req.file.filename,
    Body: fs.createReadStream(req.file.path),
    ACL: 'public-read',
    ContentType: req.file.mimetype,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log('Error occured while trying to upload to S3 bucket', err);
    }

    if (data) {
      fs.unlinkSync(req.file.path); // Empty temp folder

      res
        .status(200)
        .send(data.Location);
    }
  });
};


export const checkAuth = async (req, res) => {
};
