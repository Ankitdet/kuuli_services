const express = require('express');
const router = express.Router({ mergeParams: true });

const userController = require('../../controllers/user/user.controller');

router.route('/sendMail').post(userController.sendMail);
router.route('/download').get(userController.download);

module.exports = router;