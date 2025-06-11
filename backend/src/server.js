import express from "express"
import path from 'path'
import cors from "cors"
import dotenv from "dotenv"

import NotesRoutes from "./routes/NotesRoutes.js"
import { connectDB } from "../config/db.js";

import rateLimiter from '../middleware/ratelimiter.js'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()


//middleqare
if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin: "http://localhost:5173"
       }))
}


app.use(express.json());
app.use(rateLimiter)


// app.use((req,res,next) => {
//     console.log("we just got a new request");
//     next()
// })


app.use('/api/notes', NotesRoutes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
     app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));

    }) 
}



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
      
        
    })
})





// f8ZxqA7LJReOuUUT
// mongodb+srv:deeyakin:f8ZxqA7LJReOuUUT@cluster0.foxk6w4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0