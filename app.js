const express = require("express");
const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");
const app = express();
app.use(express.json())
app.use(userRoutes);
app.use(adminRoutes);
app.listen(5050, () => {
  console.log("done at http/localhost:5050");
});
