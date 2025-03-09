const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
});

// **Pre-save Middleware** → Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Hash only if password is modified
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// **Instance Method** → Compare Passwords
userSchema.methods.comparePasswords = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
