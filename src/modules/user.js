const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    emailId: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      required: true,
      validate(value) {
        return value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      validate(value) {
        return value.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
        );
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      lowercase: true,
      validate(value) {
        return ["male", "female", "other"].includes(value);
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://img.magnific.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4195.jpg?semt=ais_hybrid&w=740&q=80",
    },
    bio: {
      type: String,
      trim: true,
      maxLength: 100,
      default: "Cool Developer!",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true },
);

const User = mongoose.model("user", userSchema);

module.exports = User;
