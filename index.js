const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
require('dotenv').config()
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json()); //--- to parse the data received from client side

const uri =
  `mongodb+srv://riyad:${process.env.PASS}@curdoperation.qbqwp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const userCollection = client.db("myDB").collection("user");

    
    // 1. GET
    app.get('/users', async (request, response) => {
        const result = await userCollection.find({}).toArray()
        
        response.send(result)
    })
      
      
    // 2. POST
      app.post('/user', async (req, res) => {
          const userData = req.body
          const result = await userCollection.insertOne(userData);
          res.send(result)
      })
      
    // 3. DELETE
      app.delete('/user/:id', async (req, res) => {
          console.log(req);
          const id = req.params.id
          const deletIt = {_id: ObjectId(id)}
          const result = await userCollection.deleteOne(deletIt)
          res.send(result)
      })
      
    // 4. PUT
      
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Our Server is running`);
});
