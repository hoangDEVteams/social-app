// userRoutes.js
const express = require("express");
const path = require("path");
const router = express.Router();
const { connectDB } = require("./mongodb");

// Lấy danh sách user (phân trang)
router.get("/displayUser", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    // Kết nối tới MongoDB và lấy collection Users
    const { collection } = await connectDB();

    // Tạo query search nếu có tìm kiếm
    let query = {};
    if (search) {
      query = {
        $or: [
          { userId: { $regex: search, $options: "i" } },
          { username: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } }
        ]
      };
    }

    // Truy vấn người dùng
    const users = await collection.find(query).skip(skip).limit(limit).toArray();
    const total = await collection.countDocuments(query);

    res.json({
      data: users,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Lỗi lấy danh sách user:", err);
    res.status(500).json({ message: "Lỗi server!" });
  }
});
// Lấy danh sách user
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/friends.html"));
});

router.get("/editUser", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/edit-user.html"));
});

async function deleteMultipleUsers(userIds) {
  try {
    const { collection } = await connectDB();
    const result = await collection.deleteMany({ userId: { $in: userIds } });
    console.log(`${result.deletedCount} users deleted with IDs:`, userIds);
    return result;
  } catch (error) {
    console.error("Error deleting multiple users:", error);
    throw error;
  }
}

router.delete("/api/delete-multiple-users", async (req, res) => {
  try {
    const { userIds } = req.body;
    
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ error: "Vui lòng chọn ít nhất một người dùng để xóa" });
    }
    
    const result = await deleteMultipleUsers(userIds);
    
    res.json({
      message: `Đã xóa thành công ${result.deletedCount} người dùng`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error("Lỗi khi xóa nhiều người dùng:", error);
    res.status(500).json({ error: "Lỗi server khi xóa người dùng" });
  }
});

router.get("/displayUser/:id", async (req, res) => {
  try {
    const { collection } = await connectDB();
    const userId = req.params.id;
    const user = await collection.findOne({ userId: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// API lấy chi tiết user
router.get("/viewUser/Detail/:id", async (req, res) => {
  try {
    const { collection } = await connectDB();
    const userId = req.params.id;

    const user = await collection.findOne({ userId: userId });

    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });
    res.json(user);
  } catch (err) {
    console.error("Lỗi khi xem chi tiết user:", err);
    res.status(500).json({ message: "Lỗi server!" });
  }
});
router.get("/viewUser/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/view-user.html"));
});

module.exports = router;
