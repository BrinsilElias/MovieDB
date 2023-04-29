const port = 8080
const cors = require('cors')
const path = require('path')
const axios = require('axios')
const express = require('express')
const bodyparser = require('body-parser')

const app = express()
app.use(express.urlencoded({ extended: true }));

app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname,'/build')));
app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname,'/build/index.html')); 
});

// app.get('/', (req, res) => {
//     res.json("Server is working")
// })

// User Login 
app.post('/api/login', async (req, res) => {
    const adminUser = {
        id: 'AD001',
        email: "admin@email.com",
        password: "admin#123",
        role: "admin"
    }
    let email = req.body.email
    let password = req.body.password
    
    if(email == adminUser.email && password == adminUser.password){
        res.json({status: "Authentication Successful"})
    }else{
        res.json({status: "Authentication Failed"})
    }
})

// Retreive Items
app.post('/api/viewall', async (req, res) => {
    axios.get("https://hu92b042ga.execute-api.ap-south-1.amazonaws.com/mdc/movies")
    .then((response) => res.json(response.data))
})

// Add Item
app.post('/api/add', async (req, res) => {
    const data = {
        "key1": req.body.key1,
        "key2": req.body.key2,
        "key3": req.body.key3,
        "key4": req.body.key4,
        "key5": req.body.key5,
        "key6": req.body.key6
    }
    axios.post("https://hu92b042ga.execute-api.ap-south-1.amazonaws.com/mdc/movies", data)
    .then((response) => console.log(response.data))
    setTimeout(() => {
        res.json({status: "Insert Successful"})
    }, 6000);
})

// Delete Item
app.post('/api/:id/delete', async (req, res) => {
    // Delete Code
    const id = req.params.id
    axios.delete("https://hu92b042ga.execute-api.ap-south-1.amazonaws.com/mdc/movies", {data: {"key1": id}})
    .then((response) => console.log(response.data))
    setTimeout(() => {
        res.json({status: "Delete Successful"})
    }, 6000);
}) 

// Update Item

app.listen(port, () => {
    console.log(`app running on port http://localhost:${port}`)
}) 