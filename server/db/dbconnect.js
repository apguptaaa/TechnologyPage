const mongoose = require('mongoose')
const Local_url = "mongodb://127.0.0.1:27017/technoApi" // Local MongoDB URL

const dbconnect = async ()=>{
    try{
        await mongoose.connect(Local_url)
        console.log('mongodb connectd')
    }
    catch(error){
        console.log("error occured",error)
    }
}

module.exports = dbconnect