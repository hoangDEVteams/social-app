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

        const users = await User.find()
        .skip(skip)
        .limit(limit);

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

// GET /api/users/:id – Xem chi tiết user
router.get("/displayUser/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Not found" });
            res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/api/users', async (req, res) => {
    const {
      username,
      gender,
      email,
      ageMin,
      ageMax,
      page = 1,
      limit = 10,
    } = req.query;
  
    const filter = {};
  
    if (username) filter.username = { $regex: username, $options: 'i' };
    if (email) filter.email = { $regex: email, $options: 'i' };
    if (gender !== undefined && gender !== '') filter.gender = parseInt(gender);
    if (ageMin || ageMax) {
      filter.age = {};
      if (ageMin) filter.age.$gte = parseInt(ageMin);
      if (ageMax) filter.age.$lte = parseInt(ageMax);
    }
  
    const skip = (page - 1) * limit;
  
    const [data, total] = await Promise.all([
      User.find(filter).skip(skip).limit(limit),
      User.countDocuments(filter)
    ]);
  
    const totalPages = Math.ceil(total / limit);
  
    res.json({ data, totalPages });
  });
module.exports = router;
