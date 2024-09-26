import express from 'express'


const PORT = 3000

const app = express()
app.use(express.json());

const users = [
    {
        id: 1,
        name: "sajjad",
        email:"sajjad@gmail.com"
    },
    {
        id: 2,
        name: "ahmad",
        email:"ahmad@gmail.com"
    },
]

app.get('/user',(req, res)=>{
      res.send(users)
})
  
//  Post request 
app.post('/user',(req,res)=>{
    try{
        const {name , email} = req.body
        if(name && email){
            users.push({id:users.length +1 , ...req.body})
            res.status(200).send({status:200, message:"user added sucessfully"})
        }else{
            res.status(403).send({status:403 , message:"Email and name is required"})
        }     
    }
   catch(e){
        res.status(400).send({status:400, message: e})  
   }
    
})

// POst request end 

// PUT request start


// app.put('/user/:id', (req,res)=>{
//     // console.log(req.params.id)
//     let index=users.findIndex(v=> v.id ===Number(req.params.id))
//     // console.log("index===>", index)
//     if(index !== -1){

//     }
// })

// PUT request end

// Delete reuest start

app.delete('/user/:id', (req, res) => {
    try {
        let index = users.findIndex(v => v.id === Number(req.params.id));
        
        if (index !== -1) {
            users.splice(index, 1);
            return res.status(200).send("The user was deleted successfully");
        } else {
            return res.status(404).send("User not found");
        }
    } catch (error) {
        return res.status(500).send("An error occurred while deleting the user");
    }
});

// Delete request end


app.listen(PORT, ()=>{
    console.log(`The server is runing on http://localhost:${PORT}`)
})