const connectToMongo =require('./db');
connectToMongo();

const express = require('express')
const app = express()
const port = 5001

app.use(express.json())
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
app.get('/test-route', (req, res) => {
  res.send("hello world")
})


app.listen(port, () => {
  console.log(`Simple-Jot App listening on port ${port}`)
})