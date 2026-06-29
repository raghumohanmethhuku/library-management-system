const express = require("express");
const {users}=require("../Data/user.json");
const { getAllUsers, getSingleUserById,createUser, updateUserById, deleteUserById, getSubscriptionDetailsById } = require("../controllers/user-controller");
const router = express.Router();


// router.get("/",(req,res)=>{

//     res.status(200).json({
//         success:true,
//         data:users
//     })
// })
router.get('/',getAllUsers)

// router.get("/:id",(req,res)=>{
//     const {id}=req.params
//      const user= users.find((each)=> each.id===id)
//      if(!user)
//      {
//        return res.status(404).json({
//             success:false,
//             message:`Data Not found : ${id}`
//         })
//      }
//      res.status(200).json({
//         success:true,
//         data:user
//      })

// })
router.get('/:id',getSingleUserById)

// router.post('/',(req,res)=>{
//   const  {id,name,surname,email,subscriptionType,subscriptionDate} = req.body;
//   if(!id || !name || !surname || !email || !subscriptionType || !subscriptionDate)
//   {
//        return res.status(400).json({
//         success:false,
//         message:"Provide all required fields"
//        })
//   }
//   const user= users.find((each)=> each.id===id)
//   if(user)
//   {
//       return res.status(409).json({
//           success:false,
//           message:"User already exits"
//       })
//   }
//   users.push({id,name,surname,email,subscriptionType,subscriptionDate})
//   res.status(201).json({
//     success:true,
//     message:"user registered successfully"
//   })
// })
router.post('/',createUser)



// router.put(':id',(req,res)=>{
//     const {id}=req.params;
//     const {data}=req.body;
//      const user = users.find((each)=> each.id === id)
//      if(!user)
//      {
//        return res.status(404).json({
//             success:false,
//             message:`Data Not found : ${id}`
//         })
//      }
//      const upadatedUser = users.map((each)=>{
//         if(each.id === id)
//         {
//             return {...each,...data,
//             }
//         }
//         return each
//      })

//      res.status(200).json({
//         success:true,
//         data:upadatedUser
//      })
// })

router.put('/:id',updateUserById)

// router.delete('/:id',(req,res)=>{
//       const {id}=req.params
//       const user= users.find((each)=> each.id===id)
//      if(!user)
//      {
//        return res.status(404).json({
//             success:false,
//             message:`Data Not found : ${id}`
//         })
//      }
//      const upadatedUsers =users.filter((each)=>each.id !== id)
//      res.status(200).json({
//         success:true,
//         data:upadatedUsers
//      })

// })
router.delete('/:id',deleteUserById)
// router.get('/subscription-details/:id',(req,res)=>{
//     const {id}=req.params
//     const user=users.find((each)=>each.id===id)
//     if(!user)
//     {
//         return res.status(404).json({
//             success:false,
//             message:`user not found:${id}`
//         })
//     }   
//     const getdateInDays=(data='')=>{
//         let date;
//         if(data)
//         {
//             date=new Date(data)
//         }
//         else{
//             date=new Date()
//         }
//         let days = Math.floor(date/(1000*60*60*24))
//         return days
//     }
//     const subscriptionType = (date)=>{
//         if(user.subscriptionType==="Basic")
//         {
//             date=date+90;

//         }
//          else if(user.subscriptionType==="Standard")
//         {
//             date=date+180;

//         }
//         else if( user.subscriptionType==="Premium")
//         {
//             date=date+365;
//         }
//         return date
//     }
//     let returnDate =getdateInDays(user.returnDate)
//     let currentDate=getdateInDays();
//     let subscriptionDate=getdateInDays(user.subscriptionDate)
//     let subscriptionExpiration=subscriptionType(subscriptionDate)
//     const data = {
//         ...users,
//         subscriptionExpired:subscriptionExpiration < currentDate,
//         subscriptionDayLeft:subscriptionExpiration-currentDate,
//         daysleftforexpiration:returnDate-currentDate,
//         returnDate: returnDate<currentDate ? "Book is over Due ": returnDate,
//         fine:returnDate < currentDate ? subscriptionExpiration <= currentDate? 200:100:0

//     }
//     res.status(200).json({
//         success:true,
//         data:data
//     })
// })
router.get('/subscription-details/:id',getSubscriptionDetailsById)
module.exports=router;