const Organization = require("../models/organization");
const Event = require("../models/event");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.registerOrg = async (req, res) => {
  // check if user already exists
  const usernameExists = await Organization.findOne({
    username: req.body.username,
  });
  const emailExists = await Organization.findOne({
    email: req.body.email,
  });

  if (usernameExists) {
    return res.status(403).json({
      error: "Username is taken",
    });
  }
  if (emailExists) {
    return res.status(403).json({
      error: "Email is taken",
    });
  }

  // if new user, create a new user
  const organization = new Organization(req.body);
  await organization.save();

  res.status(201).json({
    message: "Signup Successful! Please Login to proceed",
  });
};

exports.loginOrg = async (req, res) => {
  // find the user based on email
  const { email, password } = req.body;

  await Organization.findOne({ email }).exec((err, organization) => {
    // if err or no user
    if (err || !organization) {
      return res.status(401).json({
        error: "Invalid Credentials",
      });
    }

    // if user is found, we use the authenticate method from the model
    if (!organization.authenticate(password)) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // generate a token with user id and jwt secret
    const token = jwt.sign({ _id: organization._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // persist the token as 'jwt' in cookie with an expiry date
    res.cookie("jwt", token, { expire: new Date() + 9999, httpOnly: true });

    // return the response with user
    const { username } = organization;
    return res.json({
      message: "Login Successful!",
      username,
    });
  });
};

exports.logoutOrg = (req, res) => {
  // clear the cookie
  res.clearCookie("jwt");

  return res.json({
    message: "Logout Successful!",
  });
};

exports.getLoggedInOrg = (req, res) => {
  const { username } = req.organization;

  return res.status(200).json({
    message: "User is still logged in",
    username,
  });
};

// READ Students
exports.getOrg = (req, res) => {
  Organization.find((error, data) => {
    if (error) {
      return res.status(401).json({
        error: "Retrieve Failed",
      });
    } else {
      return res.json({
        data,
      });
    }
  });
};

// READ Students
exports.getOneOrg = (req, res) => {
  Organization.findOne(
    { username: { $eq: req.params.username } },
    (error, data) => {
      if (error) {
        return res.status(401).json({
          error: "Retrieve Failed",
        });
      } else {
        return res.json({
          message: "Lmao",
          data,
        });
      }
    }
  );
};

exports.addFollowing = async (req, res) => {
  const following = await Organization.findOne({
    username: req.params.friendusername,
  });
  const organization = await Organization.findOneAndUpdate(
    { username: req.params.username },
    { $push: { friends: req.params.friendusername } }
  );
  organization.save();
  console.log("USER", organization);
  console.log("following", following);
  return res.send(organization);
};

exports.followEvents = async (req, res) => {
  const organization = await Organization.findOneAndUpdate(
    { username: req.params.username },
    { $push: { interested: req.params.eventname } }
  );

  const event = await Event.findOneAndUpdate(
    { eventname: req.params.eventname },
    { $push: { going: req.params.username } }
  );
  organization.save();
  event.save();
  console.log("USER", organization);
  return res.send(organization);
};

exports.sendInvite = async (req, res) => {
  const organization = await Organization.findOneAndUpdate(
    { username: req.params.friendusername },
    { $push: { invitedTo: req.params.eventname } }
  );

  const event = await Event.findOneAndUpdate(
    { eventname: req.params.eventname },
    { $push: { invited: req.params.friendusername } }
  );
  organization.save();
  event.save();
  console.log("USER", organization);
  return res.send(organization);
};
