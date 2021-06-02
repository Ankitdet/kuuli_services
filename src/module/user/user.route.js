const express = require('express');
const router = express.Router({ mergeParams: true });

const userController = require('../../controllers/user/user.controller');
const { sendMail, contactUs, sendLink } = require('../../utils/urlConstant');

router.route(sendMail).post(userController.sendMail);
router.route(contactUs).post(userController.contactUs);
router.route(sendLink).post(userController.sendLink);


module.exports = router;