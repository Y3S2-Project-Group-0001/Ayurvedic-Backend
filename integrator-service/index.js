const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");


const app = express();

app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

app.use("/order", proxy("http://localhost:8004/"));
app.use("/auth", proxy("http://localhost:8001/"));
app.use("/delivery", proxy("http://localhost:8002/"));
app.use("/item", proxy("http://localhost:8003/"));

//  🔻dont delete this commented code this will be used in kubernetes we need this
// app.use("/order", proxy("http://order-service:8004/"));
// app.use("/auth", proxy("http://auth-service:8001/"));
// app.use("/delivery", proxy("http://delivery-service:8002/"));
// app.use("/item", proxy("http://item-service:8003/"));

app.use("/", proxy("http://order-service:8004/"));
// app.use('/somethingelse', proxy('http//localhost:3005'))

app.listen(8000, () => {
  console.log("Integrator service is listning on port 8000");
});
