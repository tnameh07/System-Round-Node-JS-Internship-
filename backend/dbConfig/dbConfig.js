import { Sequelize } from "sequelize";

const sequelize = new Sequelize("testDB", "root", "root", {
    host: "localhost",
    dialect:"mysql"
})

sequelize.authenticate()
.then(result =>{
    console.log("Database connected");
    
})
.catch(err =>{
    console.log("Db connection failed", err);
    
})

export default sequelize;