//express
const express = require("express");
const app = express();
let port = 8080;
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})
//ejs
app.set("view engine","ejs");
const path = require("path");
app.set("views",path.join(__dirname,"/views"));
//for parsing data
app.use(express.urlencoded({extended:true}));
//css
app.use(express.static(path.join(__dirname,"public")));
//method-override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
//mongoose
const mongoose = require('mongoose');
const Chat = require("./Models/chats.js");
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
main()
  .then(()=>{
    console.log("connection successfull");
  })
  .catch((err)=>{
    console.log(err);
  })

//index route
app.get("/chats", async(req,res)=>{
    let chats = await Chat.find();
    res.render("index.ejs",{chats});
    
})
//create new chat
//i)get request
app.get("/chats/new", (req,res)=>{
    res.render("new.ejs");   
})

//ii)post request
app.post("/chats", (req,res)=>{
    let {from,msg,to} =req.body;
    let newchat = new Chat ({
        from : from,
        to : to,
        msg: msg,
        created_at : new Date,
    })
    newchat.save()
      .then(()=>{
        console.log('chat is saved');
      })
      .catch((err)=>{
        console.log(err);
      })
    res.redirect("/chats")
})



//edit and update route
//i) get 
app.get("/chats/:id/edit", async(req,res)=>{
    let id = req.params.id;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
    
})
//ii) put
app.put("/chats/:id", async(req,res)=>{
    let id = req.params.id;
    let newmsg = req.body.msg;
    await Chat.findByIdAndUpdate(id,{msg:newmsg},{runValidators:true});
    res.redirect("/chats");   
})




//DELETE route
app.delete("/chats/:id",async(req,res)=>{
    let id = req.params.id;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
})


