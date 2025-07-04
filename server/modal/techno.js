const mongoose =require('mongoose')

const TechnoSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    }

})

const TechnoModel = mongoose.model('techno',TechnoSchema)
module.exports = TechnoModel