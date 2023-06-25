const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const {sendActivationMail} = require("./mail-service");
const {getUserDto} = require("../dtos/user-dto");
const {generateTokens, saveToken} = require("./token-service");
const ApiError = require("../exeptions/api-error");
const {API_URL} = require("../utils/config");

exports.registration = async (email, password) => {
  const user = await User.findOne({email});
  if (user) {
    throw ApiError.ConflictError("Email Address Already in Use");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const activationLink = `${API_URL}/api/users/activation/${uuid.v4()}`;
  const newUser = await User.create({
    email,
    passwordHash,
    activationLink,
  });
  await sendActivationMail(email, activationLink);
  const userDto = getUserDto(newUser);
  const {accessToken, refreshToken} = generateTokens(userDto);
  await saveToken(userDto.id, refreshToken);

  return {accessToken, refreshToken, userDto};
};

exports.activate = async (activationLink) => {
  const user = User.findOne({activationLink})
  if (!user) {
    throw ApiError.BadRequest('Incorrect activation link')
  }
  user.isActivated = true;
  await user.save();
}