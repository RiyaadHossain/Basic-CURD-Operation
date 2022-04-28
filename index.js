const express = require("express");
const cors = require('cors')
const app = express();
const port = process.env.PORT || 4000;


// Middlewares
app.use(cors()) 
app.use(express.json()) //--- to parse the data received from client side

// 1. GET
// 2. POST
// 3. DELETE
// 4. PUT


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
  console.log(`Our Server is running`);
});
