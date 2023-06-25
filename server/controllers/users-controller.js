require("express-async-errors");
const { registration, activate } = require("../services/users-service");
const {CLIENT_URL} = require('../utils/config')

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

exports.activation = async (req, res) => {
  const activationLink = req.params.link
  await activate(activationLink)
  return res.redirect(CLIENT_URL)
};
