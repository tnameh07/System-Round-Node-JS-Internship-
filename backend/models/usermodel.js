import { DataTypes } from "sequelize";
import sequelize from "../dbConfig/dbConfig.js";


const user = sequelize.define("user", {

    Id:{
        primaryKey: true,
        type:DataTypes.INTEGER,
        autoIncrement:true
    },

    firstName:{
        type:DataTypes.STRING,

    },
    LastName:{
        type:DataTypes.STRING,
        
    },
    Email:{
        type:DataTypes.STRING,
        
    },
    Password:{
        type:DataTypes.STRING,
        
    }


})

sequelize.sync(()=>{
    console.log("user syncing to db");
    
})

export default user;