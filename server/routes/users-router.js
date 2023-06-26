const router = require("express").Router();
const {
  activation,
  getUsers,
  login,
  logout,
  refresh,
  registration,
} = require("../controllers/users-controller");
const { body } = require("express-validator");
const { authorization } = require("../utils/middleware");

router.get("/", authorization, getUsers);
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  registration
);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refresh);
router.get("/activation/:link", activation);

module.exports = router;
