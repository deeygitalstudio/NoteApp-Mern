import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDb connected Successfully');
        
    } catch (error) {
        console.log("Error connected to database", error.message);
        process.exit(1) //1 means exit with failure
        
    }
}