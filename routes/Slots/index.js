const express = require('express')
const router = new express.Router()
const Controller = require('./Controller/slots')

router.get('/list/slots', Controller.getSlots);
router.post('/create/slot', Controller.CreateSlot);
module.exports = router