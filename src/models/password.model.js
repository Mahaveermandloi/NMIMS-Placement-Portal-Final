// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

// const { Schema } = mongoose;

// const passwordSchema = new Schema(
//   {
//     student_id: {
//       type: Schema.Types.ObjectId,
//       ref: "Student",
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     accessToken: {
//       type: String,
//       default: "",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// passwordSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   try {
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// passwordSchema.methods.isPasswordCorrect = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// passwordSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//     }
//   );
// };

// const Password = mongoose.model("Password", passwordSchema);

// export default Password;

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { Schema } = mongoose;

const passwordSchema = new Schema(
  {
    student_id: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    refreshToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
passwordSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to validate password
passwordSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate access token
passwordSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Method to generate refresh token
passwordSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const Password = mongoose.model("Password", passwordSchema);

export default Password;
