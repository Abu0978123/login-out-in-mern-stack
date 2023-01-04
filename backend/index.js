const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const cors = require('cors')
const PORT = process.env.PORT || 4000;
const URL = "mongodb://127.0.0.1:27017/students";

// some configration of Express and Node 
const app = express();
app.use(express.json());
app.use(bodyParser.json({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(cors());
// here connection of DB
async function DB_conn() {
    await mongoose.connect(URL).then(() => {
      console.log("connected successfully");
    });
  }
  DB_conn()
//   here schema and models
const register  = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
    const stdModel = new mongoose.model('register',register) 

  app.get("/", async (req, res) => {
    const data = await stdModel.find({});
    res.send(data);
  });

app.post('/register',async (req, res)=>{
    const { name, email, password} = req.body
    stdModel.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new stdModel({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    // console.log('hello done')
});
// so here we will login route to check either data present or not 
app.post("/login", (req, res)=> {
    const { email, password} = req.body
    stdModel.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 


app.listen(PORT, ()=>{
    console.log(`your app is running in ${PORT}`)
});