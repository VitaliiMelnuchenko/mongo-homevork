const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/', userController.createUser);

router.put('/:userId', userController.updateUser);

router.get('/:userId', userController.getUserInfo);

router.delete('/:userId', userController.deleteUser);

router.get('/:userId/articles', userController.getUserArticls);

module.exports = router;
