const userRoutes = require('./user.route');
const articleRoutes = require('./article.route');
const express = require('express');
const router = express.Router();

router.use('/user', userRoutes);
router.use('/article', articleRoutes);

router.use((err, req, res, next) => {
    res.json({
        status: err.status,
        message: err.message
    });
});

module.exports = router;
