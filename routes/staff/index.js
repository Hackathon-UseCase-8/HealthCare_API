const express = require('express')
const router = new express.Router()
const Controller = require('./Controller/staff')

router.get('/list/staff', Controller.getStaffList);
router.post('/create/staff', Controller.CreateStaff);

module.exports = router