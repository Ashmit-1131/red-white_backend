const express = require("express");
const jwt = require("jsonwebtoken");
const { cartNorderValidator } = require("../middlewares/cart&orderValidator");
const { BlogsModel } = require("../model/Blogs.Model");
const blogRouter = express.Router();
require("dotenv").config();


blogRouter.get("/", async (req, res) => {
  try {
    const data = await BlogsModel.find();

    res.send({
      message: "All blog data",
      status: 1,
      data: data,
      error: false,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong: " + error.message,
      status: 0,
      error: true,
    });
  }
});
blogRouter.get("/user", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SecretKey);
    const { userId: user } = decoded;

    const data = await BlogsModel.find({ user });

    res.send({
      message: "All cart data",
      status: 1,
      data: data,
      error: false,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong: " + error.message,
      status: 0,
      error: true,
    });
  }
});

blogRouter.get("/:id", async (req, res) => {
  let { id: _id } = req.params;
  try {
    let data = await BlogsModel.find({ _id });
    res.send({
      message: "All products data",
      status: 1,
      data: data,
      error: false,
    });
  } catch (error) {
    res.send({
      message: "Something went wrong: " + error.message,
      status: 0,
      error: true,
    });
  }
});

blogRouter.get("/:pid", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { pid } = req.params;
    const decoded = jwt.verify(token, process.env.SecretKey);
    const { userId: user } = decoded;

    const data = await BlogsModel.find({ user, pid });

    if (data.length > 0) {
      res.send({
        message: "Item already in cart",
        status: 1,
        error: false,
      });
    } else {
      res.send({
        message: "Item not present in cart",
        status: 0,
        error: true,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong: " + error.message,
      status: 0,
      error: true,
    });
  }
});

blogRouter.patch("/:id", async (req, res) => {
  let { id: _id } = req.params;

  try {
    await BlogsModel.findByIdAndUpdate({ _id }, req.body);
    res.send({
      message: "Product updated",
      status: 1,
      error: false,
    });
  } catch (error) {
    res.send({
      message: "Something went wrong: " + error.message,
      status: 0,
      error: true,
    });
  }
});

blogRouter.delete("/:id", async (req, res) => {
  let { id: _id } = req.params;

  try {
    await BlogsModel.findByIdAndDelete({ _id });
    res.send({
      message: "Product deleted",
      status: 1,
      error: false,
    });
  } catch (error) {
    res.send({
      message: "Something went wrong: " + error.message,
      status: 0,
      error: true,
    });
  }
});
blogRouter.use(cartNorderValidator);

blogRouter.post("/add", async (req, res) => {
  try {
    await BlogsModel.insertMany(req.body);
    res.send({
        message: "Item added in blogs",
        status: 1,
        error: false,
      });
    } catch (error) {
        res.status(500).send({
        message: "Something went wrong: " + error.message,
        status: 0,
        error: true,
        });
        }
        });

   
        
        
        module.exports = {
        blogRouter,
        }