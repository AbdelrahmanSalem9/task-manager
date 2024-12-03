const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullName: { 
      type: String, 
      required: true, 
      minLength: 3, 
      maxLength: 127 
    },
    isAdmin: { 
      type: Boolean, 
      required: true, 
      default: false 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true, 
      maxLength: 1024 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
    versionKey: false, // Remove `__v` field
  }
);

// Generate Authentication Token
userSchema.methods.genAuthToken = function () {
  const payload = {
    userid: this._id,
    isAdmin: this.isAdmin,
  };

  // Sign the token using the secret key
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '1h', // Set token expiration (optional, improves security)
  });
};

module.exports = mongoose.model("User", userSchema);
