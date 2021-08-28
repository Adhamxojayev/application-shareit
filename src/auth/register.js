import express from 'express'
import { postRegister, getRegister } from '../controller/registerController.js'

const router = express.Router()

router.route('/register')
    .get( getRegister )
    .post( postRegister )

export default router