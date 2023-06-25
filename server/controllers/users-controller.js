const { registration } = require("../services/users-service");
require("express-async-errors");

exports.registration = async (req, res) => {
  const { email, password } = req.body;
  const { accessToken, refreshToken, userDto } = await registration(
    email,
    password
  );
  const maxAge = 30 * 24 * 60 * 60;
  res.cookie("refreshToken", refreshToken, {
    maxAge,
    httpOnly: true,
  });
  return res.status(201).json({ accessToken, userDto });
};

exports.login = async (req, res) => {};

exports.logout = async (req, res) => {};

exports.refresh = async (req, res) => {};

exports.getUsers = async (req, res) => {
  return res.json([123, 1212]);
};

exports.activation = async (req, res) => {};
