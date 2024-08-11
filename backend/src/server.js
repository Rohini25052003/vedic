import cors from 'cors';
import express from 'express';
import { connectToDB ,db } from "./db.js";

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json("server is running successfully!");
})

// app.post('/', (req, res) => {
//     res.json("server is running successfully!");
// })
app.post('/insert', async(req, res) => {
    await db.collection("hackathon").insertOne({Name:req.body.name,Email:body.req.email,})
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})
app.post('/insertmany', async(req, res) => {
    await db.collection("hackathon").insertMany(req.body)
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})
app.post('/login', async (req, res) => {
    await db.collection("hackathon").findOne({Reg:req.body.Reg,Pass:req.body.Pass})
    .then((result) => {
        if (result) {
            res.json({ message: "Login successful!", user: result });
        } else {
            res.status(401).json({ message: "Failed to login. Invalid credentials." });
        }
    })
})
app.post('/find', async(req, res) => {
    await db.collection("hackathon").findOne({Name:"kitty"})
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})
app.post('/findmany', async(req, res) => {
    await db.collection("hackathon").find({Name:req.body.name}).toArray()
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})
app.post('/updatemany', async (req, res) => {
    await db.collection("hackathon").updateMany(
        { "Team": "slayers"}, 
        { $set: { "Name": "kitty1" } } 
    )
    .then((result) => {
        res.json(result);
    })
    .catch((e) => {
        console.log(e);
        res.status(500).send('Error updating records');
    });
});
app.post('/update', async (req, res) => {
    await db.collection("hackathon").updateOne(
        { "Team": "slayers" }, 
        { $set: { "Name": "kitty" } } 
    )
    .then((result) => {
        res.json(result);
    })
    .catch((e) => {
        console.log(e);
        res.status(500).send('Error updating records');
    });
});


app.post('/delete', async (req, res) => {
    await db.collection("hackathon").deleteOne(
        { "Team": "slayers1" } // filter criteria to find the document to delete
    )
    .then((result) => {
        res.json(result);
    })
    .catch((e) => {
        console.log(e);
        res.status(500).send('Error deleting record');
    });
});
app.post('/deletemany', async (req, res) => {
    await db.collection("hackathon").deleteMany(
        { "Team": "slayers" } // filter criteria to find the documents to delete
    )
    .then((result) => {
        res.json(result);
    })
    .catch((e) => {
        console.log(e);
        res.status(500).send('Error deleting records');
    });
});

app.post('/eq', async(req, res) => {
    await db.collection("hackathon").updateMany({City:{$eq:"palacole"}},{$set:{college:"srkr"}})

    .then((result)=>{
        res.json(result)
    })
.catch((e)=>console.log(e))
})
app.post('/range', async(req, res) => {
    await db.collection("hackathon").updateMany({Age:{$in:[20,30]}},{$set:{election:"yes"}})

    .then((result)=>{
        res.json(result)
    })
.catch((e)=>console.log(e))
})
// app.post('/signin', async (req, res) => {
//     console.log(req.body)
//     await db.collection("hackathon").findOne({Email:req.body.Email,Pass:req.body.password})
//     .then((result) => {
//         console.log(result)
//         if (result) {
//             res.json({ message: "Login successful!", user: result });
//         } else {
//             res.status(401).json({ message: "Failed to login. Invalid credentials." });
//         }
//     })
//     .catch((e) => {
//         console.error(e);
//         res.status(500).json({ error: "Failed to process login." });
//     });
// });

app.post('/signin', async(req, res) => {
    await db.collection("hackathon").findOne({Email:req.body.Email,Pass:req.body.password})
    .then((result)=>{
        console.log(req.body)
        if(result?.Pass===req.body.password){
            console.log(result)
            res.json({message:"login sucess", values:result})
        } else {
            res.json({error:"user not found"})
        }
    })
    .catch((e)=>console.log(e))
})

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await db.collection('hackathon').findOne({ Email: email });
        if (existingUser) {
            return res.json({ error: 'User already exists' });
        }

        // Insert new user
        await db.collection('hackathon').insertOne({ Name: name, Email: email, Pass: password });
        res.json({ message: 'Signup successful' });
    } catch (e) {
        console.log(e);
        res.json({ error: 'An error occurred during signup' });
    }
});

app.post('/update-password', async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const result = await db.collection("hackathon").updateOne(
            { Email: email },
            { $set: { Pass: newPassword } }
        );

        if (result.modifiedCount > 0) {
            res.json({ success: true, message: "Password updated successfully" });
        } else {
            res.json({ success: false, message: "User not found or password not updated" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: "Failed to update password" });
    }
});
app.post('/students', async(req, res) => {
  await db.collection("hackathon").find().toArray()
  .then((result)=>{
      res.send(result)
  })
  .catch((e)=>console.log(e))
})

connectToDB(() => {
    app.listen(9000, () => {
        console.log("server running at 9000");
    })
})