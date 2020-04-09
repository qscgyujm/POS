import multer from 'multer';
import path from 'path';
import fs from 'fs';

// multer
// https://www.npmjs.com/package/multer

// Issue:
// Q1: form-data can't find body
// A1: https://medium.com/cubemail88/node-js-express-js-body-parser-%E8%99%95%E7%90%86multipart-form-data%E7%9A%84%E8%A7%A3%E6%B1%BA%E6%96%B9%E6%A1%88-d89d2699b9f

//  store path
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(`${__dirname}/../public`)) {
      fs.mkdirSync(`${__dirname}/../public`);
    }

    cb(null, path.join(`${__dirname}/../public`));
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getMilliseconds().toString()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png'
      || file.mimetype === 'image/jpg'
      || file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export default multer({
  storage: fileStorage,
  fileFilter,
}).single('image');


// export default (req, res, next) => {
//   const upload = multer({
//     storage: fileStorage,
//     fileFilter,
//   }).single('image');

//   return upload(req, res, (error) => {
//     if (error) {
//       console.log('error', error);
//     }

//     next();
//   });
// };
