import express from 'express'
import { postLogin, getLogin } from '../controller/loginController.js'
const router = express.Router()

router.route('/login')
    .get( getLogin )
    .post( postLogin )

export default router    