import path from 'path'
import fs from 'fs'
import jwt from '../until/jwt.js'

function postLogin (req,res) {
    try{
        let {username, password} = req.body
        let users = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), 'utf-8')
        users = JSON.parse(users)
        let user = users.find(val => val.username == username && val.password == password)
        res.cookie('user', jwt.sign({userId: user.userId}))
        if(user) res.redirect('/')
    }catch(err){
        console.log(err);
    }
}

function getLogin ( req,res ) {
    try{
        res.sendFile(path.join(process.cwd(), 'src', 'views', 'login.html'))
    }catch(err){
        console.log(err);
    }
}

export {
    postLogin,
    getLogin
}