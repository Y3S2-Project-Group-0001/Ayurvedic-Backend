const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/delivery', proxy('http://localhost:3004/'))
// app.use('/', proxy('http://localhost:3004'))
// app.use('/somethingelse', proxy('http//localhost:3005'))

app.listen(8000, ()=> {
    console.log("Integrator service is listning on port 8000")
})