import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from "dotenv";

 

const app = express();
dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

//connections and listeneres
const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected!"))
.catch(err => console.log(err));



app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));