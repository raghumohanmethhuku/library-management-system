const mongoose = require('mongoose');


const DbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Connection Error", error);
        process.exit(1);
    }
}

module.exports=DbConnection;