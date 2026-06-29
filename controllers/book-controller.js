const {Usermodel,Bookmodel}=require('../models')
const IssuedBook =require("../Dtos/book-dto");
const bookModel = require('../models/book-model');
exports.getAllBooks = async(req,res) =>{
    const books= await Bookmodel.find();

    if(books.length===0)
    {
        return res.status(404).json({
            success:false,
            message:"No Data found"
        })
    }

    res.status(200).json({
        success:true,
        data:books
    })


}
// router.get("/:id",(req,res)=>{
//     const {id}=req.params
//      const book= books.find((each)=> each.id===id)
//      if(!book)
//      {
//        return res.status(404).json({
//             success:false,
//             message:`Data Not found : ${id}`
//         })
//      }
//      res.status(200).json({
//         success:true,
//         data:book
//      })

// })


exports.getSingleBookById =async(req,res)=>{
    const {id}=req.params
    const book=await Bookmodel.findById(id)
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
}
// router.get('/issued/for-users',(req,res)=>{
//     const userwithIssuedBooks=users.filter((each)=>{
//         if(each.issuedBook)
//         {
//             return each;
//         }
//     })
//     const issuedBooks=[];
//     userwithIssuedBooks.forEach((each)=>{
//         const book = books.find((book)=>book.id===each.issuedBook)
//         book.issuedBy=each.issuedBy
//         book.issuedDate=each.issuedDate
//         book.returnDate=each.returnDate
//         issuedBooks.push(book)

//     })
//     if(issuedBooks===0)
//     {
//         return res.status(404).json({
//             success:false,
//             message:"No Book issued At"
            
//         })
//     }
//     res.status(200).json({
//         success:true,
//         data:issuedBooks
//     })
// })



exports.getAllIssuedBooks=async(req,res)=>{
    const users = await Usermodel.find({
        issuedBook : { $exists: true},
    }).populate("issuedBook")
    const issuedBooks = users.map((each)=>{
        return new IssuedBook(each);
    })

    if(issuedBooks.length===0)
    {
        return res.status(404).json({
            success:false,
            message:"No Data Found"

        })
    }
    res.status(200).json({
        success:true,
        data:issuedBooks
    })
}

// router.post('/',(req,res)=>{
//   const  {id,name,author,genre,price,publisher} = req.body;
//   if(!id || !name || !author || !genre|| !price || !publisher)
//   {
//        return res.status(400).json({
//         success:false,
//         message:"Provide all required fields"
//        })
//   }
//   const book= books.find((each)=> each.id===id)
//   if(book)
//   {
//       return res.status(409).json({
//           success:false,
//           message:"Book already exits"
//       })
//   }
//   books.push({id,name,author,genre,price,publisher})
//   res.status(201).json({
//     success:true,
//     message:"book registered successfully"
//   })
// })

exports.addNewBook=async(req,res)=>{
    const {data}=req.body
    if(!data || Object.keys(data).length===0)
    {
        return res.status(400).json({
            success:false,
            message:"please provide the data to add a book"
        })
    }
    await Bookmodel.create(data);
    const allBooks=await Bookmodel.find();
      res.status(200).json({
        success:true,
        data:allBooks
      })

}
//router.put('/:id',(req,res)=>{
//     const {id}=req.params;
//     const {data}=req.body;
//      const book= books.find((each)=> each.id === id)
//      if(!book)
//      {
//        return res.status(404).json({
//             success:false,
//             message:`Data Not found : ${id}`
//         })
//      }
//      const upadatedBook = books.map((each)=>{
//         if(each.id === id)
//         {
//             return {...each,...data,
//             }
//         }
//         return each
//      })

//      res.status(200).json({
//         success:true,
//         data:upadatedBook,
//         message:"updated successfully"
//      })
// })
exports.updateBookById = async(req,res)=>{
    const {id}=req.params
    const {data}=req.body
   if(!data || Object.keys(data).length===0)
    {
        return res.status(400).json({
            success:false,
            message:"please provide the data to add a book"
        })
    }
    const updatedBook= await Bookmodel.findOneAndUpdate(

        {
            _id:id},
            {$set:data},
            {new:true} 
         )
         if(!updatedBook)
         {
            return res.status(404).json({
                success:false,
                message:"No Data Found"
            })
         }
         res.status(200).json({
            success:true,
            data:updatedBook,
            message:"Successfully updated"
         })
}
exports.deleteBookById=async(req,res)=>{
    const {id}=req.params;
    const book = await Bookmodel.findById(id)
    if(!book)
    {
        return res.status(404).json({
                success:false,
                message:"No Data Found"
            })
    }
    await Bookmodel.findByIdAndDelete(id)
     res.status(200).json({
            success:true,
            data:book,
            message:"successfully deleted"
         })

}