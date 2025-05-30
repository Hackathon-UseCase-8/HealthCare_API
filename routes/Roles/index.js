const express = require('express')
const router = new express.Router()
const Controller = require('./Controller/roles')

router.get('/list/roles', Controller.getRolesList);
router.post('/create/role', Controller.CreateRole);
module.exports = router