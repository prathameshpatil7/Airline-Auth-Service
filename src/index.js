const express = require("express");
const { PORT } = require("./config/serverConfig");
const bodyParser = require("body-parser");
const ApiRoutes = require("./routes/index");
const db = require("./models/index");
const UserService = require("./services/user-service");

const setupAndStartServer = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", ApiRoutes);
  app.listen(PORT, async () => {
    console.log(`server is running on port ${PORT}`);

    //when  we create any new model/associations, we need to sync it by uncommenting env variable
    if (process.env.SYNC_DB) {
      db.sequelize.sync({ alter: true });
    }
    const userService = new UserService();
    // const newToken = await userService.createToken({
    //   email: "p36@gmail.com",
    //   id: "3",
    // });
    // console.log(newToken);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InAzNjRAZ21haWwuY29tIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImlhdCI6MTY5ODc2OTkzMywiZXhwIjoxNjk4ODU2MzMzfQ.vKd3573v7R5F4m6j1S6Gsk9LPwL7hoLNbUjaCka0biY";
    const response = userService.verifyToken(token);
    console.log(response);
  });
};

setupAndStartServer();
