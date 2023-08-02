const express = require("express");
const blogRouter = express.Router();
const jwt = require("jsonwebtoken");
const { BlogsModel } = require('../model/Blogs.Model');
require('dotenv').config();

blogRouter.get('/', (req, res) => {
    let token = req.headers.tkn
    let page = req.query.page || 0
    jwt.verify(token, process.env.key, async (err, decoded) => {
        if (err) res.send({
            message: "user not authenticated",
            status: 0,
            error: true
        })
        let { userId: user } = decoded
        try {
            let count = await BlogsModel.find({ user }).countDocuments();
            let data = await BlogsModel.find({ user });
            res.send({
                message: "All cart data",
                status: 1,
                count: count,
                data: data,
                error: false
            })
        } catch (e) {
            res.send({
                message: "error: " + e,
                status: 0,
                error: true
            })
        }
    });
})

blogRouter.get('/userPost', (req, res) => {
    let token = req.headers.tkn
    let page = req.query.page || 0
    jwt.verify(token, process.env.key, async (err, decoded) => {
        if (err) res.send({
            message: "user not authenticated",
            status: 0,
            error: true
        })
        let { userId: user } = decoded
        try {
            let count = await BlogsModel.find().countDocuments();
            let data = await BlogsModel.find().skip(page*10).limit(10);
            res.send({
                message: "All cart data",
                status: 1,
                count: count,
                data: data,
                error: false
            })
        } catch (e) {
            res.send({
                message: "error: " + e,
                status: 0,
                error: true
            })
        }
    });
})

blogRouter.get('/:pid', (req, res) => {
    let token = req.headers.tkn;
    let { pid } = req.params;
    jwt.verify(token, process.env.key, async (err, decoded) => {
        if (err) res.send({
            message: "err: " + err,
            status: 0,
            error: true
        })
        let { userId: user } = decoded
        //console.log('set',user,pid)
        try {
            let data = await BlogsModel.find({ user, _id: pid })
            if (data.length > 0) {
                res.send({
                    message: "Item already in cart",
                    status: 1,
                    data:data,
                    error: false
                })
            } else {
                res.send({
                    message: "Item not present in cart",
                    status: 0,
                    error: true
                })
            }
        } catch (e) {
            res.send({
                message: "error: " + e,
                status: 0,
                error: true
            })
        }
    })
})

blogRouter.patch('/:id', async (req, res) => {
    let { id: _id } = req.params
    let token = req.headers.tkn;
    jwt.verify(token, process.env.key, async (err, decoded) => {
        if (err) res.send({
            message: "err: " + err,
            status: 0,
            error: true
        })
        try {
            let { userId: user } = decoded
            console.log('quantity', req.body, _id, user)
            await BlogsModel.updateOne({ _id, user }, req.body)
            res.send({
                message: "Item updated",
                status: 1,
                error: false
            })
        } catch (err) {
            res.send({
                message: 'err: ' + err,
                status: 0,
                err: true
            })
        }
    })
})

blogRouter.delete('/:id', async (req, res) => {
    let { id: _id } = req.params
    let token = req.headers.tkn
    jwt.verify(token, process.env.key, async (err, decoded) => {
        if (err) res.send({
            message: "err: " + err,
            status: 0,
            error: true
        })
        try {
            let { userId: user } = decoded
            await BlogsModel.deleteOne({ _id, user })
            res.send({
                message: "err: " + err,
                status: 1,
                error: false
            })
        } catch (err) {
            res.send({
                message: "err: " + err,
                status: 0,
                error: true
            })
        }
    })
})

blogRouter.post("/add", async(req, res) => {

    try {
        //console.log(req.body)
        await BlogsModel.insertMany(req.body);
        res.send({
            message: "Item added in cart",
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

module.exports = {
    blogRouter
}