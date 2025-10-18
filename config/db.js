const {Sequelize} = require('sequelize')

require("dotenv").config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
     process.env.USER,
      process.env.PASSWORD,
      {
        host: process.env.HOST,
        dialect: "mysql",
        logging: false

      }
)

sequelize
   .authenticate()
   .then(()=>{
      console.log("Database connected successfully")
    })
    .catch((err)=>{
      console.log("Unable to connect to the database", err)
    });

    sequelize.sync({ alter:false})
    .then(()=> console.log("Table altered succesfully."))
    .catch(err => console.log("sync error:", err));


module.exports = sequelize