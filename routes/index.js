const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');


router.get('/',homeController.home)

// Whenever the pattern of route is /users handle it in users file
router.use('/users',require('./users'))
router.use('/posts', require('./post'))

router.use('/comment', require('./comment'))
router.use('/likes', require('./likes'))
module.exports = router;