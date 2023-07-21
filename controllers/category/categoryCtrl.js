const expressAsyncHandler = require("express-async-handler");
const Category = require("../../model/category/Category");

//create category
const CreateCategoryCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.create({
      user: req.user._id,
      title: req.body.title,
    });
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

// fetch all categories
const fetchCategoriesCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({})
      .populate("user") // populate is used for fetchinge user details from user id
      .sort("-createdAt");
    res.json(categories);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  CreateCategoryCtrl,
  fetchCategoriesCtrl,
};
