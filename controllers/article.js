const { Article, User } = require('../models');

module.exports = { createArticle, updateArticle, filterArticles, deleteArticle }

function createArticle(req, res, next) {
    Article.create(req.body)
    .then(article => {
        User.findById(article.owner)
        .then(user => {
            user.numberOfArticles++;
            return user.save();
        })
        .then(() => {
            res.status(201).json({
                message: 'Article created'
            });
        })
        .catch(err => {
            err.status = 400;
            next(err);
        });
    })
    .catch(err => {
        err.status = 400;
        next(err);
    });
}

function updateArticle(req, res, next) {
    Article.findById(req.params.articleId)
    .then(article => {
        return User.findById(article.owner);
    })
    .then(user => {
        if (user) {
            return Article.findByIdAndUpdate(req.params.articleId, { $set: req.body });
        }
        const error = new Error('Something went wrong');
        error.status = 500;
        return next(error);
    })
    .then(() => {
        res.status(200).json({
            message: 'Article updeted'
        });
    })
    .catch(err => {
        err.status = 400;
        next(err);
    });
}

function filterArticles(req, res, next) {
     Article.find({ [req.query.filter]: req.query.value })
     .select('-__v').populate('owner', '_id firstName lastName')
    .then(articls => {
        res.status(200).json(articls);
    })
    .catch(err => {
        err.status = 400;
        next(err);
    });
}

function deleteArticle(req, res, next) {
    Article.findByIdAndDelete(req.params.articleId)
    .then(deletedArticle => {
        User.findById(deletedArticle.owner)
        .then(user => {
            user.numberOfArticles--;
            return user.save();
        })
        .then(() => {
            res.status(200).json({
                message: 'Article deleted'
            });
        })
        .catch(err => {
            err.status = 400;
            next(err);
        })
    })
    .catch(err => {
        err.status = 400;
        next(err);
    })
}
