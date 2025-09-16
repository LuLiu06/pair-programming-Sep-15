const User = require('../models/userModel');  
// 引入 User 模型，用于操作数据库中的 users 集合
const mongoose = require("mongoose");  
// 引入 mongoose，用于验证 ObjectId 和数据库操作

// GET /users —— 获取所有用户信息
const getAllUsers = async (req, res) => {
  try {
    // 从数据库中查找所有 User，按创建时间倒序排序
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);  // 成功返回 200，并输出 JSON 数据
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users" });  // 服务器错误
  }
};

// POST /users —— 创建新用户
const createUser = async (req, res) => {
  try {
    // 根据请求体数据创建一个新的 User 文档
    const newUser = await User.create({ ...req.body });
    res.status(201).json(newUser);  // 成功返回 201，并返回新建的用户数据
  } catch (error) {
    res.status(400).json({ message: "Failed to create user", error: error.message }); // 数据校验失败
  }
};

// GET /users/:userId —— 根据 ID 获取单个用户信息
const getUserById = async (req, res) => {
  const { userId } = req.params;  // 从请求参数里取出 userId

  // 检查 ID 是否是有效的 MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    // 在数据库里查找对应 ID 的 User
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json(user);  // 找到就返回
    } else {
      res.status(404).json({ message: "User not found" });  // 没找到返回 404
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user" }); // 数据库查询错误
  }
};

// PUT /users/:userId —— 更新某个用户信息
const updateUser = async (req, res) => {
  const { userId } = req.params;  // 获取请求参数里的 userId

  // 验证 ID 是否有效
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    // 使用 findOneAndUpdate 更新数据，new: true 表示返回更新后的数据
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },   // 查找条件
      { ...req.body },   // 更新的数据
      { new: true }      // 返回更新后的文档
    );
    if (updatedUser) {
      res.status(200).json(updatedUser);  // 更新成功
    } else {
      res.status(404).json({ message: "User not found" });  // 没找到要更新的数据
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });  // 更新出错
  }
};

// DELETE /users/:userId —— 删除某个用户
const deleteUser = async (req, res) => {
  const { userId } = req.params;  // 获取 userId

  // 验证 ID 是否有效
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    // 根据 ID 删除文档
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    if (deletedUser) {
      res.status(204).json({ message: "User deleted successfully" }); // 删除成功，204 表示无内容
    } else {
      res.status(404).json({ message: "User not found" });  // 没找到要删除的
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });  // 删除失败
  }
};

// 导出所有控制器函数，供路由使用
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};



/*
const User = require("../models/userModel");

// GET /users
const getAllUsers = (req, res) => {
  const users = User.getAll();
  res.json(users);
};

// POST /users
const createUser = (req, res) => {
  const newUser = User.addOne({ ...req.body }); // Spread the req.body object

  if (newUser) {
    res.status(201).json(newUser);
  } else {
    // Handle error (e.g., failed to create user)
    res.status(400).json({ message: "Invalid user data" });
  }
};
 
// GET /users/:userId
const getUserById = (req, res) => {
  const userId = req.params.userId;
  const user = User.findById(userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// PUT /users/:userId
const updateUser = (req, res) => {
  const userId = req.params.userId;
  const updatedUser = User.updateOneById(userId, { ...req.body }); // Spread the req.body object

  if (updatedUser) {
    res.json(updatedUser);
  } else {
    // Handle update failure (e.g., user not found)
    res.status(404).json({ message: "User not found" });
  }
};

// DELETE /users/:userId
const deleteUser = (req, res) => {
  const userId = req.params.userId;
  const isDeleted = User.deleteOneById(userId);

  if (isDeleted) {
    res.status(204).send();
  } else {
    // Handle deletion failure (e.g., user not found)
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
*/