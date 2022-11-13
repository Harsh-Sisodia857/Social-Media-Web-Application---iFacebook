const express = require('express');
const homeController = require('../controllers/home_controller');

const router = express.Router();

router.get('/',homeController.home)

// Whenever the pattern of route is /users handle it in users file
router.use('/users',require('./users'))
router.use('/posts', require('./post'))


module.exports = router;