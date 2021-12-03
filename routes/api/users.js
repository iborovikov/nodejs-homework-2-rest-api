const express = require('express')
const router = express.Router()

const { users: ctrl } = require('../../controllers/index')
const { validation, controllerWrapper, authenticate, uploadAvatar } = require('../../middlewars')
const { joiShema, retryVeifySchema } = require('../../models/user')

router.post('/singup', validation(joiShema), controllerWrapper(ctrl.singup))

router.post('/login', validation(joiShema), controllerWrapper(ctrl.login))

router.get('/logout', authenticate, controllerWrapper(ctrl.logout))

router.get('/current', authenticate, controllerWrapper(ctrl.getCurrentUser))

router.patch('/subscription/:status', authenticate, controllerWrapper(ctrl.updateUserSubscrition))

router.patch('/avatars', authenticate, uploadAvatar.single('avatars'), controllerWrapper(ctrl.updateUserAvatar))

router.get('/verify/:verificationToken', controllerWrapper(ctrl.verify))

router.post('/verify/', validation(retryVeifySchema), controllerWrapper(ctrl.retryVeify))

module.exports = router
