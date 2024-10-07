import multer from "multer";

const upload = multer();

const handleFormData = (req, res, next) => {
  upload.none()(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: "Invalid form data" });
    }

    console.log(req);

    req.body = Object.assign({}, req.body);
    next();
  });
};

export default handleFormData;
