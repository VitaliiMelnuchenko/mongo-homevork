const { User, Article } = require('../models');

module.exports = { createUser, updateUser, getUserInfo, deleteUser, getUserArticls };

function createUser(req, res, next) {
    User.create(req.body)
    .then(user => {
        res.status(201).json({
            message: 'User Created'
        });
    })
    .catch(err => {
        err.status = 400;
        next(err);
    })
}

function updateUser(req, res, next) {
    User.findByIdAndUpdate(req.params.userId, { $set: req.body })
    .then(user => {
        res.status(200).json({
            message: 'User Updated'
        });
    })
    .catch(err => {
        err.status = 400;
        next(err)
    });
}

function getUserInfo(req, res, next) {
    User.findById(req.params.userId).select('-__v')
    .then(user => {
        Article.find({owner: req.params.userId})
        .select('-__v -owner')
        .then(articles => {
            res.status(200).json({
                ...user._doc,
                articles: articles
            })
        })
        .catch(err => {
            err.status = 400;
            next(err)
        });
    })
    .catch(err => {
        err.status = 400;
        next(err)
    });
}

function deleteUser(req, res, next) {
    User.findByIdAndDelete(req.params.userId)
    .then(deletedUser => {
        Article.deleteMany({owner: req.params.userId})
        .then(() => {
            res.status(200).json({
                message: 'User and all his articles have been removed'
            })
        })
        .catch(err => {
            err.status = 400;
            next(err)
        });
    })
    .catch(err => {
        err.status = 400;
        next(err)
    });
}

function getUserArticls(req, res, next) {
    User.findById(req.params.userId)
    .then(user => {
        return Article.find({owner: req.params.userId})
        .select('-__v')
        .populate('owner', '_id firstName lastName');
    })
    .then(articles => {
        res.status(200).json(articles || null);
    })
    .catch(err => {
        err.status = 400;
        next(err)
    });
}
