const mongoose = require("mongoose");  
// 引入 mongoose，用来操作 MongoDB 数据库

const Schema = mongoose.Schema;  
// 从 mongoose 中获取 Schema，用来定义数据模型结构

// 定义用户数据表结构（Schema）
const userSchema = new Schema(
  {
    name: {
      type: String,      // 用户姓名，字符串类型
      required: true,    // 必填
    },
    email: {
      type: String,      // 用户邮箱
      required: true,    // 必填
      unique: true,      // 唯一，不允许重复（防止多个用户用同一个邮箱注册）
    },
    password: {
      type: String,      // 用户密码（一般存储加密后的字符串）
      required: true,    // 必填
    },
    phone_number: {
      type: String,      // 用户手机号
      required: true,    // 必填
    },
    gender: {
      type: String,      // 用户性别（可以是 "male" / "female" / "other"）
      required: true,    // 必填
    },
    date_of_birth: {
      type: Date,        // 用户生日，存储为日期类型
      required: true,    // 必填
    },
    membership_status: {
      type: String,      // 会员状态（例如 "active" / "inactive" / "vip"）
      required: true,    // 必填
    },
  },
  { timestamps: true }   
  // 自动生成两个时间字段：
  // createdAt —— 文档创建时间
  // updatedAt —— 文档最后更新时间
);

// 导出模型，名字叫 "User"
// MongoDB 里会自动对应为 "users" 集合
module.exports = mongoose.model("User", userSchema);



/* {
  "name": "Matti Seppänen",
  "email": "matti@example.com",
  "password": "M@45mtg$",
  "phone_number": "+358401234567",
  "gender": "Male",
  "date_of_birth": "2000-01-15",
  "membership_status": "Active"
} 
 
let userArray = [];

let nextId = 1;

function getAll() {
  return userArray;
}

function addOne(userData) {
  // Check if any parameter is empty or undefined
  const {
    name,
    email,
    password,
    phone_number,
    gender,
    date_of_birth,
    membership_status,
  } = userData;
  if (
    !name ||
    !email ||
    !password ||
    !phone_number ||
    !gender ||
    !date_of_birth ||
    !membership_status
  ) {
    return false;
  }

  const newItem = {
    id: nextId++,
    ...userData,
  };

  userArray.push(newItem);
  return newItem;
}

function findById(id) {
  const numericId = Number(id);
  const item = userArray.find((item) => item.id === numericId);
  return item || false;
}

function updateOneById(id, updatedData) {
  const user = findById(id);
  if (user) {
    Object.assign(user, updatedData); // Update properties using Object.assign
    return user;
  }
  return false;
}

function deleteOneById(id) {
  const item = findById(id);
  if (item) {
    const initialLength = userArray.length;
    userArray = userArray.filter((item) => item.id !== Number(id));
    return userArray.length < initialLength; // Indicate successful deletion if the length has decreased
  }
  return false; // Return false if the item was not found
}

if (require.main === module) {
  // Add user
  let result = addOne({
    name: "Matti Seppänen",
    email: "matti@example.com",
    password: "M@45mtg$",
    phone_number: "+358401234567",
    gender: "Male",
    date_of_birth: "2000-01-15",
    membership_status: "Active",
  });
  console.log("result", result);
  console.assert(typeof result === "object", "Result should be an object");

  // Add another user
  result = addOne({
    name: "Anna Virtanen",
    email: "anna@example.com",
    password: "A@78nna$",
    phone_number: "+358401234568",
    gender: "Female",
    date_of_birth: "1995-05-20",
    membership_status: "Active",
  });
  console.log(result);
  console.assert(typeof result === "object", "Result should be an object");

  // Get all users
  const allUsers = getAll();
  console.log("getAll called:", allUsers);
  console.assert(Array.isArray(allUsers), "getAll should return an array");
  console.assert(
    allUsers.length === 2,
    "getAll should return an array of length 2"
  );

  // Find user by ID
  const user = findById(1);
  console.log("findById called:", user);
  console.assert(typeof user === "object", "findById should return an object");

  // Update user by ID
  const updatedUser = updateOneById(1, {
    phone_number: "+358401234569",
    membership_status: "Inactive",
  });
  console.log("updateOneById called:", updatedUser);
  console.assert(
    typeof updatedUser === "object",
    "updateOneById should return an object"
  );

  // Verify update
  const updatedUserCheck = findById(1);
  console.log("findById called after item updated:", updatedUserCheck);
  console.assert(
    updatedUserCheck.phone_number === "+358401234569" &&
      updatedUserCheck.membership_status === "Inactive",
    "User should be updated"
  );

  // Delete user by ID
  const deletedUser = deleteOneById(1);
  console.log("deleteOneById called:", deletedUser);
  console.assert(deletedUser === true, "deleteOneById should return true");

  // Verify deletion
  const deletedUserCheck = findById(1);
  console.log("findById called after item deleted:", deletedUserCheck);
  console.assert(deletedUserCheck === false, "User should be deleted");
}

const User = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById,
};

module.exports = User;
*/