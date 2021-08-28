import express, { json } from 'express'
import ejs from 'ejs'
import { host, PORT } from './config.js'
import cookie from 'cookie-parser'
import path from 'path'
import fs from 'fs'
import jwt from './until/jwt.js'
import fileUpload from 'express-fileupload'
import register from './auth/register.js'
import login from './auth/login.js'


let users = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), 'utf-8')
users = JSON.parse(users)
let files = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'files.json'),'utf-8')
files = JSON.parse(files)

const app = express()
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.set('views', path.join(process.cwd(), 'src', 'views'))


app.use( express.urlencoded({extended: true}) )
app.use( cookie() )
app.use(express.static(path.join(process.cwd(),'src', 'views', 'public', 'css')))
app.use(fileUpload())
app.use(express.static(path.join(process.cwd(), 'src', 'uploads')))
app.use(register)
app.use(login)
  

 
app.get('/', (req,res) => {
    if(req.cookies.user) res.render('index', {users,files})
    else res.sendFile(path.join(process.cwd(), 'src', 'views', 'login.html'))
})

app.post('/', (req,res) => {
    try{
    let { file } = req.files
    let fileName = file.name.replace(/\s/g, "").toLowerCase()
    let filePath = path.join(process.cwd(), 'src', 'uploads', fileName)
    file.mv(filePath)
    fs.readFile(path.join(process.cwd(),'src', 'database', 'files.json'), 'UTF-8', (err, data) => {
        data = data ? JSON.parse(data) : []
         let {userId} = jwt.verify(req.cookies.user)
        let newFile = {
            fileId : data.length ? data [data.length - 1].fileId + 1 : 1,
            fileName : req.body.fileName,
            filePath : fileName,
            userId
        }
        data.push(newFile)
        fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'files.json'), JSON.stringify(data,null,4))
        res.redirect('/')
    })
}catch(err){
    res.redirect('/')
}
})

app.listen(PORT, () => console.log(`server http://${host}:${PORT}`))