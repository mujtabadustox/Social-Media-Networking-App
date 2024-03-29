const mongoose = require("mongoose");
const uuidv1 = require("uuidv1");
const crypto = require("crypto");

const organizationSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    profession: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
    },
    points: {
      type: Number,
      trim: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    salt: String,

    hobl: Array,
    members: Array,
    interested: Array,
    displaypicture: String,
    invitedTo: Array,
    following: Array,
  },
  {
    timestamps: true,
  }
);

// virtual field
organizationSchema.virtual("password").set(function (password) {
  // create temp variable called _password
  this._password = password;

  // generate a timestamp, uuidv1 gives us the unix timestamp
  this.salt = uuidv1();

  // encrypt the password function call
  this.hashedPassword = this.encryptPassword(password);
});

// methods
organizationSchema.methods = {
  encryptPassword: function (password) {
    if (!password) return "";

    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },
};

module.exports = mongoose.model("Organization", organizationSchema);
