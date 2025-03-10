const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true, // Ensures unique emails
    lowercase: true, // Converts emails to lowercase
    trim: true,
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: 8,
    select: false, // Excludes password from queries
  },
  userType: {
    type: String,
    enum: ["Customer", "Admin"], // Restrict to valid roles
    default: "Customer",
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  profileImage: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?q=80&w=2099&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  passwordChangeAT: Date,
});

// **Pre-save Middleware** → Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Hash only if password is modified
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordChangeAT = Date.now() - 1000;
  next();
});

// **Instance Method** → Compare Passwords
userSchema.methods.comparePasswords = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangeAt) {
    const changedTimestamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimestamp; // Returns true if password was changed after token was issued
  }
  return false; // If password was never changed, return false
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex"); // Generate raw token

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex"); // Hash token before storing

  console.log(this.passwordResetToken, resetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Set expiration (10 minutes)

  return resetToken; // Return raw token (to be sent via email)
};

const User = mongoose.model("User", userSchema);
module.exports = User;
