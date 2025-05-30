const express = require('express')
const router = new express.Router()
const itemController = require('./Controller/staff')

router.get('/list/staff', itemController.getStaffList);

module.exports = router