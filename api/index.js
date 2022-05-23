import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';
// Import Routes
import authRoute from './routes/auth.js'
import userRoute from './routes/users.js'
import postRoute from './routes/posts.js'
import categoryRoute from './routes/categories.js'


// b/c it is modified ES6 js 
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// app config
const app = express()
dotenv.config();
const port = process.env.PORT || 8002



// middleware for  path (to make our images folder public)
app.use('/images', express.static(path.join(__dirname, "/images")))

// Middleware for data parser (to be able to send any json file)
app.use(express.json());


// route(API end point)
app.get('/', (req, res) => {
    res.send('we are the home')
    console.log('we are the home');
})


// Middleware for auth,post,users & categories route
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/categories', categoryRoute)


// store and upload image files .....the last process
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      // cb(null,"hello.jpeg");
      cb(null,req.body.name);
    },
  });

const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });

// connect to DB
mongoose.connect(process.env.DB_CONNECTION)
.then(console.log('the DB is connected'))
.catch((err) => console.log(err))

// listen to the server
app.listen(port, console.log(`the server connected @${port}`))
