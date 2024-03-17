// write basic express boilerplate with express.js
const express = require("express");
const { createTodo , updateTodo} = require("./type.js");
const app = express();
const { todo } = require("./db");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.post("/todo",async function(req,res){

    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"you sent wrong inputs"
        })
        return;
    }

    await todo.create({
        title : createPayload.title,
        description : createPayload.description,
        completed : false
    })

    res.json({
        msg : "Todo Created"
    })
})


app.get("/todos", async function(req,res){

        const todos = await todo.find({});
        res.json({
            todos
        })
})

app.put("/completed", async function(req,res){
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"you sent wrong inputs"
        })
        return;
    }
    await todo.update({
        _id : req.body.id
    },{
        completed :true
    })
    res.json({
        msg :"marked as completed."
    })
})

app.listen(3000);