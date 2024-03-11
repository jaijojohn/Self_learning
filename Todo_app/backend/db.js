
const mongoose = require("mongoose");
// mongodb+srv://jaijojohn999:F8oHdQxDbhTKjTCH@cluster0.tug8qip.mongodb.net/

mongoose.connect("mongodb+srv://jaijojohn999:F8oHdQxDbhTKjTCH@cluster0.tug8qip.mongodb.net/todos");

const todoSchema = mongoose.Schema({
    title : String,
    description :String,
    completed :Boolean
})

const todo = mongoose.model('todos',todoSchema);

module.exports = {
    todo : todo
}