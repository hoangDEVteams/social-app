// userRoutes.js
const express = require("express");
const path = require("path");
const router = express.Router();
const User = require("../DTO/DTOUser");

// Lấy danh sách user
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/friends.html"));
});

router.get("/displayUser", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit);

    const total = await User.countDocuments();

    res.json({
      data: users,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Xem chi tiết user
router.get("/viewUser/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/view-user.html"));
});
router.get("/viewUser/Detail/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
