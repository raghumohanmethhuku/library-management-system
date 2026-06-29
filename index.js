const express = require("express");
const dotenv=require("dotenv");
const userRouter=require("./routes/user")
const bookRouter=require("./routes/books");
const { Db } = require("mongodb");
const DbConnection = require("./databaseConnection");
dotenv.config()
const app = express();
const PORT = 8081;
DbConnection();
app.use(express.json());

app.get("/", (req, res)=> {
    res.status(200).json({
        message: "Home Page :-)"
    })
})
app.use('/users',userRouter);
app.use('/books',bookRouter);
    // app.all('*',(req, res)=> {
//     res.status(500).json({
//         message: "Not Built Yet"
//     })
// })

app.listen(PORT, ()=>{
    console.log(`Server is up and rruning on http://localhost:${PORT}`)
})