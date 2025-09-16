const Tour = require('../models/tourModel');  
// 引入 Tour 模型，用于操作数据库中的 tours 集合
const mongoose = require("mongoose");  
// 引入 mongoose，用于验证 ObjectId 和数据库操作

// GET /tours —— 获取所有旅游信息
const getAllTours = async (req, res) => {
  try {
    // 从数据库中查找所有 Tour，按创建时间倒序排序
    const tours = await Tour.find({}).sort({ createdAt: -1 });
    res.status(200).json(tours);  // 成功返回 200，并输出 JSON 数据
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve tours" });  // 服务器错误
  }
};

// POST /tours —— 新建一条旅游信息
const createTour = async (req, res) => {
  try {
    // 根据请求体数据创建一个新的 Tour 文档
    const newTour = await Tour.create({ ...req.body });
    res.status(201).json(newTour);  // 成功返回 201，并返回新建的 Tour
  } catch (error) {
    res.status(400).json({ message: "Failed to create tour", error: error.message }); // 数据校验失败
  }
};

// GET /tours/:tourId —— 根据 ID 获取单条旅游信息
const getTourById = async (req, res) => {
  const { tourId } = req.params;  // 从请求参数里取出 tourId

  // 检查 ID 是否是有效的 MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.status(400).json({ message: "Invalid tour ID" });
  }

  try {
    // 在数据库里查找对应 ID 的 Tour
    const tour = await Tour.findById(tourId);
    if (tour) {
      res.status(200).json(tour);  // 找到就返回
    } else {
      res.status(404).json({ message: "Tour not found" });  // 没找到返回 404
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve tour" }); // 数据库查询错误
  }
};

// PUT /tours/:tourId —— 更新某条旅游信息
const updateTour = async (req, res) => {
  const { tourId } = req.params;  // 获取请求参数里的 tourId

  // 验证 ID 是否有效
  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.status(400).json({ message: "Invalid tour ID" });
  }

  try {
    // 使用 findOneAndUpdate 更新数据，new: true 表示返回更新后的数据
    const updatedTour = await Tour.findOneAndUpdate(
      { _id: tourId },   // 查找条件
      { ...req.body },   // 更新的数据
      { new: true }      // 返回更新后的文档
    );
    if (updatedTour) {
      res.status(200).json(updatedTour);  // 更新成功
    } else {
      res.status(404).json({ message: "Tour not found" });  // 没找到要更新的数据
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update tour" });  // 更新出错
  }
};

// DELETE /tours/:tourId —— 删除某条旅游信息
const deleteTour = async (req, res) => {
  const { tourId } = req.params;  // 获取 tourId

  // 验证 ID 是否有效
  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.status(400).json({ message: "Invalid tour ID" });
  }

  try {
    // 根据 ID 删除文档
    const deletedTour = await Tour.findOneAndDelete({ _id: tourId });
    if (deletedTour) {
      res.status(204).json({ message: "Tour deleted successfully" }); // 删除成功，204 表示无内容
    } else {
      res.status(404).json({ message: "Tour not found" });  // 没找到要删除的
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete tour" });  // 删除失败
  }
};

// 导出所有控制器函数，供路由使用
module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};





/* const Tour = require("../models/tourModel");

// GET /tours
const getAllTours = (req, res) => {
  const tours = Tour.getAll();
  res.json(tours);
};

// POST /tours
const createTour = (req, res) => {
  const newTour = Tour.addOne({ ...req.body }); // Spread the req.body object

  if (newTour) {
    res.status(201).json(newTour); // 201 Created
  } else {
    // Handle error (e.g., failed to create tour)
    res.status(400).json({ message: "Invalid tour data" });
  }
};
 
// GET /tours/:tourId
const getTourById = (req, res) => {
  const tourId = req.params.tourId;
  const tour = Tour.findById(tourId);
  if (tour) {
    res.json(tour);
  } else {
    res.status(404).json({ message: "Tour not found" });
  }
};

// PUT /tours/:tourId
const updateTour = (req, res) => {
  const tourId = req.params.tourId;
  const updatedTour = Tour.updateOneById(tourId, { ...req.body }); // Spread the req.body object

  if (updatedTour) {
    res.json(updatedTour);
  } else {
    // Handle update failure (e.g., tour not found)
    res.status(404).json({ message: "Tour not found" });
  }
};

// DELETE /tours/:tourId
const deleteTour = (req, res) => {
  const tourId = req.params.tourId;
  const isDeleted = Tour.deleteOneById(tourId);

  if (isDeleted) {
    res.status(204).send(); // 204 No Content
  } else {
    // Handle deletion failure (e.g., tour not found)
    res.status(404).json({ message: "Tour not found" });
  }
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
*/