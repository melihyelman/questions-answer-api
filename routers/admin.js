const express = require("express");
const {
  getAccessToRoute,
  getAdminAccess,
} = require("../middlewares/authorization/auth");
const {
  checkUserExist,
} = require("../middlewares/database/dataBaseErrorHelpers");
const { blockUser, deleteUser } = require("../controllers/admin");
//Block User
//Delete User
const router = express.Router();

// Her route da geçerli
router.use([getAccessToRoute, getAdminAccess]);

router.get("/block/:id", checkUserExist, blockUser);
router.delete("/user/:id", checkUserExist, deleteUser);

module.exports = router;
