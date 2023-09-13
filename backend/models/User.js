import { DataTypes } from "sequelize";
import db from "../config/db.js";
import useBcrypt from "sequelize-bcrypt";

const User = db.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

const options = {
  field: "password",
  rounds: 10,
  compare: "authenticate",
};

useBcrypt(User, options);


export default User;