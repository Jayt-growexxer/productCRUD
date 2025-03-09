const User = require("../Model/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  const { name, email, password, confirmPassword, userType } = req.body;

  // 1. Validate required fields
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // 2. Validate password match
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password and Confirm Password do not match",
    });
  }

  try {
    // 3. Create user
    const user = await User.create({ name, email, password, userType });

    // 4. Generate token
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "90d",
    });

    res.status(201).json({
      success: true,
      message: "User successfully created",
      token,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not created",
      error: error.message,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate email and password input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    // 2. Find user by email and select password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3. Compare password (assuming bcrypt is used)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 4. Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "90d",
    });

    res.status(200).json({
      success: true,
      message: "User successfully logged in",
      token,
      data: {
        email: user.email,
        password: password,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email, newpassword, newConfirmPassword } = req.body;

    // Validate input fields
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter an email address" });
    }
    if (!newpassword || !newConfirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please enter both new password and confirm password",
      });
    }
    if (newpassword !== newConfirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist. Please sign up.",
      });
    }

    // Hash the new password
    // const hashedPassword = await bcrypt.hash(newpassword, 12);

    // Update password
    // user.password = hashedPassword;
    user.password = newpassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
