const router = require('express').Router();
const User = require('../models/User.js');
const authValidator = require('../util/loginValidator.js');
const bcrypt = require('bcrypt');

router.post('/', authValidator, async (req, res) => {
  try {
    // Validate email
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate JWT
    const token = user.genAuthToken();
    res.header("x-auth-token", token);
    res.status(200).json({ message: "You are IN!!", token });
  } catch (error) {
    console.error("Error during authentication:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
