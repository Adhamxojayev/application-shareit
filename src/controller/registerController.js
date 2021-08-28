import path from 'path'
import fs from 'fs'
import jwt from '../until/jwt.js'

function postRegister (req,res) {
    try{
        let data = req.body
        let user = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'))
        user = user.length ? JSON.parse(user) : []
        let newUser = {
            userId: user.length ? user[user.length - 1].userId + 1 : 1,
            username: data.username,
            password: data.password,
            userimg: data.image
        }
        user.push(newUser)
        fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), JSON.stringify(user,null,4))
        console.log(newUser.userId);
        res.cookie('user', jwt.sign({userId: newUser.userId}))
        res.redirect('/')
    }catch(err){
        console.log(err);
    }
}

function getRegister (req,res) {
    try {
        res.sendFile(path.join(process.cwd(), 'src', 'views', 'register.html'))
    } catch (error) {
        
    }
}

export {
    postRegister,
    getRegister
}



