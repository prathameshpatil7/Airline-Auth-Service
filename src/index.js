const express = require("express");
const { PORT } = require("./config/serverConfig");
const bodyParser = require("body-parser");
const ApiRoutes = require("./routes/index");
const db = require("./models/index");
const UserService = require("./services/user-service");
const { User, Role } = require("./models/index");
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

    // const u1 = await User.findByPk(4);
    // const r1 = await Role.findByPk(1);
    // // u1.addRole(r1);

    // // const response = await u1.hasRole(r1);
    // const response = await r1.hasUser(u1);
    // console.log(r1);
  });
};

setupAndStartServer();
