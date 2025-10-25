const User = require("../models/userModel");
const jwt = require('jsonwebtoken');

require('dotenv').config()

const bcrypt = require('bcryptjs')

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check existing user
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).send({ msg: "User already exists", success: false });
    }

    // Create new user (default role = 'admin' or 'user')
    const user = await User.create({
      name,
      email,
      password
    });

    res.status(200).send({success: true, msg: "Registered successfully", user
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).send({ msg: "Server error", error: error.message });
  }
}


async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } })
        if (!user) return res.status(404).send({ msg: "User not found " })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send({ msg: "Invalid Credentials" })

        const token = jwt.sign({ id: user.id }, process.env.SECREATE_KEY, { expiresIn: '1h' });

        res.status(200).send({
            success: true,
      msg: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email },
        });

    } catch (error) {
        res.status(500).send({ msg: 'server error' })
    }

}

const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email"]
    });
    if (!user) return res.status(404).send({ msg: "User not found" });
    res.status(200).send({ success: true, user });
  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
};


module.exports = {
    register,
    login,
    getMe
}