// import multer from "multer";

// const upload = multer();

// const handleFormData = (req, res, next) => {

//   upload.none()(req, res, (err) => {
//     if (err) {
//       return res.status(400).json({ error: "Invalid form data" });
//     }

//     req.body = Object.assign({}, req.body);
//     next();
//   });
// };

// export default handleFormData;

import multer from "multer";

// Initialize multer without storage configuration
const upload = multer();

// Middleware to handle form data
const handleFormData = (req, res, next) => {
  upload.none()(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: "Invalid form data" });
    }

    req.body = Object.assign({}, req.body);
    next();
  });
};

export default handleFormData;
