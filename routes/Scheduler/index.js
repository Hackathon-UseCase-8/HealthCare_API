const express = require('express')
const router = new express.Router()
const Controller = require('./controller/scheduler')

router.get('/list/staff', Controller.getSchedules);
router.post('/create/staff', Controller.CreateSchedule);
module.exports = router