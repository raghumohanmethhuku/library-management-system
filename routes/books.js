const express = require("express");
const {books} = require("../Data/books.json");
const {users} = require("../Data/user.json");
const router = express.Router()

router.get("/",(req,res)=>{

    res.status(200).json({
        success:true,
        data:books
    })
})
router.get("/:id",(req,res)=>{
    const {id}=req.params
     const book= books.find((each)=> each.id===id)
     if(!book)
     {
       return res.status(404).json({
            success:false,
            message:`Data Not found : ${id}`
        })
     }
     res.status(200).json({
        success:true,
        data:book
     })

})
router.post('/',(req,res)=>{
  const  {id,name,author,genre,price,publisher} = req.body;
  if(!id || !name || !author || !genre|| !price || !publisher)
  {
       return res.status(400).json({
        success:false,
        message:"Provide all required fields"
       })
  }
  const book= books.find((each)=> each.id===id)
  if(book)
  {
      return res.status(409).json({
          success:false,
          message:"Book already exits"
      })
  }
  books.push({id,name,author,genre,price,publisher})
  res.status(201).json({
    success:true,
    message:"book registered successfully"
  })
})
router.put('/:id',(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;
     const book= books.find((each)=> each.id === id)
     if(!book)
     {
       return res.status(404).json({
            success:false,
            message:`Data Not found : ${id}`
        })
     }
     const upadatedBook = books.map((each)=>{
        if(each.id === id)
        {
            return {...each,...data,
            }
        }
        return each
     })

     res.status(200).json({
        success:true,
        data:upadatedBook,
        message:"updated successfully"
     })
})
router.delete('/:id',(req,res)=>{
      const {id}=req.params
      const book= books.find((each)=> each.id===id)
     if(!book)
     {
       return res.status(404).json({
            success:false,
            message:`Data Not found : ${id}`
        })
     }
     const upadatedBooks =books.filter((each)=>each.id !== id)
     res.status(200).json({
        success:true,
        data:upadatedBooks,
        message:"deleted successfully"
     })

})
router.get('/issued/for-users',(req,res)=>{
    const userwithIssuedBooks=users.filter((each)=>{
        if(each.issuedBook)
        {
            return each;
        }
    })
    const issuedBooks=[];
    userwithIssuedBooks.forEach((each)=>{
        const book = books.find((book)=>book.id===each.issuedBook)
        book.issuedBy=each.issuedBy
        book.issuedDate=each.issuedDate
        book.returnDate=each.returnDate
        issuedBooks.push(book)

    })
    if(issuedBooks===0)
    {
        return res.status(404).json({
            success:false,
            message:"No Book issued At"
            
        })
    }
    res.status(200).json({
        success:true,
        data:issuedBooks
    })
})
module.exports=router;