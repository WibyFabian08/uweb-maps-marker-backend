const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({
      status: "ok",
      newUser,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "register failed",
      err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "user not found",
      });
    }

    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkPassword) {
      return res.status(403).json({
        status: "error",
        message: "wrong password",
      });
    }

    return res.status(200).json({
      status: "ok",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "login failed",
    });
  }
};
