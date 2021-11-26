const express = require('express')
const router = express.Router()

const { contacts: ctrl } = require('../../controllers/index')
const { validation, controllerWrapper, authenticate } = require('../../middlewars')
const { joiShema, patchShema } = require('../../models/contact')

router.get('/', authenticate, controllerWrapper(ctrl.getAllContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', authenticate, validation(joiShema), controllerWrapper(ctrl.addContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

router.put('/:contactId', validation(joiShema), controllerWrapper(ctrl.updateContact))

router.patch('/:contactId/favorite', validation(patchShema), controllerWrapper(ctrl.updateStatusContact))

module.exports = router
