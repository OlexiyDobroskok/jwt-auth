const router = require("express").Router();
const {
  activation,
  getUsers,
  login,
  logout,
  refresh,
  registration,
} = require("../controllers/users-controller");

router.get("/", getUsers);
router.post("/registration", registration);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refresh);
router.get("/activation/:link", activation);

module.exports = router;
