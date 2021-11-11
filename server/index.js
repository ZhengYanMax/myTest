const express=require('express');
const app=express();
app.use(express.urlencoded({ extended: true })) 
const router=require('./router')
app.use('/',router)
app.use(express.static('upload'))
// app.get('/in',(req,res)=>{
// res.send({status:200})
// })
app.listen(8888,()=>{
    console.log('8888端口已开启');
})




